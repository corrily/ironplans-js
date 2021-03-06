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
import { Team, TeamFromJSON, TeamFromJSONTyped, TeamToJSON } from './'

/**
 *
 * @export
 * @interface PaginatedTeamList
 */
export interface PaginatedTeamList {
  /**
   *
   * @type {number}
   * @memberof PaginatedTeamList
   */
  count?: number
  /**
   *
   * @type {string}
   * @memberof PaginatedTeamList
   */
  next?: string | null
  /**
   *
   * @type {string}
   * @memberof PaginatedTeamList
   */
  previous?: string | null
  /**
   *
   * @type {Array<Team>}
   * @memberof PaginatedTeamList
   */
  results?: Array<Team>
}

export function PaginatedTeamListFromJSON(json: any): PaginatedTeamList {
  return PaginatedTeamListFromJSONTyped(json, false)
}

export function PaginatedTeamListFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PaginatedTeamList {
  if (json === undefined || json === null) {
    return json
  }
  return {
    count: !exists(json, 'count') ? undefined : json['count'],
    next: !exists(json, 'next') ? undefined : json['next'],
    previous: !exists(json, 'previous') ? undefined : json['previous'],
    results: !exists(json, 'results')
      ? undefined
      : (json['results'] as Array<any>).map(TeamFromJSON),
  }
}

export function PaginatedTeamListToJSON(value?: PaginatedTeamList | null): any {
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
        : (value.results as Array<any>).map(TeamToJSON),
  }
}
