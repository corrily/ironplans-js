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
 * Add a new membership to a Team. Role defaults to `member` if not specified.
 * Specify `email` and/or `source_id` to lookup the customer, create it if it
 * doesn't exist, and add it to the team.
 * @export
 * @interface CreateTeammate
 */
export interface CreateTeammate {
  /**
   *
   * @type {RoleEnum}
   * @memberof CreateTeammate
   */
  role?: RoleEnum
  /**
   *
   * @type {string}
   * @memberof CreateTeammate
   */
  teamId: string
  /**
   *
   * @type {string}
   * @memberof CreateTeammate
   */
  customerId?: string
  /**
   *
   * @type {string}
   * @memberof CreateTeammate
   */
  email?: string
  /**
   *
   * @type {string}
   * @memberof CreateTeammate
   */
  sourceId?: string
}

export function CreateTeammateFromJSON(json: any): CreateTeammate {
  return CreateTeammateFromJSONTyped(json, false)
}

export function CreateTeammateFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CreateTeammate {
  if (json === undefined || json === null) {
    return json
  }
  return {
    role: !exists(json, 'role') ? undefined : RoleEnumFromJSON(json['role']),
    teamId: json['team_id'],
    customerId: !exists(json, 'customer_id') ? undefined : json['customer_id'],
    email: !exists(json, 'email') ? undefined : json['email'],
    sourceId: !exists(json, 'source_id') ? undefined : json['source_id'],
  }
}

export function CreateTeammateToJSON(value?: CreateTeammate | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    role: RoleEnumToJSON(value.role),
    team_id: value.teamId,
    customer_id: value.customerId,
    email: value.email,
    source_id: value.sourceId,
  }
}
