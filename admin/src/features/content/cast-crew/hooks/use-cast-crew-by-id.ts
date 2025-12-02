import { useQuery } from '@tanstack/react-query'

import { getCastCrewById } from '../api/cast-crew-api'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch a single cast/crew member by ID
 */
export function useCastCrewById(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.castCrew.detail(id || ''),
    queryFn: () => {
      if (!id) throw new Error('Cast/Crew ID is required')
      return getCastCrewById(id)
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

