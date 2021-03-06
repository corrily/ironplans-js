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
  RoleEnum,
  RoleEnumFromJSON,
  RoleEnumFromJSONTyped,
  RoleEnumToJSON,
} from './'

/**
 *
 * @export
 * @interface InviteRequest
 */
export interface InviteRequest {
  /**
   *
   * @type {string}
   * @memberof InviteRequest
   */
  sentToEmail: string
  /**
   *
   * @type {boolean}
   * @memberof InviteRequest
   */
  isClaimed?: boolean
  /**
   *
   * @type {Date}
   * @memberof InviteRequest
   */
  expiresAt?: Date
  /**
   *
   * @type {RoleEnum}
   * @memberof InviteRequest
   */
  role?: RoleEnum
  /**
   *
   * @type {string}
   * @memberof InviteRequest
   */
  teamId: string
}

export function InviteRequestFromJSON(json: any): InviteRequest {
  return InviteRequestFromJSONTyped(json, false)
}

export function InviteRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): InviteRequest {
  if (json === undefined || json === null) {
    return json
  }
  return {
    sentToEmail: json['sent_to_email'],
    isClaimed: !exists(json, 'is_claimed') ? undefined : json['is_claimed'],
    expiresAt: !exists(json, 'expires_at')
      ? undefined
      : new Date(json['expires_at']),
    role: !exists(json, 'role') ? undefined : RoleEnumFromJSON(json['role']),
    teamId: json['team_id'],
  }
}

export function InviteRequestToJSON(value?: InviteRequest | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    sent_to_email: value.sentToEmail,
    is_claimed: value.isClaimed,
    expires_at:
      value.expiresAt === undefined ? undefined : value.expiresAt.toISOString(),
    role: RoleEnumToJSON(value.role),
    team_id: value.teamId,
  }
}
