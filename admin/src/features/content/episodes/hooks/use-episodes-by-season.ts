import { useQuery } from '@tanstack/react-query'

import { getEpisodesBySeason } from '../api/episodes-api'
import type { EpisodeDetail } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch episodes by season
 */
export function useEpisodesBySeason(seasonId: string | undefined) {
  return useQuery<EpisodeDetail[]>({
    queryKey: queryKeys.episodes.bySeason(seasonId || ''),
    queryFn: () => {
      if (!seasonId) throw new Error('Season ID is required')
      return getEpisodesBySeason(seasonId)
    },
    enabled: !!seasonId,
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

