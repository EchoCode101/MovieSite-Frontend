import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteReview } from '../api/reviews-api'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to delete a review
 */
export function useDeleteReview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.all })
      toast.success('Review deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete review', error.message)
    },
  })
}

