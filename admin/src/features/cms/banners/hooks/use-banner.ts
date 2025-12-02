import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'

import { getBannerById } from '../api/banners-api'
import type { Banner } from '../types'

/**
 * Hook to fetch a single banner by ID
 */
export function useBanner(id?: string) {
    return useQuery<Banner>({
        queryKey: queryKeys.banners.detail(id || ''),
        queryFn: () => {
            if (!id) {
                return Promise.reject(new Error('Banner ID is required'))
            }
            return getBannerById(id)
        },
        enabled: Boolean(id),
        staleTime: 1000 * 60 * 5,
    })
}


