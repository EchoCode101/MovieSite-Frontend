import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createGenre } from '../api/genres-api'
import type { CreateGenrePayload } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to create a new genre
 */
export function useCreateGenre() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateGenrePayload) => createGenre(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.genres.all })
      toast.success('Genre created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create genre', error.message)
    },
  })
}

