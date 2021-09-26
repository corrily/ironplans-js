src := $(shell find src -name '*.ts' -type f )
out := $(shell find dist -name '*.js' -type f )

size_targets := $(shell jq -r '.["size-limit"][].path' package.json)
dependencies := $(shell jq -r '[(.dependencies // {} | keys), (.peerDependencies // {} | keys)] | flatten | .[]' package.json)

# depend on $(call event,{name}) to only trigger the recipe once, or if any other
# dependencies change. Useful for only running PHONY targets once.
once = .build/${1}

cdn_opts = \
    --bundle \
		--minify \
		--format=iife \
		--platform=browser \
		--sourcemap \
		--global-name=IronPlans

esm_opts = \
		--bundle \
		--minify \
		--format=esm \
		--outdir=$(@D) \
		--entry-names=$(basename $(@F)) \
		--platform=browser \
		--sourcemap \
		--splitting \
		--tree-shaking=true \
		--target=es2017 \
		$(patsubst %,--external:% ,$(dependencies))

all: dist-cdn dist-esm dist-types
clean:
	rm -rf dist .build

serve: dist/$(name).min.js
	npx esbuild \
		--serve=localhost:3030 --servedir=example \
		--outfile=example/$(name).min.js \
		$(cdn_opts) $(entry)

lint: lint-eslint lint-size

lint-eslint: $(src)
	npx eslint $?

lint-size: $(size_targets) # must match the config in package.json
	npx size-limit

format: $(entry)
	npx prettier --write src
	npx eslint --fix src

dist-cdn: dist/$(name).min.js
dist/$(name).min.js: $(entry)
	@echo "Building CDN bundle"
	@npx esbuild $(cdn_opts) --outfile=$@ $<
	

dist-esm: dist/$(name).esm.js 
dist/$(name).esm.js: $(entry)
	@echo "Building ESM bundle"
	@npx esbuild $(esm_opts) $<


dist-types: dist/$(name).d.ts
dist/$(name).d.ts: $(entry)
	@echo "Building types"
	@npx tsc -p tsconfig.json \
		--declaration --declarationMap \
		--emitDeclarationOnly \
		--outFile $@ || rm -f dist/*.d.ts*

# depend on .build/%
.build/%::
	mkdir -p .build && echo $(date) > .build/$*