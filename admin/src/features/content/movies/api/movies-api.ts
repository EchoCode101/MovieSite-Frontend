import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type {
  CreateMoviePayload,
  MovieDetail,
  MovieListParams,
  MovieListResponse,
  UpdateMoviePayload,
} from '../types'

const MOVIES_BASE_PATH = '/movies'

/**
 * Get paginated list of movies
 */
export async function getMovies(
  params: MovieListParams,
): Promise<MovieListResponse> {
  try {
    const response = (await apiClient.get<ApiResponse<MovieListResponse>>(
      `${MOVIES_BASE_PATH}/paginated`,
      { params },
    )) as unknown as ApiResponse<MovieListResponse>

    return extractData(response)
  } catch (error) {
    logger.error('getMovies failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('movies'))
  }
}

/**
 * Get movie by ID
 */
export async function getMovieById(id: string): Promise<MovieDetail> {
  try {
    const response = (await apiClient.get<ApiResponse<MovieDetail>>(
      `${MOVIES_BASE_PATH}/${id}`,
    )) as unknown as ApiResponse<MovieDetail>

    return extractData(response)
  } catch (error) {
    logger.error('getMovieById failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('movie'))
  }
}

/**
 * Create a new movie
 */
export async function createMovie(
  payload: CreateMoviePayload,
): Promise<MovieDetail> {
  try {
    const response = (await apiClient.post<ApiResponse<MovieDetail>>(
      MOVIES_BASE_PATH,
      payload,
    )) as unknown as ApiResponse<MovieDetail>

    return extractData(response)
  } catch (error) {
    logger.error('createMovie failed', error)
    throw new Error(API_ERRORS.CREATE_FAILED('movie'))
  }
}

/**
 * Update an existing movie
 */
export async function updateMovie(
  id: string,
  payload: UpdateMoviePayload,
): Promise<MovieDetail> {
  try {
    const response = (await apiClient.put<ApiResponse<MovieDetail>>(
      `${MOVIES_BASE_PATH}/${id}`,
      payload,
    )) as unknown as ApiResponse<MovieDetail>

    return extractData(response)
  } catch (error) {
    logger.error('updateMovie failed', error)
    throw new Error(API_ERRORS.UPDATE_FAILED('movie'))
  }
}

/**
 * Delete a movie
 */
export async function deleteMovie(id: string): Promise<void> {
  try {
    await apiClient.delete<ApiResponse<null>>(`${MOVIES_BASE_PATH}/${id}`)
  } catch (error) {
    logger.error('deleteMovie failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('movie'))
  }
}

/**
 * Get trending movies
 */
export async function getTrendingMovies(): Promise<MovieDetail[]> {
  try {
    const response = (await apiClient.get<ApiResponse<MovieDetail[]>>(
      `${MOVIES_BASE_PATH}/trending`,
    )) as unknown as ApiResponse<MovieDetail[]>

    return extractData(response)
  } catch (error) {
    logger.error('getTrendingMovies failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('trending movies'))
  }
}

/**
 * Get featured movies
 */
export async function getFeaturedMovies(): Promise<MovieDetail[]> {
  try {
    const response = (await apiClient.get<ApiResponse<MovieDetail[]>>(
      `${MOVIES_BASE_PATH}/featured`,
    )) as unknown as ApiResponse<MovieDetail[]>

    return extractData(response)
  } catch (error) {
    logger.error('getFeaturedMovies failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('featured movies'))
  }
}

/**
 * Get coming soon movies
 */
export async function getComingSoonMovies(): Promise<MovieDetail[]> {
  try {
    const response = (await apiClient.get<ApiResponse<MovieDetail[]>>(
      `${MOVIES_BASE_PATH}/coming-soon`,
    )) as unknown as ApiResponse<MovieDetail[]>

    return extractData(response)
  } catch (error) {
    logger.error('getComingSoonMovies failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('coming soon movies'))
  }
}

