import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createMovie } from '../api/movies-api'
import type { CreateMoviePayload } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to create a new movie
 */
export function useCreateMovie() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateMoviePayload) => createMovie(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.movies.all })
      toast.success('Movie created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create movie', error.message)
    },
  })
}

