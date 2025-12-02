import { useMutation, useQueryClient } from '@tanstack/react-query'

import { bulkDeleteReviews } from '../api/reviews-api'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to bulk delete reviews
 */
export function useBulkDeleteReviews() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (ids: string[]) => bulkDeleteReviews(ids),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.all })
      toast.success(`${data.deletedCount} review(s) deleted successfully`)
    },
    onError: (error) => {
      toast.error('Failed to delete reviews', error.message)
    },
  })
}

