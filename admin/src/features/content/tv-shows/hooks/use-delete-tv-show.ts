import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteTvShow } from '../api/tv-shows-api'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to delete a TV show
 */
export function useDeleteTvShow() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteTvShow(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tvShows.all })
      toast.success('TV show deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete TV show', error.message)
    },
  })
}

