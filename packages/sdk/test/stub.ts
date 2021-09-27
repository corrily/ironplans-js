import * as IronPlanTypes from '@ironplans/types'
import { MockResponseInit, MockResponseInitFunction } from 'jest-fetch-mock'

function paginate<T>(list: T[]) {
  return {
    results: list,
    next: null,
    previous: null,
    count: list.length,
  }
}

function withDates<T>(
  object: T
): T & { created_at: string; updated_at: string } {
  return {
    ...object,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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

type StubResponse<R = unknown, S = number> = {
  status?: S
  response: R
}

type Stub = {
  [P in string & keyof IronPlanTypes.paths]?:
    | {
        [M in string &
          keyof IronPlanTypes.paths[P]]?: IronPlanTypes.paths[P][M] extends {
          responses: infer R
        }
          ? StubResponse<
              ValueOf<ExtractJSONByStatus<R>>,
              keyof ExtractJSONByStatus<R>
            >
          : undefined
      }
}

const stub: Stub = {
  '/customers/v1/oidc-exchange/': {
    post: {
      response: {
        token: 'dummy',
        is_new: true,
      },
    },
  },
  '/teams/v1/': {
    get: {
      response: paginate([withDates({ id: '1', name: 'dumdum' })]),
    },
  },
  '/teams/v1/{id}/': {
    get: {
      response: withDates({
        id: '1',
        name: 'dumdum',
        available_plans: [],
        invites: [],
        members: [],
        subscription: null,
      }),
    },
  },
  '/providers/v1/{id}/': {
    get: {
      response: withDates({
        id: '1',
        name: 'dumdum',
        owner_id: '1',
        slug: 'dumdum',
        stripe_account_id: 'stripe_acct_id',
      }),
    },
  },
}

function pathToRegexp(path: string) {
  return new RegExp(`^${path.replace(/{([^}]+)}/g, '([^/]+)')}$`)
}

export default class StubBackend {
  stubs = stub

  paths: Array<{ matcher: RegExp; path: keyof Stub }>

  constructor(customStubs?: Stub) {
    this.stubs = customStubs ?? stub
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

  matcher(): MockResponseInitFunction {
    return async (request): Promise<MockResponseInit> => {
      const url = new URL(request.url)
      const path = url.pathname
      const method = request.method.toLowerCase() as HttpMethod

      const { status, response } = this.findStub(path, method) ?? {}
      if (response)
        return {
          status: status ?? 200,
          body: JSON.stringify(response),
        }

      throw new Error(`unexpected request: ${method} ${path}`)
    }
  }
}
