import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteChannel } from '../api/channels-api'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to delete a channel
 */
export function useDeleteChannel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteChannel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.channels.all })
      toast.success('Channel deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete channel', error.message)
    },
  })
}

