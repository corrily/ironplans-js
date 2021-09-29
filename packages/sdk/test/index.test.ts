import * as IP from '@ironplans/proxy'
import 'jest-fetch-mock'
import { Customer } from '../src'

const app = new IP.Server()
app.addTeam(
  IP.withDates({
    id: 'anything else',
    name: 'goofy goobers',
  })
)
let port: number
let dummy: Customer

beforeAll(async () => {
  port = await app.start()
  console.debug(`Server started on port ${port}`)
})

afterAll(() => {
  app.stop()
})

beforeEach(async () => {
  dummy = await Customer.init({
    idToken: 'dummy',
    apiBaseUrl: `http://localhost:${port}`,
    publicToken: 'dummy',
  })
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
      apiBaseUrl: `http://localhost:${port}`,
    })

    await expect(c.init()).resolves.toBeInstanceOf(Customer)
    expect(c.token).toBeDefined()
  })

  test('options merged in init', async () => {
    const c = new Customer({
      apiBaseUrl: `http://localhost:${port}`,
    })
    await expect(
      c.init({ publicToken: 'dummy', idToken: 'dummy' })
    ).resolves.toBeInstanceOf(Customer)
    expect(c.token).toBeDefined()
  })

  test('customer team change emits event', (done) => {
    dummy.fetchTeams().then(async (teams) => {
      const currentTeam = dummy.getTeam().data
      const otherTeam = teams.find((t) => t.id !== currentTeam.id)
      console.debug('want', otherTeam!.id)

      expect(otherTeam).toBeDefined()

      const unsub = dummy.onTeamChanged((newTeam) => {
        expect(newTeam).toBeDefined()
        expect(otherTeam!.id).toEqual(newTeam.id)
        done()
      })
      const newTeam = await dummy.setTeam(otherTeam!.id)
      expect(newTeam.id).toEqual(otherTeam!.id)
      unsub()
    })
  })
})
