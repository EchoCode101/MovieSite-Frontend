import { useQuery } from '@tanstack/react-query'

import { getReviews } from '../api/reviews-api'
import type { ReviewListParams } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch paginated list of reviews
 */
export function useReviews(params: ReviewListParams) {
  return useQuery({
    queryKey: queryKeys.reviews.list(params),
    queryFn: () => getReviews(params),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

