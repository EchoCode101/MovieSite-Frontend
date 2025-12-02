import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type {
  CreatePagePayload,
  Page,
  PageListResponse,
  UpdatePagePayload,
} from '../types'

const PAGES_BASE_PATH = '/pages'

export async function getPages(): Promise<PageListResponse> {
  try {
    const response = (await apiClient.get<ApiResponse<PageListResponse>>(
      `${PAGES_BASE_PATH}/admin/all`,
    )) as unknown as ApiResponse<PageListResponse>

    return extractData(response)
  } catch (error) {
    logger.error('getPages failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('pages'))
  }
}

export async function getPageBySlug(slug: string): Promise<Page> {
  try {
    const response = (await apiClient.get<ApiResponse<Page>>(
      `${PAGES_BASE_PATH}/${slug}`,
    )) as unknown as ApiResponse<Page>

    return extractData(response)
  } catch (error) {
    logger.error('getPageBySlug failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('page'))
  }
}

export async function createPage(
  payload: CreatePagePayload,
): Promise<Page> {
  try {
    const response = (await apiClient.post<ApiResponse<Page>>(
      PAGES_BASE_PATH,
      payload,
    )) as unknown as ApiResponse<Page>

    return extractData(response)
  } catch (error) {
    logger.error('createPage failed', error)
    throw new Error(API_ERRORS.CREATE_FAILED('page'))
  }
}

export async function updatePage(
  slug: string,
  payload: UpdatePagePayload,
): Promise<Page> {
  try {
    const response = (await apiClient.put<ApiResponse<Page>>(
      `${PAGES_BASE_PATH}/${slug}`,
      payload,
    )) as unknown as ApiResponse<Page>

    return extractData(response)
  } catch (error) {
    logger.error('updatePage failed', error)
    throw new Error(API_ERRORS.UPDATE_FAILED('page'))
  }
}

export async function deletePage(slug: string): Promise<void> {
  try {
    await apiClient.delete<ApiResponse<null>>(
      `${PAGES_BASE_PATH}/${slug}`,
    )
  } catch (error) {
    logger.error('deletePage failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('page'))
  }
}


