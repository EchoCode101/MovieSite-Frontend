import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'
import type {
    ContentStats,
    DashboardPeriod,
    DashboardStats,
    RecentActivityItem,
    RevenuePoint,
    TopContentItem,
    TopContentType,
    UserGrowthPoint,
} from '../types'

export async function getDashboardStats(): Promise<DashboardStats> {
    try {
        const response = (await apiClient.get<ApiResponse<DashboardStats>>(
            '/admin/dashboard/stats',
        )) as unknown as ApiResponse<DashboardStats>
        return extractData(response)
    } catch (error) {
        logger.error('getDashboardStats failed', error)
        throw new Error(API_ERRORS.FETCH_FAILED('dashboard stats'))
    }
}

export async function getRevenueData(
    period: DashboardPeriod,
): Promise<RevenuePoint[]> {
    try {
        const response = (await apiClient.get<ApiResponse<RevenuePoint[]>>(
            '/admin/dashboard/revenue',
            {
                params: { period },
            },
        )) as unknown as ApiResponse<RevenuePoint[]>
        return extractData(response)
    } catch (error) {
        logger.error('getRevenueData failed', error)
        throw new Error(API_ERRORS.FETCH_FAILED('revenue data'))
    }
}

export async function getUserGrowth(
    period: DashboardPeriod,
): Promise<UserGrowthPoint[]> {
    try {
        const response = (await apiClient.get<ApiResponse<UserGrowthPoint[]>>(
            '/admin/dashboard/user-growth',
            {
                params: { period },
            },
        )) as unknown as ApiResponse<UserGrowthPoint[]>
        return extractData(response)
    } catch (error) {
        logger.error('getUserGrowth failed', error)
        throw new Error(API_ERRORS.FETCH_FAILED('user growth data'))
    }
}

export async function getContentStats(): Promise<ContentStats> {
    try {
        const response = (await apiClient.get<ApiResponse<ContentStats>>(
            '/admin/dashboard/content-stats',
        )) as unknown as ApiResponse<ContentStats>
        return extractData(response)
    } catch (error) {
        logger.error('getContentStats failed', error)
        throw new Error(API_ERRORS.FETCH_FAILED('content stats'))
    }
}

export async function getRecentActivity(
    limit: number,
): Promise<RecentActivityItem[]> {
    try {
        const response = (await apiClient.get<ApiResponse<RecentActivityItem[]>>(
            '/admin/dashboard/recent-activity',
            {
                params: { limit },
            },
        )) as unknown as ApiResponse<RecentActivityItem[]>
        return extractData(response)
    } catch (error) {
        logger.error('getRecentActivity failed', error)
        throw new Error(API_ERRORS.FETCH_FAILED('recent activity'))
    }
}

export async function getTopContent(
    type: TopContentType,
    limit: number,
): Promise<TopContentItem[]> {
    try {
        const response = (await apiClient.get<ApiResponse<TopContentItem[]>>(
            '/admin/dashboard/top-content',
            {
                params: { type, limit },
            },
        )) as unknown as ApiResponse<TopContentItem[]>
        return extractData(response)
    } catch (error) {
        logger.error('getTopContent failed', error)
        throw new Error(API_ERRORS.FETCH_FAILED('top content'))
    }
}


