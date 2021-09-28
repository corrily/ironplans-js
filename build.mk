project_root := $(shell git rev-parse --show-toplevel)
project_tsconfig := $(project_root)/tsconfig.json
project_target := $(shell jq -r '.compilerOptions.target' $(project_tsconfig))
target ?= project_target

cjs_target ?= es2015
cdn_target ?= es2017
esm_target ?= es2017

src := $(shell find src -name '*.ts' -type f )
out := $(shell find dist -name '*.js' -type f )
name ?= $(shell basename $$(jq -r '.name' package.json))
entry ?= src/index.ts
tsconfig ?= tsconfig.json
platforms ?= browser node

project_deps = $(project_tsconfig) $(tsconfig)
dist_deps = types
lint_deps = lint-eslint

ifneq (,$(findstring browser,$(platforms)))
# build libraries for browsers
	dist_deps += cdn 
endif
ifneq (,$(findstring node,$(platforms)))
# build libraries for node
	dist_deps += esm
ifeq (,$(esm_only))
	dist_deps += cjs
endif
endif

size_targets := $(shell jq -r '(.["size-limit"] // [])[].path' package.json)
dependencies := $(shell jq -r '[(.dependencies // {} | keys), (.peerDependencies // {} | keys)] | flatten | .[]' package.json)

ifneq (,$(size_targets))
	lint_deps += lint-size
endif

# depend on $(call event,{name}) to only trigger the recipe once, or if any other
# dependencies change. Useful for only running PHONY targets once.
once = build/${1}

esb_opts = \
	--bundle \
	--minify \
	--sourcemap

cjs_opts = \
	--format=cjs \
	--target=$(cjs_target) \
	--platform=node \
	--outfile=$@ \
	$(patsubst %,--external:% ,$(dependencies))

cdn_outfile = $@
cdn_opts = \
	--format=iife \
	--target=$(cdn_target) \
	--platform=browser \
	--global-name=IP \
	--outfile=$(cdn_outfile)

esm_opts = \
	--format=esm \
	--target=$(esm_target) \
	--platform=node \
	--outdir=$(@D) \
	--entry-names=$(basename $(@F)) \
	--splitting \
	--tree-shaking=true \
	$(patsubst %,--external:% ,$(dependencies))

all: dist

.PHONY: dist
dist: $(dist_deps) 

clean:
	rm -rf dist build

.PHONY: test
test: 
	npx jest --coverage

# Override the default build destination to be from the example folder so the
# built JS can be served at root.
serve: cdn_outfile = example/$(notdir $<)
serve: dist/$(name).min.js
	npx esbuild \
		--serve=localhost:3030 --servedir=example \
		$(esb_opts) $(cdn_opts) \
		$(entry)

lint: $(lint_deps)

lint-eslint: $(src)
	@npx eslint $?

lint-size: $(size_targets) # must match the config in package.json
	@npx size-limit

format: $(entry)
	@npx prettier --write src
	@npx eslint --fix src

cdn: dist/$(name).min.js
dist/$(name).min.js: $(entry) $(src) $(project_deps)
	@echo "Building CDN bundle"
	@npx esbuild $(esb_opts) $(cdn_opts) $(entry)
	@echo "CDN done!"
	

esm: dist/$(name).esm.js 
dist/$(name).esm.js: $(entry) $(src) $(project_deps)
	@echo "Building ESM bundle"
	@npx esbuild $(esb_opts) $(esm_opts) $(entry)
	@echo "ESM done!"

cjs: dist/$(name).cjs.js 
dist/$(name).cjs.js dist/$(name).cjs: $(entry) $(src) $(project_deps)
	@echo "Building CJS bundle"
	@npx esbuild $(esb_opts) $(cjs_opts) $(entry)
	@cp dist/$(name).cjs.js dist/$(name).cjs
	@echo "CJS done!"


types: dist/index.d.ts
dist/index.d.ts: $(entry) $(src) $(project_deps)
	@echo "Building types"
	@npx tsc -p $(tsconfig) \
		--declaration --declarationMap \
		--emitDeclarationOnly \
		--outDir $(@D) || (rm -f dist/*.d.ts* && exit 1)
	@echo "Types done!"

# depend on build/%
build/%::
	@mkdir -p build && echo $(date) > $@