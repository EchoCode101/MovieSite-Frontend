import { useQuery } from '@tanstack/react-query'

import { getTvShowById } from '../api/tv-shows-api'
import type { TvShowDetail } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch a single TV show by ID
 */
export function useTvShow(id: string | undefined) {
  return useQuery<TvShowDetail>({
    queryKey: queryKeys.tvShows.detail(id || ''),
    queryFn: () => {
      if (!id) throw new Error('TV show ID is required')
      return getTvShowById(id)
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

