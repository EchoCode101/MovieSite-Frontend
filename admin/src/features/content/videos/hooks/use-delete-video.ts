import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteVideo } from '../api/videos-api'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to delete a video
 */
export function useDeleteVideo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteVideo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.videos.all })
      toast.success('Video deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete video', error.message)
    },
  })
}

