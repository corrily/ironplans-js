import {
  Configuration,
  CustomersApi,
  InvitesApi,
  OpEnum,
  PlansApi,
  Provider,
  ProvidersApi,
  RoleEnum,
  SubscriptionsApi,
  Team,
  TeamDetail,
  TeamDetailRequest,
  TeamsApi,
  TeamMembershipsApi,
} from '@ironplans/api'
import Cookies from 'js-cookie'
import type { JwtPayload } from 'jwt-decode'
import decode from 'jwt-decode'
import { createEvents } from 'micro-typed-events'
import {
  createModalIframe,
  preventScroll,
  checkIframeRect,
  createModalBackdrop,
} from './utils'

const providerClaim = 'https://api.ironplans.com/.jwt/provider/'

interface CustomerCache {
  teams: Team[]
  activeTeam?: TeamDetail
  config?: Provider
}

interface IPClaims {
  [providerClaim]?: string
}

function createConfiguration(opts: CustomerOpts, at?: string): Configuration {
  return new Configuration({
    basePath: opts.apiBaseUrl?.replace(/\/$/, ''),
    accessToken: `Bearer ${at}`,
  })
}

function CustomerCacheFromJSON(json: string): CustomerCache {
  return JSON.parse(json)
}

export interface CustomerOpts {
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

  cookies?: {
    /** The name of the cookie to save and look for a customer's access token. */
    name?: string
  }

  /** The period that data is refreshed in ms. */
  refreshPeriodMs?: number

  /** Called when initialization finishes and the class is ready for use. */
  onInitialized?: (customer: Customer) => void
}

export class Customer implements CustomerOpts {
  idToken?: string

  publicToken?: string

  token?: string

  isInitialized = false

  onInitialized: (c: Customer) => void = () => {}

  apiBaseUrl = 'https://api.ironplans.com/'

  appBaseUrl = 'https://dash.ironplans.com/public/'

  refreshPeriodMs = 30 * 1000

  ui = {
    zIndex: 9999999,
  }

  net = {
    timeout: 10000,
  }

  cookies = {
    name: 'ipct',
  }

  api!: {
    customers: CustomersApi
    teams: TeamsApi
    teamMemberships: TeamMembershipsApi
    invites: InvitesApi
    plans: PlansApi
    providers: ProvidersApi
    subscriptions: SubscriptionsApi
  }

  private activeTeam: TeamDetail | null = null

  private activeTeamChangeEvent = createEvents<TeamDetail>()

  onActiveTeamChange = this.activeTeamChangeEvent.subscribe

  storage: Storage = localStorage

  cache: CustomerCache = {
    teams: [],
    activeTeam: undefined,
  }

  private interval: ReturnType<typeof setTimeout> | null = null

  private params: URLSearchParams

  /**
   * A convenience method for creating a new customer and immediately calling
   * `init`.
   */
  static async init(opts: CustomerOpts) {
    const c = new Customer(opts)
    await c.init()
    return c
  }

  constructor(opts: CustomerOpts) {
    Object.assign(this, opts)

    this.params = new URLSearchParams(window.location.search)

    this.initApis()
  }

  /**
   * Authenticates Customer credentials and registers housekeeping loops to keep
   * data up-to-date. Must be called before any other instance methods.  The
   * class method `init` is a convenience wrapper for creating a Customer and
   * immediately calling this.
   * */
  async init(opts: Partial<CustomerOpts> = {}) {
    Object.assign(this, opts)
    this.validateOpts()

    await this.initToken()
    this.initApis()
    await this.refreshLoop()
    this.isInitialized = true
    this.onInitialized(this)
    return this
  }

  /** The Customer's IronPlans ID. */
  get id() {
    const payload = this.getClaims()
    return payload.sub ?? ('anon' as string)
  }

  /** The IronPlans provider config for this customer. */
  async getProvider(fetch = false) {
    if (!fetch && this.cache.config) return this.cache.config

    const payload = this.getClaims()
    const pid = payload[providerClaim]
    if (!pid) throw new Error('bad customer token')
    return this.api.providers.providersV1Retrieve({ id: pid })
  }

  /** Clears any reference to a customer. Call this when logging a user out. */
  clear() {
    Cookies.remove(this.cookies.name)

    if (this.interval) clearInterval(this.interval)
    this.token = undefined
    this.initApis()
  }

