import { useQuery } from '@tanstack/react-query'

import { getEpisodes } from '../api/episodes-api'
import type { EpisodeListParams, EpisodeListResponse } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch paginated list of episodes
 */
export function useEpisodes(params: EpisodeListParams) {
  return useQuery<EpisodeListResponse>({
    queryKey: queryKeys.episodes.list(params),
    queryFn: () => getEpisodes(params),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

