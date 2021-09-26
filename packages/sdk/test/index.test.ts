import { enableFetchMocks } from 'jest-fetch-mock'
import decode, { JwtPayload } from 'jwt-decode'
import { Customer } from '../src'
import { StubBackend } from './stub'

enableFetchMocks()

jest.mock('jwt-decode')
const decodeMock = decode as jest.Mock

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

describe('validate options', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    decodeMock.mockReturnValue(customerJwtClaims)
    fetchMock.mockResponse(new StubBackend().matcher())
  })

  test('empty public token', async () => {
    const c = new Customer({ publicToken: '', idToken: 'dummy' })
    await expect(c.init()).rejects.toThrow(/publicToken/)
  })

  test('all options work', async () => {
    const c = new Customer({
      publicToken: 'dummy',
      idToken: 'dummy',
    })

    await expect(c.init()).resolves.toBeInstanceOf(Customer)
  })

  test('options merged in init', async () => {
    const c = new Customer({})
    await expect(
      c.init({ publicToken: 'dummy', idToken: 'dummy' })
    ).resolves.toBeInstanceOf(Customer)
  })

  test('oidc init saves access token', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ token: 'bigdummy' }))
    const c = new Customer({
      publicToken: 'dummy',
      idToken: 'dummy',
    })
    expect(c.token).toBeUndefined()
    await c.init()
    expect(c.token).toBe('bigdummy')
  })
})
