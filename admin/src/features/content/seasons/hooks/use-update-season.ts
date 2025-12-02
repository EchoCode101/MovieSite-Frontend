import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateSeason } from '../api/seasons-api'
import type { UpdateSeasonPayload, SeasonDetail } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to update an existing season
 */
export function useUpdateSeason() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: UpdateSeasonPayload }) =>
            updateSeason(id, payload),
        onSuccess: async (data: SeasonDetail, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.seasons.all })
            queryClient.invalidateQueries({
                queryKey: queryKeys.seasons.detail(variables.id),
            })
            // Invalidate TV show seasons if we have the tv_show_id
            if (data.tv_show_id) {
                queryClient.invalidateQueries({ queryKey: ['seasons', 'tv-show', data.tv_show_id] })
                queryClient.invalidateQueries({ queryKey: queryKeys.tvShows.seasons(data.tv_show_id) })
            }
            toast.success('Season updated successfully')
        },
        onError: (error) => {
            toast.error('Failed to update season', error.message)
        },
    })
}

