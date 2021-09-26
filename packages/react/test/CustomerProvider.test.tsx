import React from 'react'
import { render, screen } from '@testing-library/react'
import { CustomerProvider, CustomerConsumer } from '../src/CustomerProvider'

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
