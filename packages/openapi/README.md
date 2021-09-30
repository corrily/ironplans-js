# OpenAPI Generated Packages

- [browser-fetch](./api)
- [typescript types](./types)

## Updating

Fetch the latest schema from https://api.ironplans.com/openapi.yaml:

```
make schema
```

Build all the packages:

```
make
```

Commit the changes, and push to origin

```
git commit -m "chore(openapi): bump"
git push origin main
```

## Testing locally

Update schema using a custom URL with [`yalc`](https://github.com/wclr/yalc):

```
SCHEMA_URL=http://localhost:8000/openapi.yaml make packages/openapi
cd packages/openapi/api && yalc publish --push
```

Or, edit [the openapi spec](openapi.yaml) directly and run `make api`

Using the updated package in another repo locally:

```
yalc link @ironplans/api
```

This only needs to be done once unless `node_modules` is updated.
