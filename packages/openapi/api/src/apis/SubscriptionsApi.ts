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

import * as runtime from '../runtime'
import {
  PaginatedSubscriptionList,
  PaginatedSubscriptionListFromJSON,
  PaginatedSubscriptionListToJSON,
  PatchedPlanSwitchRequest,
  PatchedPlanSwitchRequestFromJSON,
  PatchedPlanSwitchRequestToJSON,
  PatchedSubscriptionRequest,
  PatchedSubscriptionRequestFromJSON,
  PatchedSubscriptionRequestToJSON,
  ReportUsageRequest,
  ReportUsageRequestFromJSON,
  ReportUsageRequestToJSON,
  Subscription,
  SubscriptionFromJSON,
  SubscriptionToJSON,
  SubscriptionDetail,
  SubscriptionDetailFromJSON,
  SubscriptionDetailToJSON,
  SubscriptionRequest,
  SubscriptionRequestFromJSON,
  SubscriptionRequestToJSON,
  Usage,
  UsageFromJSON,
  UsageToJSON,
  UsageExceeded,
  UsageExceededFromJSON,
  UsageExceededToJSON,
} from '../models'

export interface SubscriptionsV1CreateRequest {
  subscriptionRequest: SubscriptionRequest
}

export interface SubscriptionsV1DestroyRequest {
  id: string
}

export interface SubscriptionsV1ListRequest {
  limit?: number
  offset?: number
  planId?: string
}

export interface SubscriptionsV1PartialUpdateRequest {
  id: string
  patchedSubscriptionRequest?: PatchedSubscriptionRequest
}

export interface SubscriptionsV1RenewPartialUpdateRequest {
  id: string
  patchedSubscriptionRequest?: PatchedSubscriptionRequest
}

export interface SubscriptionsV1ReportCreateRequest {
  id: string
  reportUsageRequest: ReportUsageRequest
}

export interface SubscriptionsV1RetrieveRequest {
  id: string
}

export interface SubscriptionsV1SwitchPartialUpdateRequest {
  id: string
  patchedPlanSwitchRequest?: PatchedPlanSwitchRequest
}

export interface SubscriptionsV1UpdateRequest {
  id: string
  subscriptionRequest: SubscriptionRequest
}

export interface SubscriptionsV1UsageExceededRetrieveRequest {
  id: string
}

export interface SubscriptionsV1UsageListRequest {
  id: string
  planId?: string
}

/**
 *
 */
