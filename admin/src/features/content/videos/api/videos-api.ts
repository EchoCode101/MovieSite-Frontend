import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type {
  CreateVideoPayload,
  UpdateVideoPayload,
  UploadResult,
  VideoDetail,
  VideoListParams,
  VideoListResponse,
} from '../types'

const VIDEOS_BASE_PATH = '/videos'

/**
 * Get paginated list of videos
 */
export async function getVideos(
  params: VideoListParams,
): Promise<VideoListResponse> {
  try {
    const response = (await apiClient.get<ApiResponse<VideoListResponse>>(
      `${VIDEOS_BASE_PATH}/paginated`,
      { params },
    )) as unknown as ApiResponse<VideoListResponse>

    return extractData(response)
  } catch (error) {
    logger.error('getVideos failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('videos'))
  }
}

/**
 * Get video by ID
 */
export async function getVideoById(id: string): Promise<VideoDetail> {
  try {
    const response = (await apiClient.get<ApiResponse<VideoDetail>>(
      `${VIDEOS_BASE_PATH}/${id}`,
    )) as unknown as ApiResponse<VideoDetail>

    return extractData(response)
  } catch (error) {
    logger.error('getVideoById failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('video'))
  }
}

/**
 * Create a new video
 */
export async function createVideo(
  payload: CreateVideoPayload,
): Promise<VideoDetail> {
  try {
    const response = (await apiClient.post<ApiResponse<VideoDetail>>(
      VIDEOS_BASE_PATH,
      payload,
    )) as unknown as ApiResponse<VideoDetail>

    return extractData(response)
  } catch (error) {
    logger.error('createVideo failed', error)
    throw new Error(API_ERRORS.CREATE_FAILED('video'))
  }
}

/**
 * Update an existing video
 */
export async function updateVideo(
  id: string,
  payload: UpdateVideoPayload,
): Promise<VideoDetail> {
  try {
    const response = (await apiClient.put<ApiResponse<VideoDetail>>(
      `${VIDEOS_BASE_PATH}/${id}`,
      payload,
    )) as unknown as ApiResponse<VideoDetail>

    return extractData(response)
  } catch (error) {
    logger.error('updateVideo failed', error)
    throw new Error(API_ERRORS.UPDATE_FAILED('video'))
  }
}

/**
 * Delete a video
 */
export async function deleteVideo(id: string): Promise<void> {
  try {
    await apiClient.delete<ApiResponse<null>>(`${VIDEOS_BASE_PATH}/${id}`)
  } catch (error) {
    logger.error('deleteVideo failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('video'))
  }
}

/**
 * Bulk delete videos
 */
export async function bulkDeleteVideos(ids: string[]): Promise<void> {
  try {
    await apiClient.delete<ApiResponse<unknown>>(`${VIDEOS_BASE_PATH}/bulk`, {
      data: { ids },
    })
  } catch (error) {
    logger.error('bulkDeleteVideos failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('videos'))
  }
}

/**
 * Upload video to Cloudinary
 */
export async function uploadVideoToCloudinary(
  file: File,
): Promise<UploadResult> {
  try {
    const formData = new FormData()
    formData.append('video', file)

    const response = (await apiClient.post<ApiResponse<UploadResult>>(
      `${VIDEOS_BASE_PATH}/uploadVideoToCloudinary`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )) as unknown as ApiResponse<UploadResult>

    return extractData(response)
  } catch (error) {
    logger.error('uploadVideoToCloudinary failed', error)
    throw new Error(API_ERRORS.CREATE_FAILED('video upload'))
  }
}

