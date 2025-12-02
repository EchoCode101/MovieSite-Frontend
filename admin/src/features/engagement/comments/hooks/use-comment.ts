import { useQuery } from '@tanstack/react-query'

import { getCommentById } from '../api/comments-api'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch a single comment by ID
 */
export function useComment(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.comments.detail(id || ''),
    queryFn: () => {
      if (!id) throw new Error('Comment ID is required')
      return getCommentById(id)
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

