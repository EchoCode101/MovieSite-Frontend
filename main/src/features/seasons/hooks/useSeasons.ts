import { useQuery } from '@tanstack/react-query'
import { getSeasonsByTVShow, getSeasonById } from '../api/seasons'
import { queryKeys } from '@/lib/query-keys'

export const useSeasonsByTVShow = (tvShowId: string) => {
  return useQuery({
    queryKey: queryKeys.seasons.byTvShow(tvShowId),
    queryFn: () => getSeasonsByTVShow(tvShowId),
    enabled: !!tvShowId,
    staleTime: 1000 * 60 * 5,
  })
}

export const useSeason = (id: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: queryKeys.seasons.detail(id),
    queryFn: () => getSeasonById(id),
    enabled: options?.enabled !== false && !!id,
    staleTime: 1000 * 60 * 5,
    retry: false, // Don't retry on errors
  })
}

