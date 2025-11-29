import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toggleLikeDislike, getLikeDislikeCounts, getUserReaction } from '../api/likes'
import type { ToggleLikeDislikeData, LikeDislikeResponse, LikeDislikeCounts } from '../types'
import { toast } from 'sonner'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch like/dislike counts for a target
 * 
 * @param targetType - Type of target (video, comment, review)
 * @param targetId - ID of the target
 * @returns Query hook for like/dislike counts
 */
export const useLikeDislikeCounts = (targetType: string, targetId: string, options?: { enabled?: boolean }) => {
  // Don't fetch for temp IDs (optimistic updates)
  const isTempId = targetId.startsWith('temp-');
  return useQuery({
    queryKey: queryKeys.likeDislikeCounts.detail(targetType, targetId),
    queryFn: () => getLikeDislikeCounts(targetType, targetId),
    enabled: options?.enabled !== false && !!targetId && !!targetType && !isTempId,
  })
}

/**
 * Hook to fetch user's reaction for a target
 * 
 * @param targetType - Type of target (video, comment, review)
 * @param targetId - ID of the target
 * @param options - Optional query options
 * @returns Query hook for user reaction
 */
export const useUserReaction = (targetType: string, targetId: string, options?: { enabled?: boolean }) => {
  // Don't fetch for temp IDs (optimistic updates)
  const isTempId = targetId.startsWith('temp-');
  return useQuery({
    queryKey: queryKeys.userReaction.detail(targetType, targetId),
    queryFn: () => getUserReaction(targetType, targetId),
    enabled: options?.enabled !== false && !!targetId && !!targetType && !isTempId,
  })
}

/**
 * Hook to toggle like/dislike on a target
 * 
 * @returns Mutation hook for toggling like/dislike with optimistic updates
 */
export const useToggleLikeDislike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ToggleLikeDislikeData) => toggleLikeDislike(data),
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.likeDislikeCounts.detail(variables.target_type, variables.target_id)
      })
      await queryClient.cancelQueries({
        queryKey: queryKeys.userReaction.detail(variables.target_type, variables.target_id)
      })

      // Snapshot previous values
      const previousCounts = queryClient.getQueryData<LikeDislikeCounts>(
        queryKeys.likeDislikeCounts.detail(variables.target_type, variables.target_id)
      )
      const previousReaction = queryClient.getQueryData<{ hasReacted: boolean; isLike: boolean | null } | null>(
        queryKeys.userReaction.detail(variables.target_type, variables.target_id)
      )

      // Optimistically update counts
      if (previousCounts) {
        const newCounts = { ...previousCounts }
        if (previousReaction && previousReaction.hasReacted && previousReaction.isLike !== null) {
          // Removing existing reaction
          if (previousReaction.isLike === true) {
            newCounts.likes = Math.max(0, newCounts.likes - 1)
          } else if (previousReaction.isLike === false) {
            newCounts.dislikes = Math.max(0, newCounts.dislikes - 1)
          }
        }
        // Add new reaction (only if not removing)
        // Check if we're toggling the same reaction (which means remove)
        const isRemoving = previousReaction && previousReaction.hasReacted &&
          previousReaction.isLike === variables.is_like
        if (!isRemoving) {
          if (variables.is_like) {
            newCounts.likes += 1
            // If switching from dislike to like, decrease dislikes
            if (previousReaction && previousReaction.isLike === false) {
              newCounts.dislikes = Math.max(0, newCounts.dislikes - 1)
            }
          } else {
            newCounts.dislikes += 1
            // If switching from like to dislike, decrease likes
            if (previousReaction && previousReaction.isLike === true) {
              newCounts.likes = Math.max(0, newCounts.likes - 1)
            }
          }
        }
        queryClient.setQueryData(
          queryKeys.likeDislikeCounts.detail(variables.target_type, variables.target_id),
          newCounts
        )
      }

      // Optimistically update user reaction
      // Check if we're removing (same reaction clicked again)
      const isRemoving = previousReaction && previousReaction.hasReacted &&
        previousReaction.isLike === variables.is_like
      if (isRemoving) {
        queryClient.setQueryData(
          queryKeys.userReaction.detail(variables.target_type, variables.target_id),
          { hasReacted: false, isLike: null }
        )
      } else {
        queryClient.setQueryData(
          queryKeys.userReaction.detail(variables.target_type, variables.target_id),
          { hasReacted: true, isLike: variables.is_like }
        )
      }

      return { previousCounts, previousReaction }
    },
    onSuccess: (result: LikeDislikeResponse, variables) => {
      // Update user reaction based on server response
      if (result.removed) {
        queryClient.setQueryData(
          queryKeys.userReaction.detail(variables.target_type, variables.target_id),
          { hasReacted: false, isLike: null }
        )
        toast.success('Reaction removed')
      } else if (typeof result.is_like === 'boolean') {
        // Use the is_like value from server response
        queryClient.setQueryData(
          queryKeys.userReaction.detail(variables.target_type, variables.target_id),
          { hasReacted: true, isLike: result.is_like }
        )
        toast.success(result.is_like ? 'Liked!' : 'Disliked!')
      } else {
        // Fallback to variables if result doesn't have is_like
        queryClient.setQueryData(
          queryKeys.userReaction.detail(variables.target_type, variables.target_id),
          { hasReacted: true, isLike: variables.is_like }
        )
        toast.success(variables.is_like ? 'Liked!' : 'Disliked!')
      }

      // Refetch counts to get updated values from server
      queryClient.invalidateQueries({
        queryKey: queryKeys.likeDislikeCounts.detail(variables.target_type, variables.target_id),
        refetchType: 'active' // Refetch active queries to update UI
      })

      // Refetch user reaction to ensure consistency
      queryClient.invalidateQueries({
        queryKey: queryKeys.userReaction.detail(variables.target_type, variables.target_id),
        refetchType: 'active'
      })

      // Also invalidate the list queries that might show like counts
      if (variables.target_type === 'comment') {
        queryClient.invalidateQueries({ queryKey: queryKeys.comments.all })
      } else if (variables.target_type === 'review') {
        queryClient.invalidateQueries({ queryKey: queryKeys.reviews.all })
      } else if (variables.target_type === 'video') {
        queryClient.invalidateQueries({ queryKey: queryKeys.videos.all })
      } else if (variables.target_type === 'episode') {
        queryClient.invalidateQueries({ queryKey: queryKeys.episodes.all })
      }
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousCounts) {
        queryClient.setQueryData(
          queryKeys.likeDislikeCounts.detail(variables.target_type, variables.target_id),
          context.previousCounts
        )
      }
      if (context?.previousReaction !== undefined) {
        queryClient.setQueryData(
          queryKeys.userReaction.detail(variables.target_type, variables.target_id),
          context.previousReaction
        )
      }
      toast.error('Failed to update reaction')
    },
  })
}
