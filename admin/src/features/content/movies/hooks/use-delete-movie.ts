import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteMovie } from '../api/movies-api'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to delete a movie
 */
export function useDeleteMovie() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteMovie(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.movies.all })
      toast.success('Movie deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete movie', error.message)
    },
  })
}

