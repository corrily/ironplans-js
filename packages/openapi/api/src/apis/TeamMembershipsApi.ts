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
  CreateTeammateRequest,
  CreateTeammateRequestFromJSON,
  CreateTeammateRequestToJSON,
  PaginatedTeammateList,
  PaginatedTeammateListFromJSON,
  PaginatedTeammateListToJSON,
  PatchedTeammateRequest,
  PatchedTeammateRequestFromJSON,
  PatchedTeammateRequestToJSON,
  Teammate,
  TeammateFromJSON,
  TeammateToJSON,
  TeammateRequest,
  TeammateRequestFromJSON,
  TeammateRequestToJSON,
} from '../models'

export interface TeamMembershipsV1CreateRequest {
  createTeammateRequest: CreateTeammateRequest
}

export interface TeamMembershipsV1DestroyRequest {
  id: string
}

export interface TeamMembershipsV1ListRequest {
  limit?: number
  offset?: number
}

export interface TeamMembershipsV1PartialUpdateRequest {
  id: string
  patchedTeammateRequest?: PatchedTeammateRequest
}

export interface TeamMembershipsV1RetrieveRequest {
  id: string
}

export interface TeamMembershipsV1UpdateRequest {
  id: string
  teammateRequest: TeammateRequest
}

/**
 *
 */
