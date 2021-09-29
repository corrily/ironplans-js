import axios from 'axios'
import * as IPTypes from '@ironplans/types'
import * as Exports from '../src/server'

const app = new Exports.Server()
let port: number
const path = (url: string | keyof IPTypes.paths) =>
  `http://localhost:${port}${url}`

beforeAll(async () => {
  port = await app.start()
})
afterAll(() => {
  app.stop()
})

describe('server', () => {
  it('exchanges tokens', async () => {
    const { data } = await axios.post(path('/customers/v1/oidc-exchange/'))
    expect(data).toBeDefined()
    expect(data.token).toBeDefined()
    expect(data.token.length).toBeGreaterThan(0)
  })
  it('handles teams', async () => {
    const { data } = await axios.get(path('/teams/v1/'))
    expect(data).toBeDefined()
    expect(data.results).toBeDefined()
    expect(data.count).toBeGreaterThan(0)
    expect(data.results[0].id).toBeDefined()
  })
  it('handles get team', async () => {
    await Promise.all(
      app.teams.map(async (team) => {
        expect(team.id).toBeDefined()
        const { data } = await axios.get(path(`/teams/v1/${team.id}`))
        expect(data).toBeDefined()
        expect(data.id).toEqual(team.id)
      })
    )
  })
})
