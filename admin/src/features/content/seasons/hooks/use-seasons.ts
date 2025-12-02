import { useQuery } from '@tanstack/react-query'

import { getSeasons } from '../api/seasons-api'
import type { SeasonDetail } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch all seasons (admin only)
 */
export function useSeasons() {
  return useQuery<SeasonDetail[]>({
    queryKey: queryKeys.seasons.all,
    queryFn: () => getSeasons(),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

