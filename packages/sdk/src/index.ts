// Rexport the APIs

export * as Api from '@ironplans/api'

export { Customer, CustomerOptions } from './customer'
export { default as Team } from './team'
export { default as Invite } from './invite'
export { default as Subscription } from './subscription'
export { default as Pricing } from './pricing'
export { APIOptions, createAPI } from './api'
export { clone } from './utils'

export type {
  IPublicTheme as Theme,
  WidgetType,
  TeamWidgetType,
  IFrameOptions,
} from './utils'
