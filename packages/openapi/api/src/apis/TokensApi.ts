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
  PaginatedTokenList,
  PaginatedTokenListFromJSON,
  PaginatedTokenListToJSON,
  PatchedTokenRequest,
  PatchedTokenRequestFromJSON,
  PatchedTokenRequestToJSON,
  Token,
  TokenFromJSON,
  TokenToJSON,
  TokenRequest,
  TokenRequestFromJSON,
  TokenRequestToJSON,
} from '../models'

export interface TokensV1CreateRequest {
  tokenRequest?: TokenRequest
}

export interface TokensV1DestroyRequest {
  id: string
}

export interface TokensV1ListRequest {
  isActive?: boolean
  isPublic?: boolean
  limit?: number
  offset?: number
}

export interface TokensV1PartialUpdateRequest {
  id: string
  patchedTokenRequest?: PatchedTokenRequest
}

export interface TokensV1RetrieveRequest {
  id: string
}

export interface TokensV1UpdateRequest {
  id: string
  tokenRequest?: TokenRequest
}

/**
 *
 */
export class TokensApi extends runtime.BaseAPI {
  /**
   * Management of Provider Tokens.
   */
  async tokensV1CreateRaw(
    requestParameters: TokensV1CreateRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<Token>> {
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
        path: `/tokens/v1/`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: TokenRequestToJSON(requestParameters.tokenRequest),
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      TokenFromJSON(jsonValue)
    )
  }

  /**
   * Management of Provider Tokens.
   */
  async tokensV1Create(
    requestParameters: TokensV1CreateRequest,
    initOverrides?: RequestInit
  ): Promise<Token> {
    const response = await this.tokensV1CreateRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   * Management of Provider Tokens.
   */
  async tokensV1DestroyRaw(
    requestParameters: TokensV1DestroyRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling tokensV1Destroy.'
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
        path: `/tokens/v1/{id}/`.replace(
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
   * Management of Provider Tokens.
   */
  async tokensV1Destroy(
    requestParameters: TokensV1DestroyRequest,
    initOverrides?: RequestInit
  ): Promise<void> {
    await this.tokensV1DestroyRaw(requestParameters, initOverrides)
  }

  /**
   * Management of Provider Tokens.
   */
  async tokensV1ListRaw(
    requestParameters: TokensV1ListRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<PaginatedTokenList>> {
    const queryParameters: any = {}

    if (requestParameters.isActive !== undefined) {
      queryParameters['is_active'] = requestParameters.isActive
    }

    if (requestParameters.isPublic !== undefined) {
      queryParameters['is_public'] = requestParameters.isPublic
    }

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
        path: `/tokens/v1/`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      PaginatedTokenListFromJSON(jsonValue)
    )
  }

  /**
   * Management of Provider Tokens.
   */
  async tokensV1List(
    requestParameters: TokensV1ListRequest,
    initOverrides?: RequestInit
  ): Promise<PaginatedTokenList> {
    const response = await this.tokensV1ListRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   * Management of Provider Tokens.
   */
  async tokensV1PartialUpdateRaw(
    requestParameters: TokensV1PartialUpdateRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<Token>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling tokensV1PartialUpdate.'
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
        path: `/tokens/v1/{id}/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PATCH',
        headers: headerParameters,
        query: queryParameters,
        body: PatchedTokenRequestToJSON(requestParameters.patchedTokenRequest),
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      TokenFromJSON(jsonValue)
    )
  }

  /**
   * Management of Provider Tokens.
   */
  async tokensV1PartialUpdate(
    requestParameters: TokensV1PartialUpdateRequest,
    initOverrides?: RequestInit
  ): Promise<Token> {
    const response = await this.tokensV1PartialUpdateRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   * Management of Provider Tokens.
   */
  async tokensV1RetrieveRaw(
    requestParameters: TokensV1RetrieveRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<Token>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling tokensV1Retrieve.'
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
        path: `/tokens/v1/{id}/`.replace(
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
      TokenFromJSON(jsonValue)
    )
  }

  /**
   * Management of Provider Tokens.
   */
  async tokensV1Retrieve(
    requestParameters: TokensV1RetrieveRequest,
    initOverrides?: RequestInit
  ): Promise<Token> {
    const response = await this.tokensV1RetrieveRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }

  /**
   * Management of Provider Tokens.
   */
  async tokensV1UpdateRaw(
    requestParameters: TokensV1UpdateRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<Token>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling tokensV1Update.'
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
        path: `/tokens/v1/{id}/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PUT',
        headers: headerParameters,
        query: queryParameters,
        body: TokenRequestToJSON(requestParameters.tokenRequest),
      },
      initOverrides
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      TokenFromJSON(jsonValue)
    )
  }

  /**
   * Management of Provider Tokens.
   */
  async tokensV1Update(
    requestParameters: TokensV1UpdateRequest,
    initOverrides?: RequestInit
  ): Promise<Token> {
    const response = await this.tokensV1UpdateRaw(
      requestParameters,
      initOverrides
    )
    return await response.value()
  }
}