  /**
   * Check if a Customer Token's claims are valid.  Does *not* check the tokens
   * signature.
   * */
  isTokenValid(token?: string | undefined) {
    const payload = this.getClaims(token)
    return payload.exp * 1000 > Date.now()
  }

  /** Returns a list of a customers teams. */
  async getTeams(fetch = false) {
    if (this.cache.teams.length > 0 && !fetch) return this.cache.teams

    return this.fetchTeams()
  }

  /**
   * Get the Customer's currently selected team.  All customer actions will be
   * on behalf of this team. Use `setActiveTeam` to change the active team to
   * another team returned by `getTeams`.
   * */
  async getActiveTeam(): Promise<TeamDetail> {
    if (this.activeTeam) return this.activeTeam

    // This is supposed to be set on init, but just in case.
    console.warn('State Error: Customer has no active team set.')
    let teams: Team[] | undefined

    // Try cache first
    teams = await this.getTeams()
    if (teams.length > 0) return this.setActiveTeam(teams[0].id)

    // Serious failure, check backend and create a team if one does not exist.
    teams = await this.fetchTeams()
    return this.setActiveTeam(teams[0].id)
  }

  /**
   * Returns detailed information about a Customer's team.
   * @deprecated use `fetchTeamInfo` instead.
   * */
  async getTeamInfo(teamId: string) {
    return this.fetchTeamInfo(teamId)
  }

  /** Returns detailed information about a Customer's team. */
  async fetchTeamInfo(teamId: string) {
    return this.api.teams.teamsV1Retrieve({ id: teamId })
  }

  /**
   * Fetch the list of customer teams directly from the backend. Guaranteed to
   * return at least 1 team.
   * */
  async fetchTeams() {
    const teams = await this.api.teams.teamsV1List({ limit: 100 })
    if (teams.results && teams.results.length > 0) return teams.results

    console.warn('State Error: Customer has no teams available.')
    const team = await this.createTeam({ name: 'developers' })
    return [team]
  }

  /**
   * Switches the Customer's currently active team, and returns detailed
   * information about the new team.
   * */
  async setActiveTeam(teamId: string) {
    this.activeTeam = await this.fetchTeamInfo(teamId)
    this.mergeCache({ activeTeam: this.activeTeam })
    this.activeTeamChangeEvent.emit(this.activeTeam)
    return this.activeTeam
  }

  /**
   * Create a team for this Customer.  The Customer will automatically become
   * the owner.
   * */
  async createTeam(team: TeamDetailRequest) {
    return this.api.teams.teamsV1Create({
      teamDetailRequest: team,
    })
  }

  /**
   * Invite a Customer via email to a team.  An invitation email will be sent,
   * and if the contact accepts the invitation, the Customer will be added to
   * the team.  If the customer is new to your provider, they will be redirected to your designated signup page.
   */
  async inviteToTeam(teamId: string, email: string, role?: RoleEnum) {
    return this.api.invites.invitesV1Create({
      inviteRequest: {
        teamId,
        sentToEmail: email,
        role,
      },
    })
  }

  /**
   * Invite multiple Customers via email to a team.
   */
  async bulkInviteToTeam(teamId: string, emails: string[], role?: RoleEnum) {
    return this.api.invites.invitesV1BulkCreate({
      bulkCreateInviteRequest: {
        teamId,
        toEmails: emails,
        role,
      },
    })
  }

  /**
   * Revoke and delete an invite. The link the user is sent will no longer be valid.
   */
  async revokeInvite(inviteId: string) {
    return this.api.invites.invitesV1Destroy({
      id: inviteId,
    })
  }

  /**
   * Remove a member from a team. Only revokes team membership, does not delete user.
   */
  async revokeMembership(membershipId: string) {
    return this.api.teamMemberships.teamMembershipsV1Destroy({
      id: membershipId,
    })
  }

  /**
   * Update a member's role.
   */
  async updateMemberRole(membershipId: string, role: RoleEnum) {
    return this.api.teamMemberships.teamMembershipsV1PartialUpdate({
      id: membershipId,
      patchedTeammateRequest: {
        role,
      },
    })
  }

  /**
   * Update a role set on an invite. When a user accepts invite, the user will obtain the role set on invite.
   */
  async updateInviteRole(inviteId: string, role: RoleEnum) {
    return this.api.invites.invitesV1PartialUpdate({
      id: inviteId,
      patchedInviteRequest: {
        role,
      },
    })
  }

