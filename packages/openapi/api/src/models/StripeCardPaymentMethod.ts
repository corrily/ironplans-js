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
  StripeCard,
  StripeCardFromJSON,
  StripeCardFromJSONTyped,
  StripeCardToJSON,
} from './'

/**
 *
 * @export
 * @interface StripeCardPaymentMethod
 */
export interface StripeCardPaymentMethod {
  /**
   *
   * @type {string}
   * @memberof StripeCardPaymentMethod
   */
  readonly id: string
  /**
   *
   * @type {number}
   * @memberof StripeCardPaymentMethod
   */
  readonly created: number
  /**
   *
   * @type {boolean}
   * @memberof StripeCardPaymentMethod
   */
  readonly isDefault: boolean | null
  /**
   *
   * @type {StripeCard}
   * @memberof StripeCardPaymentMethod
   */
  card: StripeCard
}

export function StripeCardPaymentMethodFromJSON(
  json: any
): StripeCardPaymentMethod {
  return StripeCardPaymentMethodFromJSONTyped(json, false)
}

export function StripeCardPaymentMethodFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): StripeCardPaymentMethod {
  if (json === undefined || json === null) {
    return json
  }
  return {
    id: json['id'],
    created: json['created'],
    isDefault: json['is_default'],
    card: StripeCardFromJSON(json['card']),
  }
}

export function StripeCardPaymentMethodToJSON(
  value?: StripeCardPaymentMethod | null
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    card: StripeCardToJSON(value.card),
  }
}
