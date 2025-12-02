import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import { updatePlan } from '../api/plans-api'
import type { UpdatePlanPayload } from '../types'

interface UpdatePlanVariables {
  id: string
  payload: UpdatePlanPayload
}

/**
 * Hook to update an existing subscription plan
 */
export function useUpdatePlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: UpdatePlanVariables) =>
      updatePlan(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plans.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.plans.detail(variables.id),
      })
      toast.success('Plan updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update plan', error.message)
    },
  })
}


