import React from 'react'
import * as IP from '@ironplans/proxy'
import { render, screen } from '@testing-library/react'
import { CustomerProvider, CustomerConsumer } from '../src/CustomerProvider'
import '@testing-library/jest-dom/extend-expect'

const app = new IP.Server()
let port: number

beforeAll(async () => {
  port = await app.start()
})
afterAll(() => {
  app.stop()
})

describe('Thing', () => {
  it('renders without crashing', () => {
    render(
      <CustomerProvider apiBaseUrl={`http://localhost:${port}`}>
        <CustomerConsumer>
          {(ctx) => <div>token: {ctx.customer.token}</div>}
        </CustomerConsumer>
      </CustomerProvider>
    )
    expect(screen.getByText('token:')).toHaveTextContent('token:')
  })
})
