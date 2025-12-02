import { useQuery } from '@tanstack/react-query'

import { getAllTvShows } from '../api/tv-shows-api'
import type { TvShowDetail } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch all TV shows (admin only, for dropdowns)
 */
export function useAllTvShows() {
  return useQuery<TvShowDetail[]>({
    queryKey: queryKeys.tvShows.all,
    queryFn: () => getAllTvShows(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

