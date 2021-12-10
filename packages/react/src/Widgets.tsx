import React, { FC, useRef, useEffect } from 'react'
import {
  Customer,
  Theme,
  WidgetType,
  Pricing,
  IFrameOptions,
  TeamWidgetType,
  APIOptions,
  CustomCopy,
} from '@ironplans/sdk'
import { useCustomer } from './CustomerProvider'

interface Props {
  theme?: Theme
  customCopy?: CustomCopy
}

interface WidgetProps extends Props {
  widget: TeamWidgetType
  customer?: Customer
}

interface PublicWidgetProps extends Props {
  publicToken: string
  redirectUrl: string
  apiOpts?: APIOptions
  iframeOpts?: IFrameOptions
}

export const Widget: FC<WidgetProps> = ({
  customer: c,
  theme,
  widget,
  customCopy,
}) => {
  const { customer, error, isLoading } = useCustomer(c)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (isLoading || error || !ref.current) return () => {}
    customer.getTeam().showWidget(widget, theme, ref.current, customCopy)
    const unsub = customer.onTeamChanged((team) => {
      // show widget handles the case where the old widget is already rendered in a target div.
      if (ref.current) {
        team.showWidget(widget, theme, ref.current)
      }
    })
    return () => unsub()
  }, [customer, error, isLoading, theme, widget, customCopy])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div ref={ref} style={{ width: '100%', height: '100%' }} />
}

export const PublicWidget: FC<PublicWidgetProps> = ({
  publicToken,
  redirectUrl,
  theme,
  customCopy,
  apiOpts,
  iframeOpts,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return () => {}
    const pricing = new Pricing({
      publicToken,
      ...apiOpts,
    })
    pricing.showWidget(
      theme,
      ref.current,
      {
        redirectUrl,
        ...iframeOpts,
      },
      customCopy
    )
    return () => {}
  }, [iframeOpts, publicToken, redirectUrl, theme, apiOpts, customCopy])
  return <div ref={ref} style={{ width: '100%', height: '100%' }} />
}

const withWidget =
  (widget: TeamWidgetType) => (props: Omit<WidgetProps, 'widget'>) =>
    <Widget widget={widget} {...props} />

const withPublicWidget = (widget: WidgetType) => (props: PublicWidgetProps) => {
  if (widget !== 'pricing') {
    throw Error('Only pricing is currently a valid public widget type.')
  }
  return <PublicWidget {...props} />
}

export const PlanSelect = withWidget('plans')
export const ManageTeam = withWidget('team')
export const ViewInvoices = withWidget('invoices')
export const PaymentMethods = withWidget('payment_methods')
export const PricingPlans = withPublicWidget('pricing')
