import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type {
  CreateGenrePayload,
  Genre,
  GenreListParams,
  UpdateGenrePayload,
} from '../types'

const GENRES_BASE_PATH = '/genres'

/**
 * Get all genres
 */
export async function getGenres(
  params?: GenreListParams,
): Promise<Genre[]> {
  try {
    const response = (await apiClient.get<ApiResponse<Genre[]>>(
      GENRES_BASE_PATH,
      { params },
    )) as unknown as ApiResponse<Genre[]>

    return extractData(response)
  } catch (error) {
    logger.error('getGenres failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('genres'))
  }
}

/**
 * Get genre by ID
 */
export async function getGenreById(id: string): Promise<Genre> {
  try {
    const response = (await apiClient.get<ApiResponse<Genre>>(
      `${GENRES_BASE_PATH}/${id}`,
    )) as unknown as ApiResponse<Genre>

    return extractData(response)
  } catch (error) {
    logger.error('getGenreById failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('genre'))
  }
}

/**
 * Create a new genre
 */
export async function createGenre(
  payload: CreateGenrePayload,
): Promise<Genre> {
  try {
    const response = (await apiClient.post<ApiResponse<Genre>>(
      GENRES_BASE_PATH,
      payload,
    )) as unknown as ApiResponse<Genre>

    return extractData(response)
  } catch (error) {
    logger.error('createGenre failed', error)
    throw new Error(API_ERRORS.CREATE_FAILED('genre'))
  }
}

/**
 * Update an existing genre
 */
export async function updateGenre(
  id: string,
  payload: UpdateGenrePayload,
): Promise<Genre> {
  try {
    const response = (await apiClient.put<ApiResponse<Genre>>(
      `${GENRES_BASE_PATH}/${id}`,
      payload,
    )) as unknown as ApiResponse<Genre>

    return extractData(response)
  } catch (error) {
    logger.error('updateGenre failed', error)
    throw new Error(API_ERRORS.UPDATE_FAILED('genre'))
  }
}

/**
 * Delete a genre
 */
export async function deleteGenre(id: string): Promise<void> {
  try {
    await apiClient.delete<ApiResponse<null>>(`${GENRES_BASE_PATH}/${id}`)
  } catch (error) {
    logger.error('deleteGenre failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('genre'))
  }
}

