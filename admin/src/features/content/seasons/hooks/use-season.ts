import { useQuery } from '@tanstack/react-query'

import { getSeasonById } from '../api/seasons-api'
import type { SeasonDetail } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch a single season by ID
 */
export function useSeason(id: string | undefined) {
  return useQuery<SeasonDetail>({
    queryKey: queryKeys.seasons.detail(id || ''),
    queryFn: () => {
      if (!id) throw new Error('Season ID is required')
      return getSeasonById(id)
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

