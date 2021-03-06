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
import { OpEnum, OpEnumFromJSON, OpEnumFromJSONTyped, OpEnumToJSON } from './'

/**
 *
 * @export
 * @interface ReportUsageRequest
 */
export interface ReportUsageRequest {
  /**
   *
   * @type {string}
   * @memberof ReportUsageRequest
   */
  slug: string
  /**
   *
   * @type {OpEnum}
   * @memberof ReportUsageRequest
   */
  op: OpEnum
  /**
   *
   * @type {number}
   * @memberof ReportUsageRequest
   */
  value?: number
}

export function ReportUsageRequestFromJSON(json: any): ReportUsageRequest {
  return ReportUsageRequestFromJSONTyped(json, false)
}

export function ReportUsageRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ReportUsageRequest {
  if (json === undefined || json === null) {
    return json
  }
  return {
    slug: json['slug'],
    op: OpEnumFromJSON(json['op']),
    value: !exists(json, 'value') ? undefined : json['value'],
  }
}

export function ReportUsageRequestToJSON(
  value?: ReportUsageRequest | null
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    slug: value.slug,
    op: OpEnumToJSON(value.op),
    value: value.value,
  }
}
