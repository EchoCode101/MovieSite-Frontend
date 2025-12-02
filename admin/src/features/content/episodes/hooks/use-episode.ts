import { useQuery } from '@tanstack/react-query'

import { getEpisodeById } from '../api/episodes-api'
import type { EpisodeDetail } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch a single episode by ID
 */
export function useEpisode(id: string | undefined) {
  return useQuery<EpisodeDetail>({
    queryKey: queryKeys.episodes.detail(id || ''),
    queryFn: () => {
      if (!id) throw new Error('Episode ID is required')
      return getEpisodeById(id)
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

