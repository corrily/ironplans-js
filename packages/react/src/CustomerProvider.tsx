import { Customer, CustomerOptions } from '@ironplans/sdk'
import React, { useCallback, useEffect } from 'react'

interface CustomerContextInterface {
  customer: Customer
  isLoading: boolean
  isInitializing: boolean
  error?: Error | undefined
}

const CustomerContext = React.createContext<CustomerContextInterface>({
  error: new Error('You forgot to wrap your component in <CustomerProvider>.'),
  customer: new Customer({}),
  isLoading: false,
  isInitializing: false,
})

export const CustomerConsumer = CustomerContext.Consumer

export interface CustomerProviderProps extends CustomerOptions {}

export const CustomerProvider: React.FC<CustomerProviderProps> = ({
  children,
  ...props
}) => {
  const [, setRender] = React.useState(0)
  const forceRender = () => setRender((renderCount) => renderCount + 1)
  const [state, setState] = React.useState<CustomerContextInterface>({
    customer: new Customer({ ...props }),
    isLoading: true,
    isInitializing: false,
  })

  const setComplete = useCallback(() => {
    setState((s) => ({ ...s, isLoading: false, isInitializing: false }))
  }, [])

  const setError = useCallback((e: Error) => {
    setState((s) => ({
      ...s,
      error: e,
      isLoading: false,
      isInitializing: false,
    }))
  }, [])

  useEffect(() => {
    if (state.error) return
    if (state.customer.isInitialized) return
    if (
      !state.customer.token &&
      !props.token &&
      !props.idToken &&
      !props.publicToken
    )
      return
    if (state.isInitializing) return
    setState((s) => ({ ...s, isInitializing: true }))
    state.customer.init(props).then(setComplete).catch(setError)
  }, [
    props,
    setComplete,
    setError,
    state.customer,
    state.error,
    state.isInitializing,
  ])

  // capture value
  const { teamId } = props
  useEffect(() => {
    if (!teamId) return () => {}

    const setTeam = (c: Customer) => {
      const team = c.getTeam()
      if (teamId !== team.id) {
        c.setTeam(teamId).then(forceRender)
      }
    }

    if (!state.customer.isInitialized) {
      const unsub = state.customer.onInitialized(setTeam)
      return () => unsub()
    }
    setTeam(state.customer)
    return () => {}
  }, [state.customer, teamId])

  return (
    <CustomerContext.Provider value={state}>
      {children}
    </CustomerContext.Provider>
  )
}

export const useCustomer = (customer?: Customer) => {
  const ctx = React.useContext(CustomerContext)
  if (customer)
    return {
      customer,
      isLoading: false,
      isInitializing: !customer.isInitialized,
    }
  return ctx
}

export interface WithCustomerProps {
  customer: Customer
  customerLoading: boolean
  customerError?: Error
}

export const withCustomer =
  <P extends WithCustomerProps>(
    Component: React.ComponentType<P>
  ): React.ComponentType<Omit<P, keyof WithCustomerProps>> =>
  (props) =>
    (
      <CustomerContext.Consumer>
        {(ctx) => (
          <Component
            {...(props as P)}
            customer={ctx.customer}
            customerError={ctx.error}
            customerLoading={ctx.isLoading}
          />
        )}
      </CustomerContext.Consumer>
    )
