import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createSeason } from '../api/seasons-api'
import type { CreateSeasonPayload } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to create a new season
 */
export function useCreateSeason() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateSeasonPayload) => createSeason(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.seasons.all })
      queryClient.invalidateQueries({ queryKey: ['seasons', 'tv-show', variables.tv_show_id] })
      queryClient.invalidateQueries({ queryKey: queryKeys.tvShows.seasons(variables.tv_show_id) })
      toast.success('Season created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create season', error.message)
    },
  })
}

