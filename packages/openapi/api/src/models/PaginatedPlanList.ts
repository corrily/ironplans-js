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
import { Plan, PlanFromJSON, PlanFromJSONTyped, PlanToJSON } from './'

/**
 *
 * @export
 * @interface PaginatedPlanList
 */
export interface PaginatedPlanList {
  /**
   *
   * @type {number}
   * @memberof PaginatedPlanList
   */
  count?: number
  /**
   *
   * @type {string}
   * @memberof PaginatedPlanList
   */
  next?: string | null
  /**
   *
   * @type {string}
   * @memberof PaginatedPlanList
   */
  previous?: string | null
  /**
   *
   * @type {Array<Plan>}
   * @memberof PaginatedPlanList
   */
  results?: Array<Plan>
}

export function PaginatedPlanListFromJSON(json: any): PaginatedPlanList {
  return PaginatedPlanListFromJSONTyped(json, false)
}

export function PaginatedPlanListFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PaginatedPlanList {
  if (json === undefined || json === null) {
    return json
  }
  return {
    count: !exists(json, 'count') ? undefined : json['count'],
    next: !exists(json, 'next') ? undefined : json['next'],
    previous: !exists(json, 'previous') ? undefined : json['previous'],
    results: !exists(json, 'results')
      ? undefined
      : (json['results'] as Array<any>).map(PlanFromJSON),
  }
}

export function PaginatedPlanListToJSON(value?: PaginatedPlanList | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    count: value.count,
    next: value.next,
    previous: value.previous,
    results:
      value.results === undefined
        ? undefined
        : (value.results as Array<any>).map(PlanToJSON),
  }
}
