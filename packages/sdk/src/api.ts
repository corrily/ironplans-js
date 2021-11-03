import {
  CustomersApi,
  TeamsApi,
  TeamMembershipsApi,
  InvitesApi,
  PlansApi,
  ProvidersApi,
  SubscriptionsApi,
  Configuration,
} from '@ironplans/api'
import { Immutable } from './types'

export interface IPAPI {
  token?: string
  publicToken?: string
  apiBaseUrl: string
  appBaseUrl: string

  customers: CustomersApi
  teams: TeamsApi
  teamMemberships: TeamMembershipsApi
  invites: InvitesApi
  plans: PlansApi
  providers: ProvidersApi
  subscriptions: SubscriptionsApi
}

export function createConfiguration(
  baseUrl?: string,
  at?: string
): Configuration {
  return new Configuration({
    basePath: baseUrl?.replace(/\/$/, ''),
    accessToken: `${at}`,
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
  return {
    token,
    publicToken,
    appBaseUrl,
    apiBaseUrl,
    customers: new CustomersApi(config),
    teams: new TeamsApi(config),
    plans: new PlansApi(config),
    invites: new InvitesApi(config),
    providers: new ProvidersApi(config),
    subscriptions: new SubscriptionsApi(config),
    teamMemberships: new TeamMembershipsApi(config),
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
