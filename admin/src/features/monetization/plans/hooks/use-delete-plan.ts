import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import { deletePlan } from '../api/plans-api'

/**
 * Hook to delete a subscription plan
 */
export function useDeletePlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deletePlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plans.all })
      toast.success('Plan deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete plan', error.message)
    },
  })
}


