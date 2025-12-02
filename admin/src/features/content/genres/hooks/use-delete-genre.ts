import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteGenre } from '../api/genres-api'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to delete a genre
 */
export function useDeleteGenre() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteGenre(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.genres.all })
      toast.success('Genre deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete genre', error.message)
    },
  })
}

