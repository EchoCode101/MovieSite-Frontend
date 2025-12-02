import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateChannel } from '../api/channels-api'
import type { UpdateChannelPayload } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to update an existing channel
 */
export function useUpdateChannel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateChannelPayload }) =>
      updateChannel(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.channels.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.channels.detail(variables.id) })
      toast.success('Channel updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update channel', error.message)
    },
  })
}

