import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type {
  CreateEpisodePayload,
  EpisodeDetail,
  EpisodeListParams,
  EpisodeListResponse,
  UpdateEpisodePayload,
} from '../types'

const EPISODES_BASE_PATH = '/episodes'

/**
 * Get paginated list of episodes
 */
export async function getEpisodes(
  params: EpisodeListParams,
): Promise<EpisodeListResponse> {
  try {
    const response = (await apiClient.get<ApiResponse<EpisodeListResponse>>(
      `${EPISODES_BASE_PATH}/paginated`,
      { params },
    )) as unknown as ApiResponse<EpisodeListResponse>

    return extractData(response)
  } catch (error) {
    logger.error('getEpisodes failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('episodes'))
  }
}

/**
 * Get all episodes (admin only)
 */
export async function getAllEpisodes(): Promise<EpisodeDetail[]> {
  try {
    const response = (await apiClient.get<ApiResponse<EpisodeDetail[]>>(
      EPISODES_BASE_PATH,
    )) as unknown as ApiResponse<EpisodeDetail[]>

    return extractData(response)
  } catch (error) {
    logger.error('getAllEpisodes failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('episodes'))
  }
}

/**
 * Get episodes by season
 */
export async function getEpisodesBySeason(seasonId: string): Promise<EpisodeDetail[]> {
  try {
    const response = (await apiClient.get<ApiResponse<EpisodeDetail[]>>(
      `${EPISODES_BASE_PATH}/season/${seasonId}`,
    )) as unknown as ApiResponse<EpisodeDetail[]>

    return extractData(response)
  } catch (error) {
    logger.error('getEpisodesBySeason failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('episodes'))
  }
}

/**
 * Get episode by ID
 */
export async function getEpisodeById(id: string): Promise<EpisodeDetail> {
  try {
    const response = (await apiClient.get<ApiResponse<EpisodeDetail>>(
      `${EPISODES_BASE_PATH}/${id}`,
    )) as unknown as ApiResponse<EpisodeDetail>

    return extractData(response)
  } catch (error) {
    logger.error('getEpisodeById failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('episode'))
  }
}

/**
 * Create a new episode
 */
export async function createEpisode(
  payload: CreateEpisodePayload,
): Promise<EpisodeDetail> {
  try {
    const response = (await apiClient.post<ApiResponse<EpisodeDetail>>(
      EPISODES_BASE_PATH,
      payload,
    )) as unknown as ApiResponse<EpisodeDetail>

    return extractData(response)
  } catch (error) {
    logger.error('createEpisode failed', error)
    throw new Error(API_ERRORS.CREATE_FAILED('episode'))
  }
}

/**
 * Update an existing episode
 */
export async function updateEpisode(
  id: string,
  payload: UpdateEpisodePayload,
): Promise<EpisodeDetail> {
  try {
    const response = (await apiClient.put<ApiResponse<EpisodeDetail>>(
      `${EPISODES_BASE_PATH}/${id}`,
      payload,
    )) as unknown as ApiResponse<EpisodeDetail>

    return extractData(response)
  } catch (error) {
    logger.error('updateEpisode failed', error)
    throw new Error(API_ERRORS.UPDATE_FAILED('episode'))
  }
}

/**
 * Delete an episode
 */
export async function deleteEpisode(id: string): Promise<void> {
  try {
    await apiClient.delete<ApiResponse<null>>(`${EPISODES_BASE_PATH}/${id}`)
  } catch (error) {
    logger.error('deleteEpisode failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('episode'))
  }
}

