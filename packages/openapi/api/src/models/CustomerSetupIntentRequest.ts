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
 * @interface CustomerSetupIntentRequest
 */
export interface CustomerSetupIntentRequest {
  /**
   *
   * @type {string}
   * @memberof CustomerSetupIntentRequest
   */
  planId: string
  /**
   *
   * @type {string}
   * @memberof CustomerSetupIntentRequest
   */
  teamId: string
}

export function CustomerSetupIntentRequestFromJSON(
  json: any
): CustomerSetupIntentRequest {
  return CustomerSetupIntentRequestFromJSONTyped(json, false)
}

export function CustomerSetupIntentRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CustomerSetupIntentRequest {
  if (json === undefined || json === null) {
    return json
  }
  return {
    planId: json['plan_id'],
    teamId: json['team_id'],
  }
}

export function CustomerSetupIntentRequestToJSON(
  value?: CustomerSetupIntentRequest | null
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
  }
}
