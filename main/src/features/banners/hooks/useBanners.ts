import { useQuery } from '@tanstack/react-query'
import { getBanners } from '../api/banners'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch banners with optional filters
 * 
 * @param params - Optional filters (device, position)
 * @returns Query hook for banners
 */
export const useBanners = (params?: {
  device?: 'web' | 'mobile' | 'tv'
  position?: 'home' | 'movie' | 'tv' | 'video'
}) => {
  return useQuery({
    queryKey: queryKeys.banners.lists(params),
    queryFn: () => getBanners(params),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

