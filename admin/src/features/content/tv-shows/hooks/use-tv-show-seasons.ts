import { useQuery } from '@tanstack/react-query'

import { getTvShowSeasons } from '../api/tv-shows-api'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch seasons for a TV show
 */
export function useTvShowSeasons(tvShowId: string | undefined) {
  return useQuery<unknown[]>({
    queryKey: queryKeys.tvShows.seasons(tvShowId || ''),
    queryFn: () => {
      if (!tvShowId) throw new Error('TV show ID is required')
      return getTvShowSeasons(tvShowId)
    },
    enabled: !!tvShowId,
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

