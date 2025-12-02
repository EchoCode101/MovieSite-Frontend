import { useQuery } from '@tanstack/react-query'

import { getTvShows } from '../api/tv-shows-api'
import type { TvShowListParams, TvShowListResponse } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch paginated list of TV shows
 */
export function useTvShows(params: TvShowListParams) {
  return useQuery<TvShowListResponse>({
    queryKey: queryKeys.tvShows.list(params),
    queryFn: () => getTvShows(params),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

