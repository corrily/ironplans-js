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

function pathToRegexp(path: string) {
  return new RegExp(
    `^${path.replace(/{([^}]+)}/g, '([^/]+)').replace(/\/$/, '/?')}$`
  )
}

type RouteParams = {
  server: Server
  request: Koa.Request
}
export class Server extends Koa {
  providerId: string

  customerId: string

  server?: NodeServer

  teams: IPTypes.components['schemas']['Team'][]

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
        data: paginate<IPTypes.components['schemas']['Team']>(ctx.server.teams),
      }),
    },
    '/teams/v1/{id}/': {
      get: (ctx) => ({
        data: {
          ...ctx.server.teams[0],
          name: `${ctx.server.teams[0].name}`,
          available_plans: [],
          invites: [],
          members: [],
          subscription: null,
        },
      }),
    },
    '/providers/v1/{id}/': {
      get: (ctx) => ({
        data: ProviderToJSON({
          id: ctx.server.providerId,
          name: 'Provider',
          slug: 'provider',
          ownerId: '0',
          stripeAccountId: '',
        }),
      }),
    },
  }

  private routeLookup: Array<{
    matcher: RegExp
    method: string
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
        this.routeLookup.push({ matcher, method, handler })
      })
    })

    this.use((ctx) => {
      try {
        const route = this.findRoute(ctx.method, ctx.path)
        if (!route) {
          ctx.throw(500, `${ctx.method} ${ctx.url} not handled`)
          return
        }
        const { status, data } = route({ server: this, request: ctx.request })
        ctx.status = status ?? 200
        ctx.body = data
      } catch (e) {
        ctx.throw(500, `${e}`)
      }
    })
  }

  findRoute(method: string, path: string) {
    const route = this.routeLookup.find(
      ({ matcher, method: m }) =>
        matcher.test(path) && m.toLowerCase() === method.toLowerCase()
    )
    return route?.handler
  }

  async start(port?: number): Promise<number> {
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
