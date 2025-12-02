import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createEpisode } from '../api/episodes-api'
import type { CreateEpisodePayload } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to create a new episode
 */
export function useCreateEpisode() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateEpisodePayload) => createEpisode(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.episodes.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.episodes.bySeason(variables.season_id) })
      toast.success('Episode created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create episode', error.message)
    },
  })
}

