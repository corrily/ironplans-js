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
  PlanFeatureRequest,
  PlanFeatureRequestFromJSON,
  PlanFeatureRequestFromJSONTyped,
  PlanFeatureRequestToJSON,
  TeamAccessRequest,
  TeamAccessRequestFromJSON,
  TeamAccessRequestFromJSONTyped,
  TeamAccessRequestToJSON,
} from './'

/**
 *
 * @export
 * @interface PlanRequest
 */
export interface PlanRequest {
  /**
   *
   * @type {string}
   * @memberof PlanRequest
   */
  providerId?: string
  /**
   *
   * @type {string}
   * @memberof PlanRequest
   */
  name: string
  /**
   *
   * @type {number}
   * @memberof PlanRequest
   */
  tier?: number
  /**
   *
   * @type {boolean}
   * @memberof PlanRequest
   */
  isActive: boolean
  /**
   *
   * @type {boolean}
   * @memberof PlanRequest
   */
  isPublic: boolean
  /**
   *
   * @type {boolean}
   * @memberof PlanRequest
   */
  isTrialAllowed: boolean
  /**
   *
   * @type {boolean}
   * @memberof PlanRequest
   */
  isSelfServe?: boolean
  /**
   *
   * @type {string}
   * @memberof PlanRequest
   */
  redirectUrl?: string | null
  /**
   *
   * @type {string}
   * @memberof PlanRequest
   */
  ctaText?: string | null
  /**
   *
   * @type {string}
   * @memberof PlanRequest
   */
  replacePlanId: string | null
  /**
   * Amount in cents
   * @type {number}
   * @memberof PlanRequest
   */
  perYearPriceCents?: number | null
  /**
   * Amount in cents
   * @type {number}
   * @memberof PlanRequest
   */
  perMonthPriceCents?: number | null
  /**
   *
   * @type {Array<PlanFeatureRequest>}
   * @memberof PlanRequest
   */
  features: Array<PlanFeatureRequest>
  /**
   *
   * @type {Array<TeamAccessRequest>}
   * @memberof PlanRequest
   */
  teamsAccess: Array<TeamAccessRequest>
}

export function PlanRequestFromJSON(json: any): PlanRequest {
  return PlanRequestFromJSONTyped(json, false)
}

export function PlanRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PlanRequest {
  if (json === undefined || json === null) {
    return json
  }
  return {
    providerId: !exists(json, 'provider_id') ? undefined : json['provider_id'],
    name: json['name'],
    tier: !exists(json, 'tier') ? undefined : json['tier'],
    isActive: json['is_active'],
    isPublic: json['is_public'],
    isTrialAllowed: json['is_trial_allowed'],
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
    features: (json['features'] as Array<any>).map(PlanFeatureRequestFromJSON),
    teamsAccess: (json['teams_access'] as Array<any>).map(
      TeamAccessRequestFromJSON
    ),
  }
}

export function PlanRequestToJSON(value?: PlanRequest | null): any {
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
    features: (value.features as Array<any>).map(PlanFeatureRequestToJSON),
    teams_access: (value.teamsAccess as Array<any>).map(
      TeamAccessRequestToJSON
    ),
  }
}
