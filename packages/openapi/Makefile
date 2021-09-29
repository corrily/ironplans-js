api_source := ./api/src/index.ts
packages := api types
# depend on $(call event,{name}) to only trigger the recipe once, or if any other
# dependencies change. Useful for hiding complex generated files behind a single
# facade file.
once = build/${1}

# clean_{pkgname}_files is a list of files, relative to pkg root, to clean when
# the package is removed.
clean_api_files = src/
clean_types_files = types.ts

ifneq (,$(SCHEMA_URL))
schema_url := $(SCHEMA_URL)
else
schema_url := https://api.ironplans.com/openapi.yaml
endif

all: schema $(packages)

api: openapi.yaml $(call once,api)
	npx @openapitools/openapi-generator-cli generate \
		-i $< -o api/src/ \
		-t ./templates \
		-g typescript-fetch \
		--additional-properties="typescriptThreePlus=true"
	$(MAKE) -C api clean all
	npx prettier ./api/src/ --write

types: openapi.yaml $(call once,types)
	npx openapi-typescript $< --output types/types.ts
	npx prettier types/types.ts --write

clean: $(patsubst %,clean-%,$(packages))
clean-%:
	@echo "Cleaning $*..."
	rm -rf $(patsubst %,$*/%,$($(subst PKG,$*,clean_PKG_files)))
	rm -f build/$*

.PHONY: schema
schema openapi.yaml: 
	@echo "👩‍💻 Downloading schema from $(schema_url)..."
	@wget $(schema_url) -qO openapi.yaml
	npx prettier openapi.yaml --write

# depend on build/%
build/%::
	mkdir -p build && echo $(date) > build/$*
