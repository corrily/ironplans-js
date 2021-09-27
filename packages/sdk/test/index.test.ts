import * as IP from '@ironplans/proxy'
import 'jest-fetch-mock'
import { Customer } from '../src'

const app = new IP.Server()
const server = app.listen(3000)

afterAll(() => {
  server.close()
})

describe('validate options', () => {
  test('empty public token', async () => {
    const c = new Customer({ publicToken: '', idToken: 'dummy' })
    await expect(c.init()).rejects.toThrow(/publicToken/)
  })

  test('all options work', async () => {
    const c = new Customer({
      publicToken: 'dummy',
      idToken: 'dummy',
      apiBaseUrl: 'http://localhost:3000',
    })

    await expect(c.init()).resolves.toBeInstanceOf(Customer)
    expect(c.token).toBeDefined()
  })

  test('options merged in init', async () => {
    const c = new Customer({
      apiBaseUrl: 'http://localhost:3000',
    })
    await expect(
      c.init({ publicToken: 'dummy', idToken: 'dummy' })
    ).resolves.toBeInstanceOf(Customer)
    expect(c.token).toBeDefined()
  })
})
