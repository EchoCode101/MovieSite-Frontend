import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteComment } from '../api/comments-api'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to delete a comment
 */
export function useDeleteComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.all })
      toast.success('Comment deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete comment', error.message)
    },
  })
}

