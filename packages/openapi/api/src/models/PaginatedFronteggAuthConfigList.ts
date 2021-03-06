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
  FronteggAuthConfig,
  FronteggAuthConfigFromJSON,
  FronteggAuthConfigFromJSONTyped,
  FronteggAuthConfigToJSON,
} from './'

/**
 *
 * @export
 * @interface PaginatedFronteggAuthConfigList
 */
export interface PaginatedFronteggAuthConfigList {
  /**
   *
   * @type {number}
   * @memberof PaginatedFronteggAuthConfigList
   */
  count?: number
  /**
   *
   * @type {string}
   * @memberof PaginatedFronteggAuthConfigList
   */
  next?: string | null
  /**
   *
   * @type {string}
   * @memberof PaginatedFronteggAuthConfigList
   */
  previous?: string | null
  /**
   *
   * @type {Array<FronteggAuthConfig>}
   * @memberof PaginatedFronteggAuthConfigList
   */
  results?: Array<FronteggAuthConfig>
}

export function PaginatedFronteggAuthConfigListFromJSON(
  json: any
): PaginatedFronteggAuthConfigList {
  return PaginatedFronteggAuthConfigListFromJSONTyped(json, false)
}

export function PaginatedFronteggAuthConfigListFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PaginatedFronteggAuthConfigList {
  if (json === undefined || json === null) {
    return json
  }
  return {
    count: !exists(json, 'count') ? undefined : json['count'],
    next: !exists(json, 'next') ? undefined : json['next'],
    previous: !exists(json, 'previous') ? undefined : json['previous'],
    results: !exists(json, 'results')
      ? undefined
      : (json['results'] as Array<any>).map(FronteggAuthConfigFromJSON),
  }
}

export function PaginatedFronteggAuthConfigListToJSON(
  value?: PaginatedFronteggAuthConfigList | null
): any {
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
        : (value.results as Array<any>).map(FronteggAuthConfigToJSON),
  }
}
