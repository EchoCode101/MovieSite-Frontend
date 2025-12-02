import { useQuery } from '@tanstack/react-query'

import { getSeasonsByTvShow } from '../api/seasons-api'
import type { SeasonDetail } from '../types'

/**
 * Hook to fetch seasons by TV show
 */
export function useSeasonsByTvShow(tvShowId: string | undefined) {
    return useQuery<SeasonDetail[]>({
        queryKey: ['seasons', 'tv-show', tvShowId],
        queryFn: () => {
            if (!tvShowId) throw new Error('TV show ID is required')
            return getSeasonsByTvShow(tvShowId)
        },
        enabled: !!tvShowId,
        staleTime: 1000 * 60 * 2, // 2 minutes
    })
}

