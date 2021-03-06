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
 * @interface Usage
 */
export interface Usage {
  /**
   *
   * @type {string}
   * @memberof Usage
   */
  readonly slug: string
  /**
   *
   * @type {number}
   * @memberof Usage
   */
  readonly value: number
  /**
   *
   * @type {number}
   * @memberof Usage
   */
  readonly limit: number
  /**
   *
   * @type {number}
   * @memberof Usage
   */
  readonly perUnit: number
}

export function UsageFromJSON(json: any): Usage {
  return UsageFromJSONTyped(json, false)
}

export function UsageFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Usage {
  if (json === undefined || json === null) {
    return json
  }
  return {
    slug: json['slug'],
    value: json['value'],
    limit: json['limit'],
    perUnit: json['per_unit'],
  }
}

export function UsageToJSON(value?: Usage | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {}
}
