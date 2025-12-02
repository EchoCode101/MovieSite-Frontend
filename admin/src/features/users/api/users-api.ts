import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type {
  AdminUserDetail,
  CreateUserPayload,
  UpdateUserPayload,
  UpdateUserSubscriptionPayload,
  UserListParams,
  UserListResponse,
} from '../types'

const USERS_BASE_PATH = '/users'
const ADMIN_BASE_PATH = '/admin'

/**
 * Get paginated list of users (admin)
 */
export async function getUsers(
  params: UserListParams,
): Promise<UserListResponse> {
  try {
    const response = (await apiClient.get<ApiResponse<UserListResponse>>(
      `${USERS_BASE_PATH}/paginated`,
      { params },
    )) as unknown as ApiResponse<UserListResponse>

    return extractData(response)
  } catch (error) {
    logger.error('getUsers failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('users'))
  }
}

/**
 * Get user by ID
 */
export async function getUserById(id: string): Promise<AdminUserDetail> {
  try {
    const response = (await apiClient.get<ApiResponse<AdminUserDetail>>(
      `${USERS_BASE_PATH}/${id}`,
    )) as unknown as ApiResponse<AdminUserDetail>

    return extractData(response)
  } catch (error) {
    logger.error('getUserById failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('user'))
  }
}

/**
 * Create a new user (admin)
 */
export async function createUser(
  payload: CreateUserPayload,
): Promise<AdminUserDetail> {
  try {
    const response = (await apiClient.post<ApiResponse<AdminUserDetail>>(
      USERS_BASE_PATH,
      payload,
    )) as unknown as ApiResponse<AdminUserDetail>

    return extractData(response)
  } catch (error) {
    logger.error('createUser failed', error)
    throw new Error(API_ERRORS.CREATE_FAILED('user'))
  }
}

/**
 * Update an existing user
 */
export async function updateUser(
  id: string,
  payload: UpdateUserPayload,
): Promise<AdminUserDetail> {
  try {
    const response = (await apiClient.put<ApiResponse<AdminUserDetail>>(
      `${USERS_BASE_PATH}/${id}`,
      payload,
    )) as unknown as ApiResponse<AdminUserDetail>

    return extractData(response)
  } catch (error) {
    logger.error('updateUser failed', error)
    throw new Error(API_ERRORS.UPDATE_FAILED('user'))
  }
}

/**
 * Delete a user (admin)
 */
export async function deleteUser(id: string): Promise<void> {
  try {
    await apiClient.delete<ApiResponse<null>>(`${USERS_BASE_PATH}/${id}`)
  } catch (error) {
    logger.error('deleteUser failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('user'))
  }
}

/**
 * Update user subscription plan (admin)
 */
export async function updateUserSubscription(
  payload: UpdateUserSubscriptionPayload,
): Promise<void> {
  try {
    await apiClient.put<ApiResponse<unknown>>(
      `${ADMIN_BASE_PATH}/subscription`,
      payload,
    )
  } catch (error) {
    logger.error('updateUserSubscription failed', error)
    throw new Error(API_ERRORS.UPDATE_FAILED('user subscription'))
  }
}

