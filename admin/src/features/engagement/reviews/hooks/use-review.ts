import { useQuery } from '@tanstack/react-query'

import { getReviewById } from '../api/reviews-api'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch a single review by ID
 */
export function useReview(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.reviews.detail(id || ''),
    queryFn: () => {
      if (!id) throw new Error('Review ID is required')
      return getReviewById(id)
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

