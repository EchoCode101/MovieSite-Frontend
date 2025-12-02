import { useQuery } from '@tanstack/react-query'

import { getMovieById } from '../api/movies-api'
import type { MovieDetail } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch a single movie by ID
 */
export function useMovie(id: string | undefined) {
  return useQuery<MovieDetail>({
    queryKey: queryKeys.movies.detail(id || ''),
    queryFn: () => {
      if (!id) throw new Error('Movie ID is required')
      return getMovieById(id)
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

