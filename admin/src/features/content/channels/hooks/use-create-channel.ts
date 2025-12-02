import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createChannel } from '../api/channels-api'
import type { CreateChannelPayload } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to create a new channel
 */
export function useCreateChannel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateChannelPayload) => createChannel(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.channels.all })
      toast.success('Channel created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create channel', error.message)
    },
  })
}

