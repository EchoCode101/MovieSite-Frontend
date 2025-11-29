import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addToWatchlist, removeFromWatchlist, getWatchlist } from '../api/watch'
import type { AddToWatchlistData, WatchlistItem, WatchlistResponse } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from 'sonner'

/**
 * Hook to fetch watchlist
 * 
 * @param params - Query parameters
 * @returns Query hook for watchlist
 */
export const useWatchlist = (params?: {
  profile_id?: string
  target_type?: 'movie' | 'tvshow' | 'episode'
  page?: number
  limit?: number
}) => {
  return useQuery({
    queryKey: queryKeys.watchlist.list(params),
    queryFn: () => getWatchlist(params),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

/**
 * Hook to add item to watchlist
 * 
 * @returns Mutation hook for adding to watchlist
 */
export const useAddToWatchlist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AddToWatchlistData) => addToWatchlist(data),
    onMutate: async (newItem) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.watchlist.all })

      // Snapshot previous values for all watchlist queries
      const previousWatchlists = new Map()
      queryClient.getQueryCache().findAll({ queryKey: queryKeys.watchlist.all }).forEach((query) => {
        previousWatchlists.set(query.queryKey, query.state.data)
      })

      // Optimistically update all matching watchlist queries
      queryClient.getQueryCache().findAll({ queryKey: queryKeys.watchlist.all }).forEach((query) => {
        const oldData = query.state.data as WatchlistResponse | undefined
        if (oldData) {
          const optimisticItem: WatchlistItem = {
            id: `temp-${Date.now()}`,
            user_id: '',
            profile_id: newItem.profile_id,
            target_type: newItem.target_type,
            target_id: newItem.target_id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
          queryClient.setQueryData<WatchlistResponse>(query.queryKey, {
            ...oldData,
            items: [...oldData.items, optimisticItem],
            totalItems: oldData.totalItems + 1,
          })
        }
      })

      return { previousWatchlists }
    },
    onSuccess: (newItem) => {
      // Update cache with server response
      queryClient.getQueryCache().findAll({ queryKey: queryKeys.watchlist.all }).forEach((query) => {
        const oldData = query.state.data as WatchlistResponse | undefined
        if (oldData) {
          queryClient.setQueryData<WatchlistResponse>(query.queryKey, {
            ...oldData,
            items: oldData.items.map((item) => (item.id.startsWith('temp-') ? newItem : item)),
          })
        }
      })
      // Invalidate for consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.watchlist.all, refetchType: 'none' })
      toast.success('Added to watchlist!')
    },
    onError: (error, _, context) => {
      // Rollback on error
      if (context?.previousWatchlists) {
        context.previousWatchlists.forEach((data, key) => {
          queryClient.setQueryData(key, data)
        })
      }
      toast.error(error.message || 'Failed to add to watchlist')
    },
  })
}

/**
 * Hook to remove item from watchlist
 * 
 * @returns Mutation hook for removing from watchlist
 */
export const useRemoveFromWatchlist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AddToWatchlistData) => removeFromWatchlist(data),
    onMutate: async (removeData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.watchlist.all })

      // Snapshot previous values
      const previousWatchlists = new Map()
      queryClient.getQueryCache().findAll({ queryKey: queryKeys.watchlist.all }).forEach((query) => {
        previousWatchlists.set(query.queryKey, query.state.data)
      })

      // Optimistically update all matching watchlist queries
      queryClient.getQueryCache().findAll({ queryKey: queryKeys.watchlist.all }).forEach((query) => {
        const oldData = query.state.data as WatchlistResponse | undefined
        if (oldData) {
          queryClient.setQueryData<WatchlistResponse>(query.queryKey, {
            ...oldData,
            items: oldData.items.filter(
              (item) =>
                !(
                  item.profile_id === removeData.profile_id &&
                  item.target_type === removeData.target_type &&
                  item.target_id === removeData.target_id
                )
            ),
            totalItems: Math.max(0, oldData.totalItems - 1),
          })
        }
      })

      return { previousWatchlists }
    },
    onSuccess: () => {
      // Invalidate for consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.watchlist.all, refetchType: 'none' })
      toast.success('Removed from watchlist!')
    },
    onError: (error, _, context) => {
      // Rollback on error
      if (context?.previousWatchlists) {
        context.previousWatchlists.forEach((data, key) => {
          queryClient.setQueryData(key, data)
        })
      }
      toast.error(error.message || 'Failed to remove from watchlist')
    },
  })
}