  /**
   * Get all invoices belonging to a team.
   */
  async getInvoices(teamId: string) {
    return this.api.teams.teamsV1InvoicesList({
      id: teamId,
    })
  }

  async getFeatureInfo(slug: string) {
    const team = await this.getActiveTeam()
    if (!team.subscription) {
      console.warn('No features enabled because Team has no subscription')
      return null
    }
    const feature = team.subscription.plan.features.find((f) => f.slug === slug)
    if (!feature) {
      const slugs = team.subscription.plan.features.map((f) => f.slug)
      console.warn(
        `No feature '${slug}' found on plan '${
          team.subscription.plan.name
        }'.  Available features: ${slugs.join(', ')}`
      )
      return null
    }
    return feature
  }

  async reportUsage(slug: string, value: number, op: OpEnum) {
    const team = await this.getActiveTeam()
    if (!team.subscription) throw new Error('Team has no active subscription')

    return this.api.subscriptions.subscriptionsV1UsageCreate({
      id: team.subscription.id,
      reportUsageRequest: {
        op,
        slug,
        value,
      },
    })
  }

  async showPlans(teamId: string, { selector = '' } = {}) {
    if (!this.token) throw new Error('Customer is not authenticated')

    const iframe = createModalIframe({ zIndex: this.ui.zIndex })

    if (selector) {
      const el = document.querySelector(selector)
      if (!el) throw new Error(`No element found for selector: ${selector}`)
      const rect = el.getBoundingClientRect()
      checkIframeRect(rect)
      el.appendChild(iframe)
      return () => {
        el.removeChild(iframe)
      }
    }

    const resetBody = preventScroll()
    const { div: backdrop, show } = createModalBackdrop()
    backdrop.appendChild(iframe)

    const url = new URL('public/plans', this.appBaseUrl)

    url.searchParams.set('ct', this.token ?? '')
    url.searchParams.set('tid', teamId)

    iframe.src = url.toString()
    document.body.appendChild(backdrop)

    const onClose = () => {
      document.body.removeChild(backdrop)
      resetBody()
    }
    show(onClose)
    return onClose
  }

  /**
   * Generates a URL that you can insert into an iframe's src attribute to show a customer's available plans.
   * Customer must be authenticated.
   */
  createPlanUrl() {
    return this.createIframeUrl('public/plans')
  }

  /**
   * Generates a URL that you can insert into an iframe's src attribute to show a team management widget.
   * Customer must be authenticated.
   */
  createTeamUrl() {
    return this.createIframeUrl('public/team')
  }

  /**
   * Generates a URL that you can insert into an iframe's src attribute to show a table of invoices.
   * Customer must be authenticated.
   */
  createInvoicesUrl() {
    return this.createIframeUrl('public/invoices')
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

    console.debug('Customer token is about to expire, refreshing...')

    try {
      const { token } = await this.api.customers.customersV1RenewTokenCreate()
      this.saveToken(token)
      console.debug('Customer token refreshed.')
      return this.token
    } catch (e) {
      throw new Error(`Failed to refresh Customer token: ${e}`)
    }
  }

  /** * PRIVATE METHODS ** */

  private createIframeUrl(uri: string) {
    const url = new URL(uri, this.appBaseUrl)
    url.searchParams.set('ct', this.token ?? '')
    url.searchParams.set('tid', this.activeTeam?.id ?? '')
    return url
  }

  private getClaims(token?: string) {
    if (!token && !this.token)
      throw new Error('Tried to get payload before init')
    const payload = decode<JwtPayload & IPClaims>(token ?? this.token ?? '')
    return {
      sub: payload.sub ?? 'anon',
      exp: 0,
      ...payload,
    }
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
    if (this.token) {
      this.saveToken()
      return
    }

    if (this.idToken) {
      // OIDC token flow
      let token = this.loadToken()
      // Many apps can be installed on localhost, so we dont trust cookies here.
      if (
        token &&
        this.isTokenValid(token) &&
        window.location.hostname !== 'localhost'
      ) {
        this.saveToken(token)
        return
      }

      try {
        token = await this.exchangeIdToken()
      } catch (e) {
        console.error(
          `Failed to exchange ID token for new Customer Token: ${e}`
        )
        if (token) console.warn(`Using cached Customer Token.`)
      }

      if (token) {
        this.saveToken(token)
        return
      }
    }

    // Other sources of access tokens (e.g. query params) go here

    throw new Error('No valid token found')
  }

