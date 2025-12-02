import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import type { ApiResponse } from '@/types'

import type {
  AuthUser,
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponse,
  ResetPasswordPayload,
} from './types'

const AUTH_BASE_PATH = '/admin'

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const response = (await apiClient.post<LoginResponse>(
      `${AUTH_BASE_PATH}/login`,
      payload,
    )) as unknown as LoginResponse

    // For auth responses, we need the full response with token/refreshToken
    // Don't use extractData as it only returns the data field
    if (!response.success) {
      throw new Error(response.message || API_ERRORS.LOGIN_FAILED)
    }

    if (!response.data || !response.token) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }

    return response
  } catch (_error) {
    throw new Error(API_ERRORS.LOGIN_FAILED)
  }
}

export async function logout(): Promise<void> {
  try {
    await apiClient.post<ApiResponse<null>>(`${AUTH_BASE_PATH}/logout`)
  } catch (_error) {
    throw new Error(API_ERRORS.LOGOUT_FAILED)
  }
}

export async function getCurrentAdmin(): Promise<AuthUser> {
  try {
    const response = (await apiClient.get<ApiResponse<AuthUser>>(
      `${AUTH_BASE_PATH}/me`,
    )) as unknown as ApiResponse<AuthUser>

    return extractData(response)
  } catch (_error) {
    throw new Error(API_ERRORS.TOKEN_VALIDATION_FAILED)
  }
}

export async function forgotPassword(
  payload: ForgotPasswordPayload,
): Promise<void> {
  try {
    await apiClient.post<ApiResponse<null>>(
      `${AUTH_BASE_PATH}/forgot-password`,
      payload,
    )
  } catch (_error) {
    throw new Error(API_ERRORS.VALIDATION_ERROR)
  }
}

export async function resetPassword(
  payload: ResetPasswordPayload,
): Promise<void> {
  try {
    await apiClient.post<ApiResponse<null>>(
      `${AUTH_BASE_PATH}/reset-password`,
      payload,
    )
  } catch (_error) {
    throw new Error(API_ERRORS.VALIDATION_ERROR)
  }
}


