import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createTvShow } from '../api/tv-shows-api'
import type { CreateTvShowPayload } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to create a new TV show
 */
export function useCreateTvShow() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateTvShowPayload) => createTvShow(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tvShows.all })
      toast.success('TV show created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create TV show', error.message)
    },
  })
}