  private saveToken(token?: string) {
    if (token && token !== this.token) {
      this.token = token
      this.initApis()
    }
    Cookies.set(this.cookies.name, token ?? this.token ?? '', { expires: 7 })
  }

  private loadToken() {
    return Cookies.get(this.cookies.name)
  }

  private async exchangeIdToken(): Promise<string> {
    if (!this.idToken || !this.publicToken) {
      throw new Error('idToken and publicToken is required for OIDC token flow')
    }
    // TODO: better error handling
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
  }

  private initApis() {
    const config = createConfiguration(this, this.token)
    this.api = {
      customers: new CustomersApi(config),
      teams: new TeamsApi(config),
      plans: new PlansApi(config),
      invites: new InvitesApi(config),
      providers: new ProvidersApi(config),
      subscriptions: new SubscriptionsApi(config),
      teamMemberships: new TeamMembershipsApi(config),
    }
  }

  private async refreshLoop() {
    if (this.interval) clearTimeout(this.interval)

    const cache = this.loadCache()

    // Reload all available teams, see if we were rejected from any cool groups >.>
    let teams: Team[] = cache.teams ?? []

    try {
      const data = await this.api.teams.teamsV1List({ limit: 100 })
      teams = data.results ?? []
    } catch (e) {
      console.error(`Failed to refresh teams: ${e}`)
      // Teams are carefully not overwritten in case there is a backend issue
      // that prevents fetching new teams.  As long as teams were fetched
      // successfully once, the SDK should still function for read-only
      // operations.
    }

    if (teams && teams.length === 0) {
      // We're not in any teams, which is a major issue, but we can fix it quick
      // by creating one.
      console.warn('State Error: Customer has no teams available.')
      try {
        const team = await this.createTeam({ name: 'developers' })
        this.activeTeam = team
        teams = [team]
      } catch (e) {
        throw new Error(
          `Fatal error: Customer has no teams, and failed to create a new one: ${e}`
        )
      }
    }

    try {
      const teamId = this.params.get('tid')
      if (teamId) {
        try {
          const team = await this.setActiveTeam(teamId)
          console.debug(
            `Found customer team ID in params, setting ${team.name} as default...`
          )
        } catch (e) {
          console.error(`Failed to set active team from query params: ${e}`)
        }
        this.params.delete('tid')
      } else if (this.activeTeam) {
        await this.setActiveTeam(this.activeTeam.id)
        console.debug('Refreshed active team.')
      } else if (cache.activeTeam) {
        await this.setActiveTeam(cache.activeTeam.id)
        console.debug('Loaded active team from cache.')
      } else {
        await this.setActiveTeam(teams[0].id)
        console.debug('Defaulted active team to first team available.')
      }
    } catch (e) {
      console.error(`Failed to set active team: ${e}`)
      if (cache.activeTeam) {
        // Use the cached active team if we can't verify it's still valid
        this.activeTeam = cache.activeTeam
      }
    }

    cache.config = await this.getProvider(true)
    cache.teams = teams ?? cache.teams ?? []
    cache.activeTeam = this.activeTeam ?? undefined
    this.cache = cache
    this.saveCache(cache)

    try {
      this.renewToken(this.refreshPeriodMs + 60 * 1000)
    } catch (e) {
      console.error(`Failed to refresh token: ${e}`)
    }

    // Do it again in refresh period. Doesnt use setInterval to make sure we
    // only stack at most 1 refresh onto the queue if the refreshPeriod is too small.
    this.interval = setTimeout(
      this.refreshLoop.bind(this),
      this.refreshPeriodMs
    )
  }

  private loadCache() {
    const custId = this.id
    const data = this.storage.getItem(`customer-${custId}`)
    if (!data) return {} as CustomerCache
    return CustomerCacheFromJSON(data)
  }

  private mergeCache(data: Partial<CustomerCache>) {
    const cache = this.loadCache()
    const merged = { ...cache, ...data }
    this.saveCache(merged)
  }

  private saveCache(data: CustomerCache) {
    const custId = this.id
    this.storage.setItem(`customer-${custId}`, JSON.stringify(data))
  }

  private isTokenAboutToExpire(graceMs = 60 * 1000) {
    const payload = this.getClaims()
    return payload.exp * 1000 - graceMs < Date.now()
  }
}
