import React, { FC, useRef, useEffect } from 'react'
import { Customer, Theme } from '@ironplans/sdk'
import { useCustomer } from './CustomerProvider'

interface Props {
  customer?: Customer
  theme?: Theme
}

const PlanSelect: FC<Props> = ({ customer: c, theme }) => {
  const { customer, error, isLoading } = useCustomer(c)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoading && !error && ref.current) {
      customer.getTeam().showWidget('plans', theme, ref.current)
    }
  }, [customer, error, isLoading, theme])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div ref={ref} style={{ width: '100%', height: '100%' }} />
}

export default PlanSelect
