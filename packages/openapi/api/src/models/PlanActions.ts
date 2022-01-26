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
  CancelAction,
  CancelActionFromJSON,
  CancelActionFromJSONTyped,
  CancelActionToJSON,
  ContactAction,
  ContactActionFromJSON,
  ContactActionFromJSONTyped,
  ContactActionToJSON,
  SubscribeAction,
  SubscribeActionFromJSON,
  SubscribeActionFromJSONTyped,
  SubscribeActionToJSON,
  UndoCancelAction,
  UndoCancelActionFromJSON,
  UndoCancelActionFromJSONTyped,
  UndoCancelActionToJSON,
} from './'

/**
 * Serializer for plan actions.  Requires customer context.
 * @export
 * @interface PlanActions
 */
export interface PlanActions {
  /**
   *
   * @type {SubscribeAction}
   * @memberof PlanActions
   */
  subscribe: SubscribeAction
  /**
   *
   * @type {ContactAction}
   * @memberof PlanActions
   */
  contact: ContactAction
  /**
   *
   * @type {CancelAction}
   * @memberof PlanActions
   */
  cancel: CancelAction
  /**
   *
   * @type {UndoCancelAction}
   * @memberof PlanActions
   */
  undoCancel: UndoCancelAction
}

export function PlanActionsFromJSON(json: any): PlanActions {
  return PlanActionsFromJSONTyped(json, false)
}

export function PlanActionsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PlanActions {
  if (json === undefined || json === null) {
    return json
  }
  return {
    subscribe: SubscribeActionFromJSON(json['subscribe']),
    contact: ContactActionFromJSON(json['contact']),
    cancel: CancelActionFromJSON(json['cancel']),
    undoCancel: UndoCancelActionFromJSON(json['undo_cancel']),
  }
}

export function PlanActionsToJSON(value?: PlanActions | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    subscribe: SubscribeActionToJSON(value.subscribe),
    contact: ContactActionToJSON(value.contact),
    cancel: CancelActionToJSON(value.cancel),
    undo_cancel: UndoCancelActionToJSON(value.undoCancel),
  }
}
