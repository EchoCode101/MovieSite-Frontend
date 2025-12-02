import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'

import { getPlanById } from '../api/plans-api'
import type { Plan } from '../types'

/**
 * Hook to fetch a single subscription plan by ID
 */
export function usePlan(id?: string) {
  return useQuery<Plan>({
    queryKey: queryKeys.plans.detail(id || ''),
    queryFn: () => {
      if (!id) {
        return Promise.reject(new Error('Plan ID is required'))
      }
      return getPlanById(id)
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}


