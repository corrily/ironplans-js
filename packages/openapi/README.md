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
SCHEMA_URL=http://localhost:8000/openapi.yaml make
cd packages/openapi/api && yarn build && yalc publish --push
```

Or, edit [the openapi spec](openapi.yaml) directly and run `make api`

Using the updated package in another repo locally:

```
yalc link @ironplans/api
```

This only needs to be done once unless `node_modules` is updated.

For other `@ironplans/*` packages that you run `yalc link @ironplans/api` in, you will also need to build and publish, e.g.

```
cd packages/sdk
yalc link @ironplans/api
yarn build
yalc publish --push
```

If you are updating multiple `@ironplans/*` packages, make sure to link all of them in the `ironplans` repo.

```
yalc link @ironplans/api @ironplans/sdk @ironplans/react
```

To undo `yalc link` in a local package:

```
yalc remove --all
```

Check out `yalc --help` and https://github.com/wclr/yalc for more helpful docs.
