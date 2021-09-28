import { TeamDetail, TeamDetailRequest } from '@ironplans/api'
import { createAPI, IPAPI } from './api'
import Team from './team'
import {
  first,
  getClaims,
  getProviderIdFromToken,
  isTokenExpired,
} from './utils'

export interface CustomerOptions {
  /**
   * An OIDC-compliant ID token for a customer. This token will be exchanged for
   * a customer access token and automatically create the customer if they do
   * not yet exist.
   */
  idToken?: string

  /** A customer access token. Omit if you're using `idToken`. */
  token?: string

  /** A Provider public token. */
  publicToken?: string

  /** ID of the Team the Customer should default to using.  */
  teamId?: string

  /** The API base URL for Iron Plans customers. */
  apiBaseUrl?: string

  /** The base URL to use for embedded views. */
  appBaseUrl?: string

  ui?: {
    /** zIndex to use for embedded views. */
    zIndex?: number
  }

  /** The amount of milliseconds to wait before timing out an API request. */
  timeout?: number

  /** Called when initialization finishes and the class is ready for use. */
  onInitialized?: (customer: Customer) => void
}

export class Customer implements CustomerOptions {
  idToken?: string

  publicToken?: string

  token?: string

  isInitialized = false

  onInitialized: (c: Customer) => void = () => {}

  apiBaseUrl = 'https://api.ironplans.com/'

  appBaseUrl = 'https://dash.ironplans.com/public/'

  ui = {
    zIndex: 9999999,
  }

  net = {
    timeout: 10000,
  }

  api!: IPAPI

  teamId: string | undefined = undefined

  timeout?: number | undefined

  private params: URLSearchParams

  private team: Team | undefined = undefined

  /**
   * A convenience method for creating a new customer and immediately calling
   * `init`.
   */
  static async init(opts: CustomerOptions) {
    const c = new Customer(opts)
    await c.init()
    return c
  }

  constructor(opts: CustomerOptions) {
    Object.assign(this, opts)

    this.params = new URLSearchParams(window.location.search)
    this.api = createAPI(this)
  }

  /** The Customer's IronPlans ID. */
  get id() {
    const payload = this.getClaims()
    return payload.sub ?? ('anon' as string)
  }

  getTeam() {
    if (!this.team) throw new Error('Customer not initialized')
    return this.team
  }

  /**
   * Authenticates Customer credentials and registers housekeeping loops to keep
   * data up-to-date. Must be called before any other instance methods.  The
   * class method `init` is a convenience wrapper for creating a Customer and
   * immediately calling this.
   * */
  async init(opts: Partial<CustomerOptions> = {}) {
    Object.assign(this, opts)

    this.token = await this.initToken()
    this.publicToken = this.initPublicToken()

    this.api = createAPI(this)

    this.validateOpts()

    this.team = new Team(this.api, await this.loadTeam(this.lookupTeamId()))

    this.isInitialized = true
    this.onInitialized(this)

    return this
  }

  lookupTeamId() {
    if (this.teamId) return this.teamId
    const ptid = this.params.get('tid') ?? undefined
    if (ptid) this.teamId = ptid
    return this.teamId
  }

  async loadTeam(teamId?: string) {
    let team: TeamDetail

    if (teamId) team = await this.fetchTeamInfo(teamId)
    else {
      const teams = await this.fetchTeams(1)
      team = await this.api.teams.teamsV1Retrieve({ id: teams[0].id })
    }

    if (!team) throw new Error('Team not found')
    return team
  }

  /** Returns detailed information about a Customer's team. */
  async fetchTeamInfo(teamId: string) {
    return this.api.teams.teamsV1Retrieve({ id: teamId })
  }

  /**
   * Fetch the list of customer teams directly from the backend. Guaranteed to
   * return at least 1 team.
   * */
  async fetchTeams(limit = 100) {
    const teams = await this.api.teams.teamsV1List({ limit })
    if (teams.results && teams.results.length > 0) return teams.results

    console.warn('State Error: Customer has no teams available.')
    const team = await this.createTeam({ name: 'developers' })
    return [team]
  }

  /**
   * Switches the Customer's currently active team, and returns detailed
   * information about the new team.
   * */
  async setTeam(teamId: string) {
    this.team = new Team(this.api, await this.fetchTeamInfo(teamId))
    return this.team
  }

  /**
   * Create a team for this Customer.  The Customer will automatically become
   * the owner.
   * */
  async createTeam(teamRequest: TeamDetailRequest) {
    const team = await this.api.teams.teamsV1Create({
      teamDetailRequest: teamRequest,
    })
    return new Team(this.api, team)
  }

  /**
   * A function that returns a new Customer Token.  Called when the current
   * Customer Token is about to expire.
   * */
  async renewToken(withinMs = 60 * 1000) {
    if (!this.isTokenAboutToExpire(withinMs)) {
      // Token is valid for a while, no need to refresh.
      return this.token
    }

    try {
      const { token } = await this.api.customers.customersV1RenewTokenCreate()
      if (!token) throw new Error('No token returned from renewToken')

      this.token = token
      return this.token
    } catch (e) {
      throw new Error(`Failed to refresh Customer token: ${e}`)
    }
  }

  getClaims() {
    if (!this.token) throw new Error('Tried to get payload before init')
    return getClaims(this.token)
  }

  private validateOpts() {
    if (this.idToken && this.token) {
      throw new Error('idToken and token are mutually exclusive')
    }

    if (!this.idToken && !this.token) {
      throw new Error('idToken or token must be provided')
    }

    if (
      this.idToken &&
      (!this.publicToken || this.publicToken.trim().length === 0)
    ) {
      throw new Error('publicToken is required for OIDC token flow')
    }
  }

  private async initToken() {
    if (this.token && !isTokenExpired(this.token)) return this.token
    if (this.idToken) return this.exchangeIdToken()
    const paramToken = this.params.get('ct')
    if (paramToken) return paramToken
    // Other sources of access tokens (e.g. query params) go here

    throw new Error('No valid token found')
  }

  private initPublicToken() {
    if (this.publicToken) return this.publicToken
    const paramToken = this.params.get('pt')
    if (paramToken) return paramToken
    // Other sources of access tokens (e.g. query params) go here

    return undefined
  }

  private async exchangeIdToken(): Promise<string> {
    if (!this.idToken || !this.publicToken) {
      throw new Error('idToken and publicToken is required for OIDC token flow')
    }
    // TODO: better error handling
    try {
      const response = await this.api.customers.customersV1OidcExchangeCreate(
        {
          iDTokenExchangeRequest: {
            idToken: this.idToken,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.publicToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      return response.token
    } catch (e) {
      if (e instanceof Response) {
        const body = await e.text()
        throw new Error(`Failed to exchange idToken: ${e.statusText} ${body}`)
      }
      throw new Error(`Failed to exchange idToken: ${e}`)
    }
  }

  isTokenAboutToExpire(graceMs = 60 * 1000) {
    const payload = this.getClaims()
    return payload.exp * 1000 - graceMs < Date.now()
  }

  async getProvider() {
    if (!this.token && this.publicToken) {
      return first(await this.api.providers.providersV1List({ limit: 1 }))
    }

    if (!this.token) throw new Error('No token available')
    const pid = getProviderIdFromToken(this.token)

    if (!pid) throw new Error('No provider ID found in token')
    return this.api.providers.providersV1Retrieve({ id: pid })
  }
}
