import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateMovie } from '../api/movies-api'
import type { UpdateMoviePayload } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to update an existing movie
 */
export function useUpdateMovie() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateMoviePayload }) =>
      updateMovie(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.movies.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.movies.detail(variables.id),
      })
      toast.success('Movie updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update movie', error.message)
    },
  })
}

