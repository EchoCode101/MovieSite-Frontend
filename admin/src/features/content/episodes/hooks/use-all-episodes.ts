import { useQuery } from '@tanstack/react-query'

import { getAllEpisodes } from '../api/episodes-api'
import type { EpisodeDetail } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch all episodes (admin only)
 */
export function useAllEpisodes() {
  return useQuery<EpisodeDetail[]>({
    queryKey: queryKeys.episodes.all,
    queryFn: () => getAllEpisodes(),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

