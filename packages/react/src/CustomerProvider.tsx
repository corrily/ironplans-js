import { Customer, CustomerOptions } from '@ironplans/sdk'
import React, { useCallback, useEffect } from 'react'

interface CustomerContextInterface {
  customer: Customer
  isLoading: boolean
  error?: Error | undefined
}

const CustomerContext = React.createContext<CustomerContextInterface>({
  error: new Error('You forgot to wrap your component in <CustomerProvider>.'),
  customer: new Customer({}),
  isLoading: false,
})

export const CustomerConsumer = CustomerContext.Consumer

export interface CustomerProviderProps extends CustomerOptions {}

export const CustomerProvider: React.FC<CustomerProviderProps> = ({
  children,
  ...props
}) => {
  const [state, setState] = React.useState<CustomerContextInterface>({
    customer: new Customer({ ...props }),
    isLoading: true,
  })

  const setComplete = useCallback(
    () => setState((s) => ({ ...s, isLoading: false })),
    []
  )
  const setError = useCallback(
    (e: Error) => setState((s) => ({ ...s, error: e })),
    []
  )
  useEffect(() => {
    state.customer.init().catch(setError).finally(setComplete)
  }, [setComplete, setError, state.customer])

  return (
    <CustomerContext.Provider value={state}>
      {children}
    </CustomerContext.Provider>
  )
}

export const useCustomer = () => React.useContext(CustomerContext)

export interface WithCustomerProps {
  customer: Customer
  customerError?: Error
}

export const withCustomer =
  <P extends WithCustomerProps>(
    Component: React.ComponentType<P>
  ): React.ComponentType<Omit<P, keyof WithCustomerProps>> =>
  (props) =>
    (
      <CustomerContext.Consumer>
        {(ctx) => <Component {...(props as P)} customer={ctx.customer} />}
      </CustomerContext.Consumer>
    )
