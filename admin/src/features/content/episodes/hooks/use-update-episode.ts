import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateEpisode } from '../api/episodes-api'
import type { UpdateEpisodePayload, EpisodeDetail } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to update an existing episode
 */
export function useUpdateEpisode() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: UpdateEpisodePayload }) =>
            updateEpisode(id, payload),
        onSuccess: async (data: EpisodeDetail, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.episodes.all })
            queryClient.invalidateQueries({
                queryKey: queryKeys.episodes.detail(variables.id),
            })
            if (data.season_id) {
                queryClient.invalidateQueries({ queryKey: queryKeys.episodes.bySeason(data.season_id) })
            }
            toast.success('Episode updated successfully')
        },
        onError: (error) => {
            toast.error('Failed to update episode', error.message)
        },
    })
}

