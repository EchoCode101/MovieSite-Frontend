import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createVideo } from '../api/videos-api'
import type { CreateVideoPayload } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to create a new video
 */
export function useCreateVideo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateVideoPayload) => createVideo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.videos.all })
      toast.success('Video created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create video', error.message)
    },
  })
}

