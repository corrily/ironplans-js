/* tslint:disable */
/* eslint-disable */
/**
 * Iron Plans API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime'
import {
  PlanFeature,
  PlanFeatureFromJSON,
  PlanFeatureFromJSONTyped,
  PlanFeatureToJSON,
  TeamAccess,
  TeamAccessFromJSON,
  TeamAccessFromJSONTyped,
  TeamAccessToJSON,
} from './'

/**
 *
 * @export
 * @interface Plan
 */
export interface Plan {
  /**
   *
   * @type {string}
   * @memberof Plan
   */
  readonly id: string
  /**
   *
   * @type {string}
   * @memberof Plan
   */
  providerId?: string
  /**
   *
   * @type {string}
   * @memberof Plan
   */
  name: string
  /**
   *
   * @type {number}
   * @memberof Plan
   */
  tier?: number
  /**
   *
   * @type {boolean}
   * @memberof Plan
   */
  isActive: boolean
  /**
   *
   * @type {boolean}
   * @memberof Plan
   */
  isPublic: boolean
  /**
   *
   * @type {boolean}
   * @memberof Plan
   */
  isTrialAllowed: boolean
  /**
   *
   * @type {boolean}
   * @memberof Plan
   */
  readonly isDefault: boolean
  /**
   *
   * @type {boolean}
   * @memberof Plan
   */
  isSelfServe?: boolean
  /**
   *
   * @type {string}
   * @memberof Plan
   */
  redirectUrl?: string | null
  /**
   *
   * @type {string}
   * @memberof Plan
   */
  ctaText?: string | null
  /**
   *
   * @type {string}
   * @memberof Plan
   */
  replacePlanId: string | null
  /**
   * Amount in cents
   * @type {number}
   * @memberof Plan
   */
  perYearPriceCents?: number | null
  /**
   * Amount in cents
   * @type {number}
   * @memberof Plan
   */
  perMonthPriceCents?: number | null
  /**
   *
   * @type {Array<PlanFeature>}
   * @memberof Plan
   */
  features: Array<PlanFeature>
  /**
   *
   * @type {Array<TeamAccess>}
   * @memberof Plan
   */
  teamsAccess: Array<TeamAccess>
}

export function PlanFromJSON(json: any): Plan {
  return PlanFromJSONTyped(json, false)
}

export function PlanFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Plan {
  if (json === undefined || json === null) {
    return json
  }
  return {
    id: json['id'],
    providerId: !exists(json, 'provider_id') ? undefined : json['provider_id'],
    name: json['name'],
    tier: !exists(json, 'tier') ? undefined : json['tier'],
    isActive: json['is_active'],
    isPublic: json['is_public'],
    isTrialAllowed: json['is_trial_allowed'],
    isDefault: json['is_default'],
    isSelfServe: !exists(json, 'is_self_serve')
      ? undefined
      : json['is_self_serve'],
    redirectUrl: !exists(json, 'redirect_url')
      ? undefined
      : json['redirect_url'],
    ctaText: !exists(json, 'cta_text') ? undefined : json['cta_text'],
    replacePlanId: json['replace_plan_id'],
    perYearPriceCents: !exists(json, 'per_year_price_cents')
      ? undefined
      : json['per_year_price_cents'],
    perMonthPriceCents: !exists(json, 'per_month_price_cents')
      ? undefined
      : json['per_month_price_cents'],
    features: (json['features'] as Array<any>).map(PlanFeatureFromJSON),
    teamsAccess: (json['teams_access'] as Array<any>).map(TeamAccessFromJSON),
  }
}

export function PlanToJSON(value?: Plan | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    provider_id: value.providerId,
    name: value.name,
    tier: value.tier,
    is_active: value.isActive,
    is_public: value.isPublic,
    is_trial_allowed: value.isTrialAllowed,
    is_self_serve: value.isSelfServe,
    redirect_url: value.redirectUrl,
    cta_text: value.ctaText,
    replace_plan_id: value.replacePlanId,
    per_year_price_cents: value.perYearPriceCents,
    per_month_price_cents: value.perMonthPriceCents,
    features: (value.features as Array<any>).map(PlanFeatureToJSON),
    teams_access: (value.teamsAccess as Array<any>).map(TeamAccessToJSON),
  }
}