export class TeamMembershipsApi extends runtime.BaseAPI {
  /**
   * As a Customer, access memberships for all your teams.  As a Provider, full admin access to teams.
   */
  async teamMembershipsV1CreateRaw(
    requestParameters: TeamMembershipsV1CreateRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<Teammate>> {
    if (
      requestParameters.createTeammateRequest === null ||
      requestParameters.createTeammateRequest === undefined
    ) {
      throw new runtime.RequiredError(
        'createTeammateRequest',
        'Required parameter requestParameters.createTeammateRequest was null or undefined when calling teamMembershipsV1Create.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters['Authorization'] = await this.configuration.accessToken(
        'OAuth2',
        []
      )
    }

    const response = await this.request(
      {
        path: `/team_memberships/v1/`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: CreateTeammateRequestToJSON(
          requestParameters.createTeammateRequest
        ),
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      TeammateFromJSON(jsonValue)
    )
  }

  /**
   * As a Customer, access memberships for all your teams.  As a Provider, full admin access to teams.
   */
  async teamMembershipsV1Create(
    requestParameters: TeamMembershipsV1CreateRequest,
    initOverrides?: RequestInit
  ): Promise<Teammate> {
    const response = await this.teamMembershipsV1CreateRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   * As a Customer, access memberships for all your teams.  As a Provider, full admin access to teams.
   */
  async teamMembershipsV1DestroyRaw(
    requestParameters: TeamMembershipsV1DestroyRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling teamMembershipsV1Destroy.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters['Authorization'] = await this.configuration.accessToken(
        'OAuth2',
        []
      )
    }

    const response = await this.request(
      {
        path: `/team_memberships/v1/{id}/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'DELETE',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    )

    return new runtime.VoidApiResponse(response)
  }

  /**
   * As a Customer, access memberships for all your teams.  As a Provider, full admin access to teams.
   */
  async teamMembershipsV1Destroy(
    requestParameters: TeamMembershipsV1DestroyRequest,
    initOverrides?: RequestInit
  ): Promise<void> {
    await this.teamMembershipsV1DestroyRaw(requestParameters, initOverrides)
  }

  /**
   * As a Customer, access memberships for all your teams.  As a Provider, full admin access to teams.
   */
  async teamMembershipsV1ListRaw(
    requestParameters: TeamMembershipsV1ListRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<PaginatedTeammateList>> {
    const queryParameters: any = {}

    if (requestParameters.limit !== undefined) {
      queryParameters['limit'] = requestParameters.limit
    }

    if (requestParameters.offset !== undefined) {
      queryParameters['offset'] = requestParameters.offset
    }

    const headerParameters: runtime.HTTPHeaders = {}

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters['Authorization'] = await this.configuration.accessToken(
        'OAuth2',
        []
      )
    }

    const response = await this.request(
      {
        path: `/team_memberships/v1/`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      PaginatedTeammateListFromJSON(jsonValue)
    )
  }

  /**
   * As a Customer, access memberships for all your teams.  As a Provider, full admin access to teams.
   */
  async teamMembershipsV1List(
    requestParameters: TeamMembershipsV1ListRequest,
    initOverrides?: RequestInit
  ): Promise<PaginatedTeammateList> {
    const response = await this.teamMembershipsV1ListRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   * As a Customer, access memberships for all your teams.  As a Provider, full admin access to teams.
   */
  async teamMembershipsV1PartialUpdateRaw(
    requestParameters: TeamMembershipsV1PartialUpdateRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<Teammate>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling teamMembershipsV1PartialUpdate.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters['Authorization'] = await this.configuration.accessToken(
        'OAuth2',
        []
      )
    }

    const response = await this.request(
      {
        path: `/team_memberships/v1/{id}/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PATCH',
        headers: headerParameters,
        query: queryParameters,
        body: PatchedTeammateRequestToJSON(
          requestParameters.patchedTeammateRequest
        ),
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      TeammateFromJSON(jsonValue)
    )
  }

  /**
   * As a Customer, access memberships for all your teams.  As a Provider, full admin access to teams.
   */
  async teamMembershipsV1PartialUpdate(
    requestParameters: TeamMembershipsV1PartialUpdateRequest,
    initOverrides?: RequestInit
  ): Promise<Teammate> {
    const response = await this.teamMembershipsV1PartialUpdateRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   * As a Customer, access memberships for all your teams.  As a Provider, full admin access to teams.
   */
  async teamMembershipsV1RetrieveRaw(
    requestParameters: TeamMembershipsV1RetrieveRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<Teammate>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling teamMembershipsV1Retrieve.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters['Authorization'] = await this.configuration.accessToken(
        'OAuth2',
        []
      )
    }

    const response = await this.request(
      {
        path: `/team_memberships/v1/{id}/`.replace(
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
      TeammateFromJSON(jsonValue)
    )
  }

  /**
   * As a Customer, access memberships for all your teams.  As a Provider, full admin access to teams.
   */
  async teamMembershipsV1Retrieve(
    requestParameters: TeamMembershipsV1RetrieveRequest,
    initOverrides?: RequestInit
  ): Promise<Teammate> {
    const response = await this.teamMembershipsV1RetrieveRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   * As a Customer, access memberships for all your teams.  As a Provider, full admin access to teams.
   */
  async teamMembershipsV1UpdateRaw(
    requestParameters: TeamMembershipsV1UpdateRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<Teammate>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling teamMembershipsV1Update.'
      )
    }

    if (
      requestParameters.teammateRequest === null ||
      requestParameters.teammateRequest === undefined
    ) {
      throw new runtime.RequiredError(
        'teammateRequest',
        'Required parameter requestParameters.teammateRequest was null or undefined when calling teamMembershipsV1Update.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters['Authorization'] = await this.configuration.accessToken(
        'OAuth2',
        []
      )
    }

    const response = await this.request(
      {
        path: `/team_memberships/v1/{id}/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PUT',
        headers: headerParameters,
        query: queryParameters,
        body: TeammateRequestToJSON(requestParameters.teammateRequest),
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      TeammateFromJSON(jsonValue)
    )
  }

  /**
   * As a Customer, access memberships for all your teams.  As a Provider, full admin access to teams.
   */
  async teamMembershipsV1Update(
    requestParameters: TeamMembershipsV1UpdateRequest,
    initOverrides?: RequestInit
  ): Promise<Teammate> {
    const response = await this.teamMembershipsV1UpdateRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }
}
