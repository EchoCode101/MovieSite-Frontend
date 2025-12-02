import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateUserSubscription } from '../api/users-api'
import type { UpdateUserSubscriptionPayload } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to update a user's subscription plan
 */
export function useUpdateUserSubscription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateUserSubscriptionPayload) =>
      updateUserSubscription(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.detail(variables.userId),
      })
      toast.success('Subscription plan updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update subscription', error.message)
    },
  })
}

