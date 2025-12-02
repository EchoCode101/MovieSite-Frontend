import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type {
  CastCrew,
  CastCrewListParams,
  CreateCastCrewPayload,
  UpdateCastCrewPayload,
} from '../types'

const CAST_CREW_BASE_PATH = '/cast-crew'

/**
 * Get all cast/crew with optional filters
 */
export async function getCastCrew(
  params?: CastCrewListParams,
): Promise<CastCrew[]> {
  try {
    const response = (await apiClient.get<ApiResponse<CastCrew[]>>(
      CAST_CREW_BASE_PATH,
      { params },
    )) as unknown as ApiResponse<CastCrew[]>

    return extractData(response)
  } catch (error) {
    logger.error('getCastCrew failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('cast/crew'))
  }
}

/**
 * Get cast/crew member by ID
 */
export async function getCastCrewById(id: string): Promise<CastCrew> {
  try {
    const response = (await apiClient.get<ApiResponse<CastCrew>>(
      `${CAST_CREW_BASE_PATH}/${id}`,
    )) as unknown as ApiResponse<CastCrew>

    return extractData(response)
  } catch (error) {
    logger.error('getCastCrewById failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('cast/crew member'))
  }
}

/**
 * Create a new cast/crew member
 */
export async function createCastCrew(
  payload: CreateCastCrewPayload,
): Promise<CastCrew> {
  try {
    const response = (await apiClient.post<ApiResponse<CastCrew>>(
      CAST_CREW_BASE_PATH,
      payload,
    )) as unknown as ApiResponse<CastCrew>

    return extractData(response)
  } catch (error) {
    logger.error('createCastCrew failed', error)
    throw new Error(API_ERRORS.CREATE_FAILED('cast/crew member'))
  }
}

/**
 * Update an existing cast/crew member
 */
export async function updateCastCrew(
  id: string,
  payload: UpdateCastCrewPayload,
): Promise<CastCrew> {
  try {
    const response = (await apiClient.put<ApiResponse<CastCrew>>(
      `${CAST_CREW_BASE_PATH}/${id}`,
      payload,
    )) as unknown as ApiResponse<CastCrew>

    return extractData(response)
  } catch (error) {
    logger.error('updateCastCrew failed', error)
    throw new Error(API_ERRORS.UPDATE_FAILED('cast/crew member'))
  }
}

/**
 * Delete a cast/crew member
 */
export async function deleteCastCrew(id: string): Promise<void> {
  try {
    await apiClient.delete<ApiResponse<null>>(`${CAST_CREW_BASE_PATH}/${id}`)
  } catch (error) {
    logger.error('deleteCastCrew failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('cast/crew member'))
  }
}

