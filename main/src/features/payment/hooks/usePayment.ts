import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateOwnSubscription } from '../api/payment'
import { toast } from 'sonner'
import type { User } from '@/features/auth/types'
import { queryKeys } from '@/lib/query-keys'

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (subscriptionPlan: string) => updateOwnSubscription(subscriptionPlan),
    onSuccess: (_, subscriptionPlan) => {
      // Update user cache immediately with new subscription plan for instant UI update
      queryClient.setQueryData(queryKeys.user.all, (oldData: User | undefined) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          subscription_plan: subscriptionPlan,
        }
      })
      // Invalidate to refetch and ensure consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all, refetchType: 'none' })
      queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions.active(), refetchType: 'none' })
      toast.success('Subscription plan updated successfully!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update subscription plan')
    },
  })
}
