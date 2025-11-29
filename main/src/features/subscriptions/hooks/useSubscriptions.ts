import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSubscriptions, getActiveSubscription, createSubscription, cancelSubscription } from '../api/subscriptions'
import type { CreateSubscriptionData, CancelSubscriptionData, Subscription } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from 'sonner'

/**
 * Hook to fetch user subscriptions
 * 
 * @returns Query hook for subscriptions
 */
export const useSubscriptions = () => {
  return useQuery({
    queryKey: queryKeys.subscriptions.list(),
    queryFn: getSubscriptions,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Hook to fetch active subscription
 * 
 * @returns Query hook for active subscription
 */
export const useActiveSubscription = () => {
  return useQuery({
    queryKey: queryKeys.subscriptions.active(),
    queryFn: getActiveSubscription,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Hook to create subscription
 * 
 * @returns Mutation hook for subscription creation
 */
export const useCreateSubscription = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateSubscriptionData) => createSubscription(data),
    onMutate: async (newSubscription) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.subscriptions.all })

      // Snapshot previous values
      const previousSubscriptions = queryClient.getQueryData<Subscription[]>(queryKeys.subscriptions.list())
      const previousActive = queryClient.getQueryData<Subscription | null>(queryKeys.subscriptions.active())

      // Optimistically update cache
      if (previousSubscriptions) {
        // Will be replaced by server response
        const optimisticSubscription: Subscription = {
          id: `temp-${Date.now()}`,
          user_id: '',
          plan_id: newSubscription.plan_id,
          status: 'pending',
          started_at: new Date().toISOString(),
          ends_at: new Date().toISOString(),
          base_amount: 0,
          tax_amount: 0,
          discount_amount: 0,
          total_amount: 0,
          currency: 'USD',
          payment_status: 'pending',
          is_manual: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        queryClient.setQueryData<Subscription[]>(queryKeys.subscriptions.list(), [...previousSubscriptions, optimisticSubscription])
      }

      return { previousSubscriptions, previousActive }
    },
    onSuccess: (newSubscription) => {
      // Update cache with server response
      queryClient.setQueryData<Subscription[]>(queryKeys.subscriptions.list(), (old) => {
        if (!old) return [newSubscription]
        return old.map((s) => (s.id.startsWith('temp-') ? newSubscription : s))
      })
      // Update active subscription if this is active
      if (newSubscription.status === 'active') {
        queryClient.setQueryData<Subscription>(queryKeys.subscriptions.active(), newSubscription)
      }
      // Invalidate for consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions.all, refetchType: 'none' })
      toast.success('Subscription created successfully!')
    },
    onError: (error, _, context) => {
      // Rollback on error
      if (context?.previousSubscriptions) {
        queryClient.setQueryData(queryKeys.subscriptions.list(), context.previousSubscriptions)
      }
      if (context?.previousActive) {
        queryClient.setQueryData(queryKeys.subscriptions.active(), context.previousActive)
      }
      toast.error(error.message || 'Failed to create subscription')
    },
  })
}

/**
 * Hook to cancel subscription
 * 
 * @returns Mutation hook for subscription cancellation
 */
export const useCancelSubscription = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CancelSubscriptionData) => cancelSubscription(data),
    onMutate: async (cancelData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.subscriptions.all })

      // Snapshot previous values
      const previousSubscriptions = queryClient.getQueryData<Subscription[]>(queryKeys.subscriptions.list())
      const previousActive = queryClient.getQueryData<Subscription | null>(queryKeys.subscriptions.active())

      // Optimistically update cache
      if (previousSubscriptions) {
        queryClient.setQueryData<Subscription[]>(queryKeys.subscriptions.list(), (old) => {
          if (!old) return old
          return old.map((s) =>
            s.id === cancelData.subscription_id
              ? { ...s, status: 'cancelled' as const, cancelled_at: new Date().toISOString() }
              : s
          )
        })
      }
      if (previousActive && previousActive.id === cancelData.subscription_id) {
        queryClient.setQueryData<Subscription | null>(queryKeys.subscriptions.active(), null)
      }

      return { previousSubscriptions, previousActive }
    },
    onSuccess: (cancelledSubscription) => {
      // Update cache with server response
      queryClient.setQueryData<Subscription[]>(queryKeys.subscriptions.list(), (old) => {
        if (!old) return [cancelledSubscription]
        return old.map((s) => (s.id === cancelledSubscription.id ? cancelledSubscription : s))
      })
      queryClient.setQueryData<Subscription | null>(queryKeys.subscriptions.active(), null)
      // Invalidate for consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions.all, refetchType: 'none' })
      toast.success('Subscription cancelled successfully!')
    },
    onError: (error, _, context) => {
      // Rollback on error
      if (context?.previousSubscriptions) {
        queryClient.setQueryData(queryKeys.subscriptions.list(), context.previousSubscriptions)
      }
      if (context?.previousActive !== undefined) {
        queryClient.setQueryData(queryKeys.subscriptions.active(), context.previousActive)
      }
      toast.error(error.message || 'Failed to cancel subscription')
    },
  })
}

