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
  PaginatedInvoiceList,
  PaginatedInvoiceListFromJSON,
  PaginatedInvoiceListToJSON,
  PaginatedTeamList,
  PaginatedTeamListFromJSON,
  PaginatedTeamListToJSON,
  PatchedTeamDetailRequest,
  PatchedTeamDetailRequestFromJSON,
  PatchedTeamDetailRequestToJSON,
  TeamDetail,
  TeamDetailFromJSON,
  TeamDetailToJSON,
  TeamDetailRequest,
  TeamDetailRequestFromJSON,
  TeamDetailRequestToJSON,
} from '../models'

export interface TeamsV1CreateRequest {
  teamDetailRequest: TeamDetailRequest
}

export interface TeamsV1DestroyRequest {
  id: string
}

export interface TeamsV1InvoicesListRequest {
  id: string
  key?: string
  limit?: number
  offset?: number
  value?: string
}

export interface TeamsV1ListRequest {
  key?: string
  limit?: number
  offset?: number
  value?: string
}

export interface TeamsV1MetadataCreateRequest {
  id: string
  requestBody?: { [key: string]: string }
}

export interface TeamsV1MetadataPartialUpdateRequest {
  id: string
  requestBody?: { [key: string]: string }
}

export interface TeamsV1MetadataRetrieveRequest {
  id: string
  key?: string
  value?: string
}

export interface TeamsV1PartialUpdateRequest {
  id: string
  patchedTeamDetailRequest?: PatchedTeamDetailRequest
}

export interface TeamsV1RetrieveRequest {
  id: string
}

export interface TeamsV1UpdateRequest {
  id: string
  teamDetailRequest: TeamDetailRequest
}

/**
 *
 */
