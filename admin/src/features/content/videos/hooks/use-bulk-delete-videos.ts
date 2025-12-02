import { useMutation, useQueryClient } from '@tanstack/react-query'

import { bulkDeleteVideos } from '../api/videos-api'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to bulk delete videos
 */
export function useBulkDeleteVideos() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (ids: string[]) => bulkDeleteVideos(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.videos.all })
      toast.success('Videos deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete videos', error.message)
    },
  })
}