export class SubscriptionsApi extends runtime.BaseAPI {
  /**
   */
  async subscriptionsV1CreateRaw(
    requestParameters: SubscriptionsV1CreateRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<Subscription>> {
    if (
      requestParameters.subscriptionRequest === null ||
      requestParameters.subscriptionRequest === undefined
    ) {
      throw new runtime.RequiredError(
        'subscriptionRequest',
        'Required parameter requestParameters.subscriptionRequest was null or undefined when calling subscriptionsV1Create.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters['Authorization'] = await this.configuration.accessToken(
        'oauth2-deprecated',
        []
      )
    }

    const response = await this.request(
      {
        path: `/subscriptions/v1/`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: SubscriptionRequestToJSON(requestParameters.subscriptionRequest),
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      SubscriptionFromJSON(jsonValue)
    )
  }

  /**
   */
  async subscriptionsV1Create(
    requestParameters: SubscriptionsV1CreateRequest,
    initOverrides?: RequestInit
  ): Promise<Subscription> {
    const response = await this.subscriptionsV1CreateRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   */
  async subscriptionsV1DestroyRaw(
    requestParameters: SubscriptionsV1DestroyRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<SubscriptionDetail>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling subscriptionsV1Destroy.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters['Authorization'] = await this.configuration.accessToken(
        'oauth2-deprecated',
        []
      )
    }

    const response = await this.request(
      {
        path: `/subscriptions/v1/{id}/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'DELETE',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      SubscriptionDetailFromJSON(jsonValue)
    )
  }

  /**
   */
  async subscriptionsV1Destroy(
    requestParameters: SubscriptionsV1DestroyRequest,
    initOverrides?: RequestInit
  ): Promise<SubscriptionDetail> {
    const response = await this.subscriptionsV1DestroyRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   */
  async subscriptionsV1ListRaw(
    requestParameters: SubscriptionsV1ListRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<PaginatedSubscriptionList>> {
    const queryParameters: any = {}

    if (requestParameters.limit !== undefined) {
      queryParameters['limit'] = requestParameters.limit
    }

    if (requestParameters.offset !== undefined) {
      queryParameters['offset'] = requestParameters.offset
    }

    if (requestParameters.planId !== undefined) {
      queryParameters['plan_id'] = requestParameters.planId
    }

    const headerParameters: runtime.HTTPHeaders = {}

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters['Authorization'] = await this.configuration.accessToken(
        'oauth2-deprecated',
        []
      )
    }

    const response = await this.request(
      {
        path: `/subscriptions/v1/`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      PaginatedSubscriptionListFromJSON(jsonValue)
    )
  }

  /**
   */
  async subscriptionsV1List(
    requestParameters: SubscriptionsV1ListRequest,
    initOverrides?: RequestInit
  ): Promise<PaginatedSubscriptionList> {
    const response = await this.subscriptionsV1ListRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   */
  async subscriptionsV1PartialUpdateRaw(
    requestParameters: SubscriptionsV1PartialUpdateRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<SubscriptionDetail>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling subscriptionsV1PartialUpdate.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters['Authorization'] = await this.configuration.accessToken(
        'oauth2-deprecated',
        []
      )
    }

    const response = await this.request(
      {
        path: `/subscriptions/v1/{id}/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PATCH',
        headers: headerParameters,
        query: queryParameters,
        body: PatchedSubscriptionRequestToJSON(
          requestParameters.patchedSubscriptionRequest
        ),
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      SubscriptionDetailFromJSON(jsonValue)
    )
  }

  /**
   */
  async subscriptionsV1PartialUpdate(
    requestParameters: SubscriptionsV1PartialUpdateRequest,
    initOverrides?: RequestInit
  ): Promise<SubscriptionDetail> {
    const response = await this.subscriptionsV1PartialUpdateRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   */
  async subscriptionsV1RenewPartialUpdateRaw(
    requestParameters: SubscriptionsV1RenewPartialUpdateRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<SubscriptionDetail>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling subscriptionsV1RenewPartialUpdate.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters['Authorization'] = await this.configuration.accessToken(
        'oauth2-deprecated',
        []
      )
    }

    const response = await this.request(
      {
        path: `/subscriptions/v1/{id}/renew/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PATCH',
        headers: headerParameters,
        query: queryParameters,
        body: PatchedSubscriptionRequestToJSON(
          requestParameters.patchedSubscriptionRequest
        ),
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      SubscriptionDetailFromJSON(jsonValue)
    )
  }

  /**
   */
  async subscriptionsV1RenewPartialUpdate(
    requestParameters: SubscriptionsV1RenewPartialUpdateRequest,
    initOverrides?: RequestInit
  ): Promise<SubscriptionDetail> {
    const response = await this.subscriptionsV1RenewPartialUpdateRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   */
  async subscriptionsV1ReportCreateRaw(
    requestParameters: SubscriptionsV1ReportCreateRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<Usage>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling subscriptionsV1ReportCreate.'
      )
    }

    if (
      requestParameters.reportUsageRequest === null ||
      requestParameters.reportUsageRequest === undefined
    ) {
      throw new runtime.RequiredError(
        'reportUsageRequest',
        'Required parameter requestParameters.reportUsageRequest was null or undefined when calling subscriptionsV1ReportCreate.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters['Authorization'] = await this.configuration.accessToken(
        'oauth2-deprecated',
        []
      )
    }

    const response = await this.request(
      {
        path: `/subscriptions/v1/{id}/report/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: ReportUsageRequestToJSON(requestParameters.reportUsageRequest),
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      UsageFromJSON(jsonValue)
    )
  }

  /**
   */
  async subscriptionsV1ReportCreate(
    requestParameters: SubscriptionsV1ReportCreateRequest,
    initOverrides?: RequestInit
  ): Promise<Usage> {
    const response = await this.subscriptionsV1ReportCreateRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   * Detailed subscription data.
   */
  async subscriptionsV1RetrieveRaw(
    requestParameters: SubscriptionsV1RetrieveRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<SubscriptionDetail>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling subscriptionsV1Retrieve.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters['Authorization'] = await this.configuration.accessToken(
        'oauth2-deprecated',
        []
      )
    }

    const response = await this.request(
      {
        path: `/subscriptions/v1/{id}/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      SubscriptionDetailFromJSON(jsonValue)
    )
  }

  /**
   * Detailed subscription data.
   */
  async subscriptionsV1Retrieve(
    requestParameters: SubscriptionsV1RetrieveRequest,
    initOverrides?: RequestInit
  ): Promise<SubscriptionDetail> {
    const response = await this.subscriptionsV1RetrieveRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   */
  async subscriptionsV1SwitchPartialUpdateRaw(
    requestParameters: SubscriptionsV1SwitchPartialUpdateRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<SubscriptionDetail>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling subscriptionsV1SwitchPartialUpdate.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters['Authorization'] = await this.configuration.accessToken(
        'oauth2-deprecated',
        []
      )
    }

    const response = await this.request(
      {
        path: `/subscriptions/v1/{id}/switch/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PATCH',
        headers: headerParameters,
        query: queryParameters,
        body: PatchedPlanSwitchRequestToJSON(
          requestParameters.patchedPlanSwitchRequest
        ),
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      SubscriptionDetailFromJSON(jsonValue)
    )
  }

  /**
   */
  async subscriptionsV1SwitchPartialUpdate(
    requestParameters: SubscriptionsV1SwitchPartialUpdateRequest,
    initOverrides?: RequestInit
  ): Promise<SubscriptionDetail> {
    const response = await this.subscriptionsV1SwitchPartialUpdateRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   */
  async subscriptionsV1UpdateRaw(
    requestParameters: SubscriptionsV1UpdateRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<SubscriptionDetail>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling subscriptionsV1Update.'
      )
    }

    if (
      requestParameters.subscriptionRequest === null ||
      requestParameters.subscriptionRequest === undefined
    ) {
      throw new runtime.RequiredError(
        'subscriptionRequest',
        'Required parameter requestParameters.subscriptionRequest was null or undefined when calling subscriptionsV1Update.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters['Authorization'] = await this.configuration.accessToken(
        'oauth2-deprecated',
        []
      )
    }

    const response = await this.request(
      {
        path: `/subscriptions/v1/{id}/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PUT',
        headers: headerParameters,
        query: queryParameters,
        body: SubscriptionRequestToJSON(requestParameters.subscriptionRequest),
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      SubscriptionDetailFromJSON(jsonValue)
    )
  }

  /**
   */
  async subscriptionsV1Update(
    requestParameters: SubscriptionsV1UpdateRequest,
    initOverrides?: RequestInit
  ): Promise<SubscriptionDetail> {
    const response = await this.subscriptionsV1UpdateRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   * Convenience endpoint so providers don\'t need to loop through usages.
   */
  async subscriptionsV1UsageExceededRetrieveRaw(
    requestParameters: SubscriptionsV1UsageExceededRetrieveRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<UsageExceeded>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling subscriptionsV1UsageExceededRetrieve.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters['Authorization'] = await this.configuration.accessToken(
        'oauth2-deprecated',
        []
      )
    }

    const response = await this.request(
      {
        path: `/subscriptions/v1/{id}/usage_exceeded/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      UsageExceededFromJSON(jsonValue)
    )
  }

  /**
   * Convenience endpoint so providers don\'t need to loop through usages.
   */
  async subscriptionsV1UsageExceededRetrieve(
    requestParameters: SubscriptionsV1UsageExceededRetrieveRequest,
    initOverrides?: RequestInit
  ): Promise<UsageExceeded> {
    const response = await this.subscriptionsV1UsageExceededRetrieveRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   */
  async subscriptionsV1UsageListRaw(
    requestParameters: SubscriptionsV1UsageListRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<Array<Usage>>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling subscriptionsV1UsageList.'
      )
    }

    const queryParameters: any = {}

    if (requestParameters.planId !== undefined) {
      queryParameters['plan_id'] = requestParameters.planId
    }

    const headerParameters: runtime.HTTPHeaders = {}

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters['Authorization'] = await this.configuration.accessToken(
        'oauth2-deprecated',
        []
      )
    }

    const response = await this.request(
      {
        path: `/subscriptions/v1/{id}/usage/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(UsageFromJSON)
    )
  }

  /**
   */
  async subscriptionsV1UsageList(
    requestParameters: SubscriptionsV1UsageListRequest,
    initOverrides?: RequestInit
  ): Promise<Array<Usage>> {
    const response = await this.subscriptionsV1UsageListRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }
}
