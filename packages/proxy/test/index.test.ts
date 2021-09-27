import axios from 'axios'
import * as IPTypes from '@ironplans/types'
import * as Exports from '../src'

const app = new Exports.Server()
const server = app.listen(5432)
const path = (url: keyof IPTypes.paths) => `http://localhost:5432${url}`

afterAll(() => {
  server.close()
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
})
