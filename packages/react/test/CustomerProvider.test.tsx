import React from 'react'
import * as IP from '@ironplans/proxy'
import { render, screen } from '@testing-library/react'
import { CustomerProvider, CustomerConsumer } from '../src/CustomerProvider'

const app = new IP.Server()
const server = app.listen(3000)

afterAll(() => {
  server.close()
})

describe('Thing', () => {
  it('renders without crashing', () => {
    render(
      <CustomerProvider>
        <CustomerConsumer>
          {(ctx) => <div>token: {ctx.customer.token}</div>}
        </CustomerConsumer>
      </CustomerProvider>
    )
    expect(screen.getByText('token: ')).toHaveTextContent('token: ')
  })
})
