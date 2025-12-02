import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateGenre } from '../api/genres-api'
import type { UpdateGenrePayload } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to update an existing genre
 */
export function useUpdateGenre() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateGenrePayload }) =>
      updateGenre(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.genres.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.genres.detail(variables.id) })
      toast.success('Genre updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update genre', error.message)
    },
  })
}

