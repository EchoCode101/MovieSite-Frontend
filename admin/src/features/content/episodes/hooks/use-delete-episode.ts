import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteEpisode } from '../api/episodes-api'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to delete an episode
 */
export function useDeleteEpisode() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteEpisode(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.episodes.all })
      toast.success('Episode deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete episode', error.message)
    },
  })
}

