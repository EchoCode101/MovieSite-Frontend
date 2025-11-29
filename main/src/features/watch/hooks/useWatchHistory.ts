import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { updateWatchProgress, getContinueWatching, removeWatchHistory } from '../api/watch'
import type { UpdateProgressData, RemoveHistoryData } from '../types'
import { toast } from 'sonner'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to update watch progress
 * 
 * @returns Mutation hook for updating progress
 */
export const useUpdateWatchProgress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateProgressData) => updateWatchProgress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.watch.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.watchHistory.all })
    },
  })
}

/**
 * Hook to get continue watching items
 * 
 * @param profile_id - Profile ID (required)
 * @param limit - Maximum number of items
 * @returns Query hook for continue watching
 */
export const useContinueWatching = (profile_id: string, limit = 20) => {
  return useQuery({
    queryKey: queryKeys.watch.continueWatching(profile_id, limit),
    queryFn: () => getContinueWatching(profile_id, limit),
    enabled: !!profile_id,
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

/**
 * Hook to remove watch history item
 * 
 * @returns Mutation hook for removing history
 */
export const useRemoveWatchHistory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RemoveHistoryData) => removeWatchHistory(data),
    onSuccess: () => {
      toast.success('Removed from watch history!')
      queryClient.invalidateQueries({ queryKey: queryKeys.watch.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.watchHistory.all })
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to remove from watch history')
    },
  })
}

