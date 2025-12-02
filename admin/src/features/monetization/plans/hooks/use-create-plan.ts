import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import { createPlan } from '../api/plans-api'
import type { CreatePlanPayload, Plan } from '../types'

/**
 * Hook to create a new subscription plan
 */
export function useCreatePlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreatePlanPayload) => createPlan(payload),
    onSuccess: (plan: Plan) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plans.all })
      toast.success('Plan created successfully')
      if (plan.id || plan._id) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.plans.detail(plan.id || plan._id || ''),
        })
      }
    },
    onError: (error) => {
      toast.error('Failed to create plan', error.message)
    },
  })
}


