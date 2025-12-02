import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import {
    getContentStats,
    getDashboardStats,
    getRecentActivity,
    getRevenueData,
    getTopContent,
    getUserGrowth,
} from '../api/dashboard-api'
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

export function useDashboardStats() {
    return useQuery<DashboardStats, Error>({
        queryKey: queryKeys.dashboard.stats(),
        queryFn: getDashboardStats,
        staleTime: 5 * 60 * 1000,
    })
}

export function useRevenueData(period: DashboardPeriod) {
    return useQuery<RevenuePoint[]>({
        queryKey: queryKeys.dashboard.revenue(period),
        queryFn: () => getRevenueData(period),
        staleTime: 5 * 60 * 1000,
    })
}

export function useUserGrowth(period: DashboardPeriod) {
    return useQuery<UserGrowthPoint[]>({
        queryKey: queryKeys.dashboard.userGrowth(period),
        queryFn: () => getUserGrowth(period),
        staleTime: 5 * 60 * 1000,
    })
}

export function useContentStats() {
    return useQuery<ContentStats>({
        queryKey: queryKeys.dashboard.contentStats(),
        queryFn: getContentStats,
        staleTime: 10 * 60 * 1000,
    })
}

export function useRecentActivity(limit = 10) {
    return useQuery<RecentActivityItem[]>({
        queryKey: queryKeys.dashboard.recentActivity(limit),
        queryFn: () => getRecentActivity(limit),
        staleTime: 60 * 1000,
    })
}

export function useTopContent(type: TopContentType = 'all', limit = 5) {
    return useQuery<TopContentItem[]>({
        queryKey: queryKeys.dashboard.topContent(type, limit),
        queryFn: () => getTopContent(type, limit),
        staleTime: 5 * 60 * 1000,
    })
}


