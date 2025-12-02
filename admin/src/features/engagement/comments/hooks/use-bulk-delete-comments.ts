import { useMutation, useQueryClient } from '@tanstack/react-query'

import { bulkDeleteComments } from '../api/comments-api'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to bulk delete comments
 */
export function useBulkDeleteComments() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (ids: string[]) => bulkDeleteComments(ids),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.all })
      toast.success(`${data.deletedCount} comment(s) deleted successfully`)
    },
    onError: (error) => {
      toast.error('Failed to delete comments', error.message)
    },
  })
}

