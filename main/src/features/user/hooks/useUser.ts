import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUserVideos, saveVideoUrl, fetchVideoUrl, updateUserProfile, updateUserSubscription } from '../api/user'
import { toast } from 'sonner'
import type { User } from '@/features/auth/types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch user's saved videos
 * 
 * @param params - Pagination parameters
 * @returns Query hook for user videos
 */
export const useUserVideos = (params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: queryKeys.userVideos.list(params),
    queryFn: () => getUserVideos(params),
  })
}

/**
 * Hook to save a video URL
 * 
 * @returns Mutation hook for saving video
 */
export const useSaveVideo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveVideoUrl,
    onSuccess: () => {
      toast.success('Video saved successfully!')
      queryClient.invalidateQueries({ queryKey: queryKeys.userVideos.all })
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to save video')
    },
  })
}

/**
 * Hook to fetch video URL by video ID
 * 
 * @param videoId - Video ID
 * @returns Query hook for video URL
 */
export const useFetchVideoUrl = (videoId: string) => {
  return useQuery({
    queryKey: queryKeys.videoUrl.detail(videoId),
    queryFn: () => fetchVideoUrl(videoId),
    enabled: !!videoId,
  })
}

/**
 * Hook to update user profile
 * 
 * @returns Mutation hook for updating user profile with optimistic updates
 */
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updatedData) => {
      // Update user cache immediately with new data for instant UI update
      queryClient.setQueryData(queryKeys.user.all, (oldData: User | undefined) => {
        if (!oldData) return updatedData
        return {
          ...oldData,
          ...updatedData,
        }
      })
      // Invalidate to refetch and ensure consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all, refetchType: 'none' })
      toast.success('Profile updated successfully!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update profile')
    },
  })
}

// Alias for backward compatibility
export const useUpdateProfile = useUpdateUserProfile

/**
 * Hook to update user subscription plan
 * 
 * @returns Mutation hook for updating subscription plan
 */
export const useUpdateSubscription = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateUserSubscription,
    onSuccess: () => {
      toast.success('Subscription plan updated successfully!')
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions.active() })
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update subscription plan')
    },
  })
}
