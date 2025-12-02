import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type {
  CreateTvShowPayload,
  TvShowDetail,
  TvShowListParams,
  TvShowListResponse,
  UpdateTvShowPayload,
} from '../types'

const TV_SHOWS_BASE_PATH = '/tv-shows'

/**
 * Get paginated list of TV shows
 */
export async function getTvShows(
  params: TvShowListParams,
): Promise<TvShowListResponse> {
  try {
    const response = (await apiClient.get<ApiResponse<TvShowListResponse>>(
      `${TV_SHOWS_BASE_PATH}/paginated`,
      { params },
    )) as unknown as ApiResponse<TvShowListResponse>

    return extractData(response)
  } catch (error) {
    logger.error('getTvShows failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('TV shows'))
  }
}

/**
 * Get TV show by ID
 */
export async function getTvShowById(id: string): Promise<TvShowDetail> {
  try {
    const response = (await apiClient.get<ApiResponse<TvShowDetail>>(
      `${TV_SHOWS_BASE_PATH}/${id}`,
    )) as unknown as ApiResponse<TvShowDetail>

    return extractData(response)
  } catch (error) {
    logger.error('getTvShowById failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('TV show'))
  }
}

/**
 * Get all TV shows (admin only, for dropdowns)
 */
export async function getAllTvShows(): Promise<TvShowDetail[]> {
  try {
    const response = (await apiClient.get<ApiResponse<TvShowDetail[]>>(
      TV_SHOWS_BASE_PATH,
    )) as unknown as ApiResponse<TvShowDetail[]>

    return extractData(response)
  } catch (error) {
    logger.error('getAllTvShows failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('TV shows'))
  }
}

/**
 * Create a new TV show
 */
export async function createTvShow(
  payload: CreateTvShowPayload,
): Promise<TvShowDetail> {
  try {
    const response = (await apiClient.post<ApiResponse<TvShowDetail>>(
      TV_SHOWS_BASE_PATH,
      payload,
    )) as unknown as ApiResponse<TvShowDetail>

    return extractData(response)
  } catch (error) {
    logger.error('createTvShow failed', error)
    throw new Error(API_ERRORS.CREATE_FAILED('TV show'))
  }
}

/**
 * Update an existing TV show
 */
export async function updateTvShow(
  id: string,
  payload: UpdateTvShowPayload,
): Promise<TvShowDetail> {
  try {
    const response = (await apiClient.put<ApiResponse<TvShowDetail>>(
      `${TV_SHOWS_BASE_PATH}/${id}`,
      payload,
    )) as unknown as ApiResponse<TvShowDetail>

    return extractData(response)
  } catch (error) {
    logger.error('updateTvShow failed', error)
    throw new Error(API_ERRORS.UPDATE_FAILED('TV show'))
  }
}

/**
 * Delete a TV show
 */
export async function deleteTvShow(id: string): Promise<void> {
  try {
    await apiClient.delete<ApiResponse<null>>(`${TV_SHOWS_BASE_PATH}/${id}`)
  } catch (error) {
    logger.error('deleteTvShow failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('TV show'))
  }
}

/**
 * Get seasons for a TV show
 */
export async function getTvShowSeasons(tvShowId: string): Promise<unknown[]> {
  try {
    const response = (await apiClient.get<ApiResponse<unknown[]>>(
      `${TV_SHOWS_BASE_PATH}/${tvShowId}/seasons`,
    )) as unknown as ApiResponse<unknown[]>

    return extractData(response)
  } catch (error) {
    logger.error('getTvShowSeasons failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('TV show seasons'))
  }
}

