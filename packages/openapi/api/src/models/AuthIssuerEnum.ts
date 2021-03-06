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

/**
 *
 * @export
 * @enum {string}
 */
export enum AuthIssuerEnum {
  None = 'none',
  Firebase = 'firebase',
  Cognito = 'cognito',
  Frontegg = 'frontegg',
}

export function AuthIssuerEnumFromJSON(json: any): AuthIssuerEnum {
  return AuthIssuerEnumFromJSONTyped(json, false)
}

export function AuthIssuerEnumFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AuthIssuerEnum {
  return json as AuthIssuerEnum
}

export function AuthIssuerEnumToJSON(value?: AuthIssuerEnum | null): any {
  return value as any
}
