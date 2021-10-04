import React, { FC, useRef, useEffect } from 'react'
import { Customer, Theme, WidgetType } from '@ironplans/sdk'
import { useCustomer } from './CustomerProvider'

interface Props {
  widget: WidgetType
  customer?: Customer
  theme?: Theme
}

export const Widget: FC<Props> = ({ customer: c, theme, widget }) => {
  const { customer, error, isLoading } = useCustomer(c)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (isLoading || error || !ref.current) return () => {}
    customer.getTeam().showWidget(widget, theme, ref.current)
    const unsub = customer.onTeamChanged((team) => {
      // show widget handles the case where the old widget is already rendered in a target div.
      if (ref.current) {
        team.showWidget(widget, theme, ref.current)
      }
    })
    return () => unsub()
  }, [customer, error, isLoading, theme, widget])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div ref={ref} style={{ width: '100%', height: '100%' }} />
}

const withWidget = (widget: WidgetType) => (props: Omit<Props, 'widget'>) => {
  if (widget === 'pricing') {
  }
  return <Widget widget={widget} {...props} />
}

export const PlanSelect = withWidget('plans')
export const ManageTeam = withWidget('team')
export const ViewInvoices = withWidget('invoices')
