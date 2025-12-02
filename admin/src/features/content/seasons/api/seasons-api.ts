import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type {
  CreateSeasonPayload,
  SeasonDetail,
  UpdateSeasonPayload,
} from '../types'

const SEASONS_BASE_PATH = '/seasons'

/**
 * Get all seasons (admin only)
 */
export async function getSeasons(): Promise<SeasonDetail[]> {
  try {
    const response = (await apiClient.get<ApiResponse<SeasonDetail[]>>(
      SEASONS_BASE_PATH,
    )) as unknown as ApiResponse<SeasonDetail[]>

    return extractData(response)
  } catch (error) {
    logger.error('getSeasons failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('seasons'))
  }
}

/**
 * Get seasons by TV show
 */
export async function getSeasonsByTvShow(tvShowId: string): Promise<SeasonDetail[]> {
  try {
    const response = (await apiClient.get<ApiResponse<SeasonDetail[]>>(
      `${SEASONS_BASE_PATH}/tv-show/${tvShowId}`,
    )) as unknown as ApiResponse<SeasonDetail[]>

    return extractData(response)
  } catch (error) {
    logger.error('getSeasonsByTvShow failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('seasons'))
  }
}

/**
 * Get season by ID
 */
export async function getSeasonById(id: string): Promise<SeasonDetail> {
  try {
    const response = (await apiClient.get<ApiResponse<SeasonDetail>>(
      `${SEASONS_BASE_PATH}/${id}`,
    )) as unknown as ApiResponse<SeasonDetail>

    return extractData(response)
  } catch (error) {
    logger.error('getSeasonById failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('season'))
  }
}

/**
 * Create a new season
 */
export async function createSeason(
  payload: CreateSeasonPayload,
): Promise<SeasonDetail> {
  try {
    const response = (await apiClient.post<ApiResponse<SeasonDetail>>(
      SEASONS_BASE_PATH,
      payload,
    )) as unknown as ApiResponse<SeasonDetail>

    return extractData(response)
  } catch (error) {
    logger.error('createSeason failed', error)
    throw new Error(API_ERRORS.CREATE_FAILED('season'))
  }
}

/**
 * Update an existing season
 */
export async function updateSeason(
  id: string,
  payload: UpdateSeasonPayload,
): Promise<SeasonDetail> {
  try {
    const response = (await apiClient.put<ApiResponse<SeasonDetail>>(
      `${SEASONS_BASE_PATH}/${id}`,
      payload,
    )) as unknown as ApiResponse<SeasonDetail>

    return extractData(response)
  } catch (error) {
    logger.error('updateSeason failed', error)
    throw new Error(API_ERRORS.UPDATE_FAILED('season'))
  }
}

/**
 * Delete a season
 */
export async function deleteSeason(id: string): Promise<void> {
  try {
    await apiClient.delete<ApiResponse<null>>(`${SEASONS_BASE_PATH}/${id}`)
  } catch (error) {
    logger.error('deleteSeason failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('season'))
  }
}

