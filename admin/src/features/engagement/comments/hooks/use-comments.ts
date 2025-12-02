import { useQuery } from '@tanstack/react-query'

import { getComments } from '../api/comments-api'
import type { CommentListParams } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch paginated list of comments
 */
export function useComments(params: CommentListParams) {
  return useQuery({
    queryKey: queryKeys.comments.list(params),
    queryFn: () => getComments(params),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

