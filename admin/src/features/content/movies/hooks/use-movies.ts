import { useQuery } from '@tanstack/react-query'

import { getMovies } from '../api/movies-api'
import type { MovieListParams, MovieListResponse } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch paginated list of movies
 */
export function useMovies(params: MovieListParams) {
  return useQuery<MovieListResponse>({
    queryKey: queryKeys.movies.list(params),
    queryFn: () => getMovies(params),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

