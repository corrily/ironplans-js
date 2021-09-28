import { OpEnum, SubscriptionDetail, Usage } from '@ironplans/api'
import { Resource } from './api'

export default class Subscription extends Resource<SubscriptionDetail> {
  status() {
    if (!this.data.isActive) return 'inactive' as const
    return 'active' as const
  }

  isActive() {
    return this.status() === 'active'
  }

  allFeatures() {
    return this.data.plan.features
  }

  allSlugs() {
    return this.data.plan.features.filter((f) => !!f.slug).map((f) => f.slug)
  }

  usage(slug: string): Usage {
    const usage = this.data.usages.find((u) => u.slug === slug)
    if (!usage) {
      // Check if its a plan feature
      const feature = this.data.plan.features.find((f) => f.slug === slug)
      if (!feature)
        throw new Error(
          `No usage found for ${slug}.  Slugs: ${this.allSlugs().join(', ')}`
        )
      return {
        limit: feature.maxLimit,
        value: 0,
        slug,
        perUnit: feature.spec.unitPrice ?? 0,
      }
    }
    return usage
  }

  report(slug: string, value: number, op = OpEnum.Inc) {
    this.api.subscriptions.subscriptionsV1ReportCreate({
      id: this.data.id,
      reportUsageRequest: {
        op,
        slug,
        value,
      },
    })
    return this.usage(slug).value
  }
}
