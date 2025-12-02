import { useQuery } from '@tanstack/react-query'

import { getGenres } from '../api/genres-api'
import type { GenreListParams } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch all genres
 */
export function useGenres(params?: GenreListParams) {
  return useQuery({
    queryKey: queryKeys.genres.all,
    queryFn: () => getGenres(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

