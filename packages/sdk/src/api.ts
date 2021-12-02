import {
  CustomersApi,
  TeamsApi,
  TeamMembershipsApi,
  InvitesApi,
  PaymentMethodsApi,
  PlansApi,
  ProvidersApi,
  SubscriptionsApi,
  Configuration,
  AuthConfigsApi,
} from '@ironplans/api'
import { Immutable } from './types'

export interface IPAPI {
  token?: string
  publicToken?: string
  apiBaseUrl: string
  appBaseUrl: string

  customers: CustomersApi
  teams: TeamsApi
  paymentMethods: PaymentMethodsApi
  teamMemberships: TeamMembershipsApi
  invites: InvitesApi
  plans: PlansApi
  providers: ProvidersApi
  subscriptions: SubscriptionsApi
  authConfigs: AuthConfigsApi
}

export function createConfiguration(
  baseUrl?: string,
  at?: string,
  useLegacy?: boolean
): Configuration {
  // new config with base view adds 'Bearer ' to authentication header.
  // set useLegacy to true to avoid adding Bearer for endpoints/views that haven't been migrated yet.
  return new Configuration({
    basePath: baseUrl?.replace(/\/$/, ''),
    accessToken: `${useLegacy ? 'Bearer ' : ''}${at}`,
  })
}

export interface APIOptions {
  apiBaseUrl: string
  appBaseUrl: string
  token?: string
  publicToken?: string
}

export function createAPI(opts: APIOptions): IPAPI {
  const { apiBaseUrl, appBaseUrl, token, publicToken } = opts
  const config = createConfiguration(apiBaseUrl, token ?? publicToken)
  const legacyConfig = createConfiguration(
    apiBaseUrl,
    token ?? publicToken,
    true
  )
  return {
    token,
    publicToken,
    appBaseUrl,
    apiBaseUrl,
    customers: new CustomersApi(config),
    paymentMethods: new PaymentMethodsApi(config),
    teams: new TeamsApi(config),
    authConfigs: new AuthConfigsApi(config),
    plans: new PlansApi(legacyConfig),
    invites: new InvitesApi(legacyConfig),
    providers: new ProvidersApi(legacyConfig),
    subscriptions: new SubscriptionsApi(legacyConfig),
    teamMemberships: new TeamMembershipsApi(legacyConfig),
  }
}

export class Resource<T extends object> {
  api: IPAPI

  readonly data: Immutable<T>

  constructor(api: IPAPI, data: Immutable<T>) {
    this.api = api
    this.data = data as Immutable<T>
  }
}
