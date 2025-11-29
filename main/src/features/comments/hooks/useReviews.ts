import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchReviewsByVideo,
  fetchReviewsByTarget,
  createReview,
  updateReview,
  deleteReview,
} from '../api/reviews'
import type { CreateReviewData, UpdateReviewData, Review } from '../types'
import { toast } from 'sonner'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch reviews for a video
 * 
 * @param videoId - Video ID
 * @param options - Optional query options
 * @returns Query hook for reviews
 */
export const useReviews = (videoId: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: queryKeys.reviews.byVideo(videoId),
    queryFn: () => fetchReviewsByVideo(videoId),
    enabled: options?.enabled !== false && !!videoId,
  })
}

/**
 * Hook to fetch reviews by target type and ID
 * 
 * @param targetType - Target type (video, movie, tvshow, episode)
 * @param targetId - Target ID
 * @param options - Optional query options
 * @returns Query hook for reviews
 */
export const useReviewsByTarget = (targetType: 'video' | 'movie' | 'tvshow' | 'episode', targetId: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: queryKeys.reviews.byTarget(targetType, targetId),
    queryFn: () => fetchReviewsByTarget(targetType, targetId),
    enabled: options?.enabled !== false && !!targetId && !!targetType,
  })
}

/**
 * Hook to create a review
 * 
 * @returns Mutation hook for creating review with optimistic updates
 */
export const useCreateReview = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateReviewData) => createReview(data),
    onMutate: async (variables) => {
      // Cancel outgoing refetches for both video and target queries
      const queryKey = variables.target_type === 'video' 
        ? queryKeys.reviews.byVideo(variables.target_id)
        : queryKeys.reviews.byTarget(variables.target_type, variables.target_id)
      await queryClient.cancelQueries({ queryKey })

      // Snapshot previous value
      const previousReviews = queryClient.getQueryData<Review[]>(queryKey)

      // Optimistically add review
      if (previousReviews) {
        const optimisticReview: Review = {
          _id: `temp-${Date.now()}`,
          video_id: variables.target_id, // Keep for backward compatibility
          member_id: {
            _id: '',
            username: '',
          },
          review_content: variables.content,
          rating: variables.rating,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        queryClient.setQueryData<Review[]>(queryKey, [...previousReviews, optimisticReview])
      }

      return { previousReviews, queryKey }
    },
    onSuccess: (newReview, variables) => {
      // Update with server response
      const queryKey = variables.target_type === 'video' 
        ? queryKeys.reviews.byVideo(variables.target_id)
        : queryKeys.reviews.byTarget(variables.target_type, variables.target_id)
      
      queryClient.setQueryData<Review[]>(queryKey, (old) => {
        if (!old) return [newReview]
        // Replace optimistic review with real one
        return old.map((r) => (r._id.startsWith('temp-') ? newReview : r))
      })
      // Invalidate for consistency
      queryClient.invalidateQueries({ 
        queryKey,
        refetchType: 'none'
      })
      toast.success('Review submitted!')
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousReviews && context?.queryKey) {
        queryClient.setQueryData(context.queryKey, context.previousReviews)
      }
      toast.error('Failed to submit review')
    },
  })
}

/**
 * Hook to update a review
 * 
 * @returns Mutation hook for updating review with optimistic updates
 */
export const useUpdateReview = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ reviewId, data }: { reviewId: string; data: UpdateReviewData }) =>
      updateReview(reviewId, data),
    onMutate: async ({ reviewId, data }) => {
      // Find which query this review belongs to by checking all review queries
      const allQueries = queryClient.getQueryCache().findAll({ 
        queryKey: queryKeys.reviews.all 
      })
      
      let foundQueryKey: readonly unknown[] | undefined
      let previousReviews: Review[] | undefined
      
      for (const query of allQueries) {
        const reviews = query.state.data as Review[] | undefined
        if (reviews && reviews.some(r => r._id === reviewId)) {
          foundQueryKey = query.queryKey
          previousReviews = reviews
          break
        }
      }
      
      if (foundQueryKey) {
        // Cancel outgoing refetches
        await queryClient.cancelQueries({ queryKey: foundQueryKey })
        
        // Optimistically update
        queryClient.setQueryData<Review[]>(foundQueryKey, (old) => {
          if (!old) return []
          return old.map(review =>
            review._id === reviewId
              ? { ...review, review_content: data.content || review.review_content, rating: data.rating ?? review.rating, updatedAt: new Date().toISOString() }
              : review
          )
        })
      }
      
      return { previousReviews, foundQueryKey }
    },
    onSuccess: (updatedReview, variables, context) => {
      // Update with server response
      if (context?.foundQueryKey) {
        queryClient.setQueryData<Review[]>(context.foundQueryKey, (old) => {
          if (!old) return [updatedReview]
          return old.map((r) => (r._id === updatedReview._id ? updatedReview : r))
        })
        // Invalidate for consistency
        queryClient.invalidateQueries({ 
          queryKey: context.foundQueryKey,
          refetchType: 'none'
        })
      } else {
        // Fallback: try to find the query key from the review
        const allQueries = queryClient.getQueryCache().findAll({ 
          queryKey: queryKeys.reviews.all 
        })
        for (const query of allQueries) {
          const reviews = query.state.data as Review[] | undefined
          if (reviews && reviews.some(r => r._id === updatedReview._id)) {
            queryClient.setQueryData<Review[]>(query.queryKey, (old) => {
              if (!old) return [updatedReview]
              return old.map((r) => (r._id === updatedReview._id ? updatedReview : r))
            })
            queryClient.invalidateQueries({
              queryKey: query.queryKey,
              refetchType: 'none',
            })
            break
          }
        }
      }
      toast.success('Review updated!')
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousReviews && context?.foundQueryKey) {
        queryClient.setQueryData(context.foundQueryKey, context.previousReviews)
      }
      toast.error('Failed to update review')
    },
  })
}

/**
 * Hook to delete a review
 * 
 * @returns Mutation hook for deleting review with optimistic updates
 */
export const useDeleteReview = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId),
    onMutate: async (reviewId) => {
      // Find which query this review belongs to by checking all review queries
      const allQueries = queryClient.getQueryCache().findAll({ 
        queryKey: queryKeys.reviews.all 
      })
      
      let foundQueryKey: readonly unknown[] | undefined
      let previousReviews: Review[] | undefined
      
      for (const query of allQueries) {
        const reviews = query.state.data as Review[] | undefined
        if (reviews && reviews.some(r => r._id === reviewId)) {
          foundQueryKey = query.queryKey
          previousReviews = reviews
          break
        }
      }

      if (foundQueryKey) {
        // Cancel outgoing refetches
        await queryClient.cancelQueries({ queryKey: foundQueryKey })

        // Optimistically remove review
        queryClient.setQueryData<Review[]>(
          foundQueryKey,
          (old) => {
            if (!old) return []
            return old.filter((r) => r._id !== reviewId)
          }
        )
      }

      return { previousReviews, foundQueryKey }
    },
    onSuccess: (_, reviewId, context) => {
      // Invalidate for consistency
      if (context?.foundQueryKey) {
        queryClient.invalidateQueries({ 
          queryKey: context.foundQueryKey,
          refetchType: 'none'
        })
      }
      toast.success('Review deleted!')
    },
    onError: (error, reviewId, context) => {
      // Rollback on error
      if (context?.previousReviews && context?.foundQueryKey) {
        queryClient.setQueryData(
          context.foundQueryKey,
          context.previousReviews
        )
      }
      toast.error('Failed to delete review')
    },
  })
}
