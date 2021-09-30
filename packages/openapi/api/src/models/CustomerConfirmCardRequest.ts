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
 * @interface CustomerConfirmCardRequest
 */
export interface CustomerConfirmCardRequest {
  /**
   *
   * @type {string}
   * @memberof CustomerConfirmCardRequest
   */
  stripeSetupId: string
  /**
   *
   * @type {string}
   * @memberof CustomerConfirmCardRequest
   */
  paymentMethodId: string
}

export function CustomerConfirmCardRequestFromJSON(
  json: any
): CustomerConfirmCardRequest {
  return CustomerConfirmCardRequestFromJSONTyped(json, false)
}

export function CustomerConfirmCardRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CustomerConfirmCardRequest {
  if (json === undefined || json === null) {
    return json
  }
  return {
    stripeSetupId: json['stripe_setup_id'],
    paymentMethodId: json['payment_method_id'],
  }
}

export function CustomerConfirmCardRequestToJSON(
  value?: CustomerConfirmCardRequest | null
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    stripe_setup_id: value.stripeSetupId,
    payment_method_id: value.paymentMethodId,
  }
}
