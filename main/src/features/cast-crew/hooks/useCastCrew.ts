import { useQuery } from '@tanstack/react-query'
import { getCastCrew, getCastCrewById } from '../api/cast-crew'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch cast & crew
 * 
 * @param params - Query parameters
 * @returns Query hook for cast & crew
 */
export const useCastCrew = (params?: {
  type?: 'actor' | 'director' | 'writer' | 'crew'
  search?: string
}) => {
  return useQuery({
    queryKey: queryKeys.castCrew.lists(params),
    queryFn: () => getCastCrew(params),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

/**
 * Hook to fetch a single cast & crew member
 * 
 * @param id - Cast & crew ID
 * @returns Query hook for cast & crew member
 */
export const useCastCrewMember = (id: string) => {
  return useQuery({
    queryKey: queryKeys.castCrew.detail(id),
    queryFn: () => getCastCrewById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

