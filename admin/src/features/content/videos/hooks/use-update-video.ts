import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateVideo } from '../api/videos-api'
import type { UpdateVideoPayload } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to update an existing video
 */
export function useUpdateVideo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateVideoPayload }) =>
      updateVideo(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.videos.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.videos.detail(variables.id),
      })
      toast.success('Video updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update video', error.message)
    },
  })
}

