import { useQuery } from '@tanstack/react-query'
import { getGenres, getGenreById } from '../api/genres'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch all genres
 * 
 * @returns Query hook for genres
 */
export const useGenres = () => {
  return useQuery({
    queryKey: queryKeys.genres.all,
    queryFn: getGenres,
    staleTime: 1000 * 60 * 30, // 30 minutes (genres don't change often)
  })
}

/**
 * Hook to fetch a single genre
 * 
 * @param id - Genre ID
 * @returns Query hook for genre
 */
export const useGenre = (id: string) => {
  return useQuery({
    queryKey: queryKeys.genres.detail(id),
    queryFn: () => getGenreById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 30, // 30 minutes
  })
}

