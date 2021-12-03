<div align="center">
  <a href="https://www.ironplans.com">
    <img alt="Iron Plans"  height="64px" src="https://assets.website-files.com/612e59db2f27256d7d2fb18b/613117cb00ac4a3a5447019f_ironplans.svg">
  </a>
  <p>The JS/TS monorepo for <a href="https://www.ironplans.com">Iron Plans</a>.</p>
  <sub>The easiest way to add subscriptions and teams to your SaaS app.</sub>
</div>

---

## Documentation

For full documentation, visit [docs.ironplans.com](https://docs.ironnplans.com).

## Packages

| Name               | Version                                                                                            | Next                                                                                              | Links                                                                                           |
| :----------------- | :------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------- |
| `@ironplans/sdk`   | [![sdk version](https://img.shields.io/npm/v/@ironplans/sdk.svg?style=flat&color=blue)][sdk]       | [![sdk next version](https://img.shields.io/npm/v/@ironplans/sdk/next.svg?style=flat)][sdk]       | [README](./packages/sdk/README.md) &middot; [docs](https://docs.ironplans.com/usage/javascript) |
| `@ironplans/react` | [![react version](https://img.shields.io/npm/v/@ironplans/react.svg?style=flat&color=blue)][react] | [![react next version](https://img.shields.io/npm/v/@ironplans/react/next.svg?style=flat)][react] | [README](./packages/react/README.md) &middot; [docs](https://docs.ironplans.com/usage/react)    |
| `@ironplans/api`   | [![api version](https://img.shields.io/npm/v/@ironplans/api.svg?style=flat&color=blue)][api]       | [![api next version](https://img.shields.io/npm/v/@ironplans/api/next.svg?style=flat)][api]       | [README](./packages/api/README.md)                                                              |
| `@ironplans/types` | [![types version](https://img.shields.io/npm/v/@ironplans/types.svg?style=flat&color=blue)][types] | [![types next version](https://img.shields.io/npm/v/@ironplans/types/next.svg?style=flat)][types] | [README](./packages/types/README.md)                                                            |
| `@ironplans/proxy` | [![proxy version](https://img.shields.io/npm/v/@ironplans/proxy.svg?style=flat&color=blue)][proxy] | [![proxy next version](https://img.shields.io/npm/v/@ironplans/proxy/next.svg?style=flat)][proxy] | [README](./packages/proxy/README.md)                                                            |

## Community

Come talk to the authors, founders, and happy users:

[Join our Discord Server](https://discord.gg/UXPTJRWvjA)

[sdk]: https://www.npmjs.com/package/@ironplans/sdk
[react]: https://www.npmjs.com/package/@ironplans/react
[proxy]: https://www.npmjs.com/package/@ironplans/proxy
[api]: https://www.npmjs.com/package/@ironplans/api
[types]: https://www.npmjs.com/package/@ironplans/types

## Releasing (for Iron Plans Developers)

Graduate all packages from next to latest:

```
lerna version --conventional-graduate --conventional-prerelease=0
```

Then publish the packages to NPM:

```
lerna publish from-git
```
