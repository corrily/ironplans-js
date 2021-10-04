import { ProviderToJSON } from '@ironplans/api'
import * as IPTypes from '@ironplans/types'
import getPort from 'get-port'
import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jwt-decode'
import Koa from 'koa'
import { Server as NodeServer } from 'http'
import { paginate, Routes, StubResponse, withDates } from './stub'

const providerClaim = 'https://api.ironplans.com/.jwt/provider/'
const dummyProviderId = 'uuid'
const customerJwtClaims: JwtPayload | Record<string, string> = {
  sub: '123',
  iss: 'https://api.ironplans.com',
  aud: 'https://api.ironplans.com',
  exp: Math.floor(Date.now() / 1000) + 3600,
  iat: Math.floor(Date.now() / 1000),
  [providerClaim]: dummyProviderId,
}

export function createCustomerToken(id: string) {
  return jwt.sign({ ...customerJwtClaims, sub: id }, 'secret')
}

const curlyMatcher = /{([^}]+)}/g
function pathToRegexp(path: string) {
  return new RegExp(
    `^${path.replace(curlyMatcher, '([^/]+)').replace(/\/$/, '/?')}$`
  )
}

function decodeUrl(url: string) {
  return decodeURIComponent(url.replace(/\+/g, ' '))
}

type RouteParams = {
  server: Server
  koa: Koa.Context
  params: Record<string, string | undefined>
}
type TeamData = IPTypes.components['schemas']['Team']

export class Server extends Koa {
  providerId: string

  customerId: string

  server?: NodeServer

  teams: TeamData[]

  routes: Routes<RouteParams> = {
    '/customers/v1/oidc-exchange/': {
      post: (ctx) => ({
        data: {
          is_new: false,
          token: createCustomerToken(ctx.server.customerId),
        },
      }),
    },
    '/teams/v1/': {
      get: (ctx) => ({
        data: paginate<TeamData>(ctx.server.teams),
      }),
    },
    '/teams/v1/{id}/': {
      get: (ctx) => {
        const allTeamIds = ctx.server.teams.map((team) => team.id)
        const team = ctx.server.teams.find((t) => t.id === ctx.params.id)
        if (!team) {
          return {
            status: 404,
            data: {
              message: `${ctx.params.id} not found in ${allTeamIds.join(', ')}`,
            },
          }
        }
        return {
          data: {
            ...team,
            id: team.id,
            name: `${team.name}`,
            available_plans: [],
            invites: [],
            members: [],
            subscription: null,
          },
        }
      },
    },
    '/providers/v1/{id}/': {
      get: (ctx) => ({
        data: ProviderToJSON({
          id: ctx.server.providerId,
          name: 'Provider',
          slug: 'provider',
          ownerId: '0',
          stripeAccountId: '',
          isShadow: false,
          parentId: null,
          shadowId: null,
        }),
      }),
    },
  }

  addTeam(team: TeamData) {
    this.teams.push(team)
  }

  private routeLookup: Array<{
    matcher: RegExp
    method: string
    path: string
    handler: (ctx: RouteParams) => StubResponse
  }> = []

  constructor() {
    super()

    this.providerId = `proxy`
    this.customerId = `customer`
    this.teams = [withDates({ id: '1', name: 'dumdums' })]

    Object.entries(this.routes).forEach(([path, handlers]) => {
      const matcher = pathToRegexp(path)
      Object.entries(handlers).forEach(([method, handler]) => {
        if (!handler) return
        this.routeLookup.push({ matcher, method, handler, path })
      })
    })

    this.use((ctx) => {
      try {
        const { route, params } = this.findRoute(ctx.method, ctx.path)

        if (!route) {
          ctx.throw(500, `${ctx.method} ${ctx.url} not handled`)
          return
        }

        const { status = 200, data } = route({ server: this, koa: ctx, params })
        ctx.status = status
        ctx.body = data ?? {}
      } catch (e) {
        console.error(e)
        ctx.throw(500)
      }
    })
  }

  findRoute(method: string, path: string) {
    const route = this.routeLookup.find(
      ({ matcher, method: m }) =>
        matcher.test(path) && m.toLowerCase() === method.toLowerCase()
    )
    const params = {} as Record<string, string | undefined>
    if (!route) {
      return { route: undefined, params }
    }
    const keys = curlyMatcher.exec(route.path)
    const values = route.matcher.exec(path)
    keys?.reduce((acc, key, i) => {
      const value = values?.[i]

      acc[key] = value ? decodeUrl(value) : undefined
      return acc
    }, params)
    return { route: route?.handler, params }
  }

  start(port?: number): Promise<number> {
    return new Promise((resolve) => {
      getPort({ port }).then((p) => {
        this.server = this.listen(p, () => resolve(p))
      })
    })
  }

  async stop() {
    this.server?.close()
  }
}
