import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'

import { getAllBanners, getBanners } from '../api/banners-api'
import type { BannerListParams, BannerListResponse } from '../types'

/**
 * Hook to fetch banners. If no filters are provided, uses admin \"all\" endpoint,
 * otherwise fetches filtered active banners.
 */
export function useBanners(params?: BannerListParams) {
    const hasFilters =
        !!params?.device || !!params?.position || params?.is_active !== undefined

  return useQuery<BannerListResponse>({
    queryKey: queryKeys.banners.all,
    queryFn: () =>
      hasFilters ? getBanners(params as BannerListParams) : getAllBanners(),
  })
}


