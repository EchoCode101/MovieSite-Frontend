import { useQuery } from '@tanstack/react-query'

import { getCastCrew } from '../api/cast-crew-api'
import type { CastCrewListParams } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch cast/crew with optional filters
 */
export function useCastCrew(params?: CastCrewListParams) {
  return useQuery({
    queryKey: queryKeys.castCrew.list(params),
    queryFn: () => getCastCrew(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

