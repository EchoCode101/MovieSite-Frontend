import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type {
  Channel,
  ChannelListParams,
  CreateChannelPayload,
  UpdateChannelPayload,
} from '../types'

const CHANNELS_BASE_PATH = '/channels'

/**
 * Get all channels
 */
export async function getChannels(params?: ChannelListParams): Promise<Channel[]> {
  try {
    const response = (await apiClient.get<ApiResponse<Channel[]>>(
      CHANNELS_BASE_PATH,
      { params },
    )) as unknown as ApiResponse<Channel[]>

    return extractData(response)
  } catch (error) {
    logger.error('getChannels failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('channels'))
  }
}

/**
 * Get channel by ID
 */
export async function getChannelById(id: string): Promise<Channel> {
  try {
    const response = (await apiClient.get<ApiResponse<Channel>>(
      `${CHANNELS_BASE_PATH}/${id}`,
    )) as unknown as ApiResponse<Channel>

    return extractData(response)
  } catch (error) {
    logger.error('getChannelById failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('channel'))
  }
}

/**
 * Create a new channel
 */
export async function createChannel(
  payload: CreateChannelPayload,
): Promise<Channel> {
  try {
    const response = (await apiClient.post<ApiResponse<Channel>>(
      CHANNELS_BASE_PATH,
      payload,
    )) as unknown as ApiResponse<Channel>

    return extractData(response)
  } catch (error) {
    logger.error('createChannel failed', error)
    throw new Error(API_ERRORS.CREATE_FAILED('channel'))
  }
}

/**
 * Update an existing channel
 */
export async function updateChannel(
  id: string,
  payload: UpdateChannelPayload,
): Promise<Channel> {
  try {
    const response = (await apiClient.put<ApiResponse<Channel>>(
      `${CHANNELS_BASE_PATH}/${id}`,
      payload,
    )) as unknown as ApiResponse<Channel>

    return extractData(response)
  } catch (error) {
    logger.error('updateChannel failed', error)
    throw new Error(API_ERRORS.UPDATE_FAILED('channel'))
  }
}

/**
 * Delete a channel
 */
export async function deleteChannel(id: string): Promise<void> {
  try {
    await apiClient.delete<ApiResponse<null>>(`${CHANNELS_BASE_PATH}/${id}`)
  } catch (error) {
    logger.error('deleteChannel failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('channel'))
  }
}