export class TeamsApi extends runtime.BaseAPI {
  /**
   */
  async teamsV1CreateRaw(
    requestParameters: TeamsV1CreateRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<TeamDetail>> {
    if (
      requestParameters.teamDetailRequest === null ||
      requestParameters.teamDetailRequest === undefined
    ) {
      throw new runtime.RequiredError(
        'teamDetailRequest',
        'Required parameter requestParameters.teamDetailRequest was null or undefined when calling teamsV1Create.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('auth0-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('customer-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('private-provider-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    const response = await this.request(
      {
        path: `/teams/v1/`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: TeamDetailRequestToJSON(requestParameters.teamDetailRequest),
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      TeamDetailFromJSON(jsonValue)
    )
  }

  /**
   */
  async teamsV1Create(
    requestParameters: TeamsV1CreateRequest,
    initOverrides?: RequestInit
  ): Promise<TeamDetail> {
    const response = await this.teamsV1CreateRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   */
  async teamsV1DestroyRaw(
    requestParameters: TeamsV1DestroyRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling teamsV1Destroy.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('auth0-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('customer-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('private-provider-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    const response = await this.request(
      {
        path: `/teams/v1/{id}/`.replace(
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
   */
  async teamsV1Destroy(
    requestParameters: TeamsV1DestroyRequest,
    initOverrides?: RequestInit
  ): Promise<void> {
    await this.teamsV1DestroyRaw(requestParameters, initOverrides)
  }

  /**
   */
  async teamsV1InvoicesListRaw(
    requestParameters: TeamsV1InvoicesListRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<PaginatedInvoiceList>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling teamsV1InvoicesList.'
      )
    }

    const queryParameters: any = {}

    if (requestParameters.key !== undefined) {
      queryParameters['key'] = requestParameters.key
    }

    if (requestParameters.limit !== undefined) {
      queryParameters['limit'] = requestParameters.limit
    }

    if (requestParameters.offset !== undefined) {
      queryParameters['offset'] = requestParameters.offset
    }

    if (requestParameters.value !== undefined) {
      queryParameters['value'] = requestParameters.value
    }

    const headerParameters: runtime.HTTPHeaders = {}

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('auth0-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('customer-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('private-provider-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    const response = await this.request(
      {
        path: `/teams/v1/{id}/invoices/`.replace(
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
      PaginatedInvoiceListFromJSON(jsonValue)
    )
  }

  /**
   */
  async teamsV1InvoicesList(
    requestParameters: TeamsV1InvoicesListRequest,
    initOverrides?: RequestInit
  ): Promise<PaginatedInvoiceList> {
    const response = await this.teamsV1InvoicesListRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   * Teams can be filtered by metadata using query parameters.  Teams match if they have all of the key value pairs specified.
   */
  async teamsV1ListRaw(
    requestParameters: TeamsV1ListRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<PaginatedTeamList>> {
    const queryParameters: any = {}

    if (requestParameters.key !== undefined) {
      queryParameters['key'] = requestParameters.key
    }

    if (requestParameters.limit !== undefined) {
      queryParameters['limit'] = requestParameters.limit
    }

    if (requestParameters.offset !== undefined) {
      queryParameters['offset'] = requestParameters.offset
    }

    if (requestParameters.value !== undefined) {
      queryParameters['value'] = requestParameters.value
    }

    const headerParameters: runtime.HTTPHeaders = {}

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('auth0-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('customer-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('private-provider-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    const response = await this.request(
      {
        path: `/teams/v1/`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      PaginatedTeamListFromJSON(jsonValue)
    )
  }

  /**
   * Teams can be filtered by metadata using query parameters.  Teams match if they have all of the key value pairs specified.
   */
  async teamsV1List(
    requestParameters: TeamsV1ListRequest,
    initOverrides?: RequestInit
  ): Promise<PaginatedTeamList> {
    const response = await this.teamsV1ListRaw(requestParameters, initOverrides)
    return await response.value()
  }

  /**
   */
  async teamsV1MetadataCreateRaw(
    requestParameters: TeamsV1MetadataCreateRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<{ [key: string]: string }>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling teamsV1MetadataCreate.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('auth0-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('customer-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('private-provider-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    const response = await this.request(
      {
        path: `/teams/v1/{id}/metadata/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: requestParameters.requestBody,
      },
      initOverrides
    )

    return new runtime.JSONApiResponse<any>(response)
  }

  /**
   */
  async teamsV1MetadataCreate(
    requestParameters: TeamsV1MetadataCreateRequest,
    initOverrides?: RequestInit
  ): Promise<{ [key: string]: string }> {
    const response = await this.teamsV1MetadataCreateRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   */
  async teamsV1MetadataPartialUpdateRaw(
    requestParameters: TeamsV1MetadataPartialUpdateRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<{ [key: string]: string }>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling teamsV1MetadataPartialUpdate.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('auth0-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('customer-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('private-provider-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    const response = await this.request(
      {
        path: `/teams/v1/{id}/metadata/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PATCH',
        headers: headerParameters,
        query: queryParameters,
        body: requestParameters.requestBody,
      },
      initOverrides
    )

    return new runtime.JSONApiResponse<any>(response)
  }

  /**
   */
  async teamsV1MetadataPartialUpdate(
    requestParameters: TeamsV1MetadataPartialUpdateRequest,
    initOverrides?: RequestInit
  ): Promise<{ [key: string]: string }> {
    const response = await this.teamsV1MetadataPartialUpdateRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   */
  async teamsV1MetadataRetrieveRaw(
    requestParameters: TeamsV1MetadataRetrieveRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<{ [key: string]: string }>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling teamsV1MetadataRetrieve.'
      )
    }

    const queryParameters: any = {}

    if (requestParameters.key !== undefined) {
      queryParameters['key'] = requestParameters.key
    }

    if (requestParameters.value !== undefined) {
      queryParameters['value'] = requestParameters.value
    }

    const headerParameters: runtime.HTTPHeaders = {}

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('auth0-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('customer-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('private-provider-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    const response = await this.request(
      {
        path: `/teams/v1/{id}/metadata/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    )

    return new runtime.JSONApiResponse<any>(response)
  }

  /**
   */
  async teamsV1MetadataRetrieve(
    requestParameters: TeamsV1MetadataRetrieveRequest,
    initOverrides?: RequestInit
  ): Promise<{ [key: string]: string }> {
    const response = await this.teamsV1MetadataRetrieveRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   */
  async teamsV1PartialUpdateRaw(
    requestParameters: TeamsV1PartialUpdateRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<TeamDetail>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling teamsV1PartialUpdate.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('auth0-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('customer-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('private-provider-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    const response = await this.request(
      {
        path: `/teams/v1/{id}/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PATCH',
        headers: headerParameters,
        query: queryParameters,
        body: PatchedTeamDetailRequestToJSON(
          requestParameters.patchedTeamDetailRequest
        ),
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      TeamDetailFromJSON(jsonValue)
    )
  }

  /**
   */
  async teamsV1PartialUpdate(
    requestParameters: TeamsV1PartialUpdateRequest,
    initOverrides?: RequestInit
  ): Promise<TeamDetail> {
    const response = await this.teamsV1PartialUpdateRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   */
  async teamsV1RetrieveRaw(
    requestParameters: TeamsV1RetrieveRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<TeamDetail>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling teamsV1Retrieve.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('auth0-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('customer-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('private-provider-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    const response = await this.request(
      {
        path: `/teams/v1/{id}/`.replace(
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
      TeamDetailFromJSON(jsonValue)
    )
  }

  /**
   */
  async teamsV1Retrieve(
    requestParameters: TeamsV1RetrieveRequest,
    initOverrides?: RequestInit
  ): Promise<TeamDetail> {
    const response = await this.teamsV1RetrieveRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   */
  async teamsV1UpdateRaw(
    requestParameters: TeamsV1UpdateRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<TeamDetail>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling teamsV1Update.'
      )
    }

    if (
      requestParameters.teamDetailRequest === null ||
      requestParameters.teamDetailRequest === undefined
    ) {
      throw new runtime.RequiredError(
        'teamDetailRequest',
        'Required parameter requestParameters.teamDetailRequest was null or undefined when calling teamsV1Update.'
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('auth0-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('customer-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken
      const tokenString = await token('private-provider-token', [])

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`
      }
    }
    const response = await this.request(
      {
        path: `/teams/v1/{id}/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PUT',
        headers: headerParameters,
        query: queryParameters,
        body: TeamDetailRequestToJSON(requestParameters.teamDetailRequest),
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      TeamDetailFromJSON(jsonValue)
    )
  }

  /**
   */
  async teamsV1Update(
    requestParameters: TeamsV1UpdateRequest,
    initOverrides?: RequestInit
  ): Promise<TeamDetail> {
    const response = await this.teamsV1UpdateRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }
}
