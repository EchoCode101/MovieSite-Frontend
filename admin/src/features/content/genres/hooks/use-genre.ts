import { useQuery } from '@tanstack/react-query'

import { getGenreById } from '../api/genres-api'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch a single genre by ID
 */
export function useGenre(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.genres.detail(id || ''),
    queryFn: () => {
      if (!id) throw new Error('Genre ID is required')
      return getGenreById(id)
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

