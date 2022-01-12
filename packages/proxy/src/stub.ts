import { URL } from 'url'
import { IncomingMessage } from 'http'
import * as IPTypes from '@ironplans/types'

export type Route<
  P extends keyof IPTypes.paths,
  M extends keyof IPTypes.paths[P],
  C
> = (
  c: C
) => ExtractResponse<IPTypes.paths[P][M]> | { status: number; data: unknown }

export type Routes<C = unknown> = {
  [P in keyof IPTypes.paths]?: {
    [M in keyof IPTypes.paths[P]]?: Route<P, M, C>
  }
}
type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'
type ValueOf<T> = T[keyof T]
type ExtractJSONByStatus<R> = {
  [S in number & keyof R]: R[S] extends {
    content: {
      'application/json': infer S2
    }
  }
    ? S2
    : never
}

export type StubResponse<R = unknown, S = number> = {
  status?: S
  data: R
}

type ExtractResponse<R> = R extends {
  responses: infer R2
}
  ? StubResponse<
      ValueOf<ExtractJSONByStatus<R2>>,
      keyof ExtractJSONByStatus<R2>
    >
  : StubResponse<unknown, number>

type Stub = {
  [P in string & keyof IPTypes.paths]?:
    | {
        [M in string & keyof IPTypes.paths[P]]?: ExtractResponse<
          IPTypes.paths[P][M]
        >
      }
}

export function paginate<T>(list: T[]) {
  return {
    results: list,
    next: null,
    previous: null,
    count: list.length,
  }
}

export const dummyTeam = {
  id: '1',
  name: 'dumdum',
  subscription_id: '',
  available_plans: [],
  invites: [],
  members: [],
  subscription: null,
  total_credits: 0,
  metadata: {},
  provider_id: '',
}

export function withDates<T>(
  object: T
): T & { created_at: string; updated_at: string } {
  return {
    ...object,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

const defaultMatches: Stub = {
  '/customers/v1/oidc-exchange/': {
    post: {
      data: {
        token: 'dummy',
        is_new: true,
      },
    },
  },
  '/teams/v1/': {
    get: {
      data: paginate([withDates(dummyTeam)]),
    },
  },
  '/teams/v1/{id}/': {
    get: {
      data: withDates(dummyTeam),
    },
  },
  '/providers/v1/{id}/': {
    get: {
      data: withDates({
        id: '1',
        name: 'dumdum',
        owner_id: '1',
        slug: 'dumdum',
        stripe_account_id: 'stripe_acct_id',
        auth_issuer: undefined,
        cognito_auth_config: null,
        frontegg_auth_config: null,
        is_shadow: false,
        shadow_id: null,
        parent_id: null,
        default_plan: null,
      }),
    },
  },
}

function pathToRegexp(path: string) {
  return new RegExp(
    `^${path.replace(/{([^}]+)}/g, '([^/]+)').replace(/\/$/, '/?')}$`
  )
}

export default class StubManager {
  stubs = defaultMatches

  paths: Array<{ matcher: RegExp; path: keyof Stub }>

  constructor(customStubs?: Stub) {
    this.stubs = customStubs ?? defaultMatches
    this.paths = Object.keys(this.stubs).map((path) => ({
      matcher: pathToRegexp(path),
      path: path as keyof Stub,
    }))
  }

  findStub(pathname: string, method: HttpMethod): StubResponse {
    const stubMatch = this.paths.find(({ matcher }) => matcher.test(pathname))
    if (!stubMatch) {
      throw new Error(`No stub found for ANY ${pathname}`)
    }

    const stubMethods = this.stubs[stubMatch.path]
    if (!stubMethods) {
      throw new Error(`No stub found for ANY ${pathname}`)
    }

    const stubResponse = stubMethods[
      method as keyof typeof stubMethods
    ] as StubResponse
    if (!stubResponse) {
      throw new Error(`No stub response for ${method} ${pathname}`)
    }

    return stubResponse
  }

  matcher() {
    return async (request: IncomingMessage): Promise<StubResponse> => {
      if (!request.url) throw new Error('No url')
      if (!request.method) throw new Error('No method')

      const url = new URL(request.url, `http://${request.headers.host}`)
      const path = url.pathname
      const method = request.method.toLowerCase() as HttpMethod

      const response = this.findStub(path, method) ?? {}

      if (response) return response
      throw new Error(`unexpected request: ${method} ${path}`)
    }
  }
}
