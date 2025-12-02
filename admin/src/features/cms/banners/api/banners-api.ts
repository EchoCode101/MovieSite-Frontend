import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type {
    Banner,
    BannerListParams,
    BannerListResponse,
    CreateBannerPayload,
    UpdateBannerPayload,
} from '../types'

const BANNERS_BASE_PATH = '/banners'

/**
 * Get active banners (optionally filtered by device/position)
 *
 * Maps to: GET /api/banners
 */
export async function getBanners(
    params: BannerListParams,
): Promise<BannerListResponse> {
    try {
        const response = (await apiClient.get<ApiResponse<BannerListResponse>>(
            BANNERS_BASE_PATH,
            { params },
        )) as unknown as ApiResponse<BannerListResponse>

        return extractData(response)
    } catch (error) {
        logger.error('getBanners failed', error)
        throw new Error(API_ERRORS.FETCH_FAILED('banners'))
    }
}

/**
 * Get all banners (admin)
 *
 * Maps to: GET /api/banners/admin/all
 */
export async function getAllBanners(): Promise<BannerListResponse> {
    try {
        const response = (await apiClient.get<ApiResponse<BannerListResponse>>(
            `${BANNERS_BASE_PATH}/admin/all`,
        )) as unknown as ApiResponse<BannerListResponse>

        return extractData(response)
    } catch (error) {
        logger.error('getAllBanners failed', error)
        throw new Error(API_ERRORS.FETCH_FAILED('banners'))
    }
}

/**
 * Get banner by ID
 *
 * Maps to: GET /api/banners/:id
 */
export async function getBannerById(id: string): Promise<Banner> {
    try {
        const response = (await apiClient.get<ApiResponse<Banner>>(
            `${BANNERS_BASE_PATH}/${id}`,
        )) as unknown as ApiResponse<Banner>

        return extractData(response)
    } catch (error) {
        logger.error('getBannerById failed', error)
        throw new Error(API_ERRORS.FETCH_FAILED('banner'))
    }
}

/**
 * Create a new banner (admin)
 *
 * Maps to: POST /api/banners
 */
export async function createBanner(
    payload: CreateBannerPayload,
): Promise<Banner> {
    try {
        const response = (await apiClient.post<ApiResponse<Banner>>(
            BANNERS_BASE_PATH,
            payload,
        )) as unknown as ApiResponse<Banner>

        return extractData(response)
    } catch (error) {
        logger.error('createBanner failed', error)
        throw new Error(API_ERRORS.CREATE_FAILED('banner'))
    }
}

/**
 * Update an existing banner (admin)
 *
 * Maps to: PUT /api/banners/:id
 */
export async function updateBanner(
    id: string,
    payload: UpdateBannerPayload,
): Promise<Banner> {
    try {
        const response = (await apiClient.put<ApiResponse<Banner>>(
            `${BANNERS_BASE_PATH}/${id}`,
            payload,
        )) as unknown as ApiResponse<Banner>

        return extractData(response)
    } catch (error) {
        logger.error('updateBanner failed', error)
        throw new Error(API_ERRORS.UPDATE_FAILED('banner'))
    }
}

/**
 * Delete a banner (admin)
 *
 * Maps to: DELETE /api/banners/:id
 */
export async function deleteBanner(id: string): Promise<void> {
    try {
        await apiClient.delete<ApiResponse<null>>(`${BANNERS_BASE_PATH}/${id}`)
    } catch (error) {
        logger.error('deleteBanner failed', error)
        throw new Error(API_ERRORS.DELETE_FAILED('banner'))
    }
}


