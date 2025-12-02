import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateTvShow } from '../api/tv-shows-api'
import type { UpdateTvShowPayload } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to update an existing TV show
 */
export function useUpdateTvShow() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTvShowPayload }) =>
      updateTvShow(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tvShows.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.tvShows.detail(variables.id),
      })
      toast.success('TV show updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update TV show', error.message)
    },
  })
}

