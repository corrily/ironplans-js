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
/**
 *
 * @export
 * @interface SubscriptionRequest
 */
export interface SubscriptionRequest {
  /**
   *
   * @type {string}
   * @memberof SubscriptionRequest
   */
  planId: string
  /**
   *
   * @type {string}
   * @memberof SubscriptionRequest
   */
  teamId: string
  /**
   *
   * @type {boolean}
   * @memberof SubscriptionRequest
   */
  isPaused?: boolean
  /**
   *
   * @type {string}
   * @memberof SubscriptionRequest
   */
  nextPlanId?: string
}

export function SubscriptionRequestFromJSON(json: any): SubscriptionRequest {
  return SubscriptionRequestFromJSONTyped(json, false)
}

export function SubscriptionRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): SubscriptionRequest {
  if (json === undefined || json === null) {
    return json
  }
  return {
    planId: json['plan_id'],
    teamId: json['team_id'],
    isPaused: !exists(json, 'is_paused') ? undefined : json['is_paused'],
    nextPlanId: !exists(json, 'next_plan_id')
      ? undefined
      : json['next_plan_id'],
  }
}

export function SubscriptionRequestToJSON(
  value?: SubscriptionRequest | null
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    plan_id: value.planId,
    team_id: value.teamId,
    is_paused: value.isPaused,
    next_plan_id: value.nextPlanId,
  }
}
