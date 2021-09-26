src := $(shell find src -name '*.ts' -type f )
out := $(shell find dist -name '*.js' -type f )

size_targets := $(shell jq -r '.["size-limit"][].path' package.json)
dependencies := $(shell jq -r '[(.dependencies // {} | keys), (.peerDependencies // {} | keys)] | flatten | .[]' package.json)

# depend on $(call event,{name}) to only trigger the recipe once, or if any other
# dependencies change. Useful for only running PHONY targets once.
once = .build/${1}

esb_opts = \
	--bundle \
	--minify \
	--platform=browser \
	--sourcemap

cjs_opts = \
	--format=cjs \
	--target=es2015 \
	--outfile=$@ \
	$(patsubst %,--external:% ,$(dependencies))

cdn_opts = \
	--format=iife \
	--target=es2017 \
	--global-name=IronPlans \
	--outfile=$@

esm_opts = \
	--format=esm \
	--target=es2017 \
	--outdir=$(@D) \
	--entry-names=$(basename $(@F)) \
	--splitting \
	--tree-shaking=true \
	$(patsubst %,--external:% ,$(dependencies))

all: dist
.PHONY: dist
dist: dist-cdn dist-esm dist-types dist-cjs

clean:
	rm -rf dist .build

serve: dist/$(name).min.js
	npx esbuild \
		--serve=localhost:3030 --servedir=example \
		--outfile=example/$(name).min.js \
		$(cdn_opts) $(entry)

lint: lint-eslint lint-size

lint-eslint: $(src)
	@npx eslint $?

lint-size: $(size_targets) # must match the config in package.json
	@npx size-limit

format: $(entry)
	@npx prettier --write src
	@npx eslint --fix src

dist-cdn: dist/$(name).min.js
dist/$(name).min.js: $(entry)
	@echo "Building CDN bundle"
	@npx esbuild $(esb_opts) $(cdn_opts) $<
	@echo "CDN done!"
	

dist-esm: dist/$(name).esm.js 
dist/$(name).esm.js: $(entry)
	@echo "Building ESM bundle"
	@npx esbuild $(esb_opts) $(esm_opts) $<
	@echo "ESM done!"

dist-cjs: dist/$(name).cjs.mjs 
dist/$(name).cjs.mjs: $(entry)
	@echo "Building CJS bundle"
	@npx esbuild $(esb_opts) $(cjs_opts) $<
	@echo "CJS done!"


dist-types: dist/index.d.ts
dist/index.d.ts: $(entry)
	@echo "Building types"
	@npx tsc -p tsconfig.json \
		--declaration --declarationMap \
		--emitDeclarationOnly \
		--outDir $(@D) || rm -f dist/*.d.ts*
	@echo "Types done!"

# depend on .build/%
.build/%::
	mkdir -p .build && echo $(date) > .build/$*