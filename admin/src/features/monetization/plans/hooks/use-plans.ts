import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'

import { getPlans } from '../api/plans-api'
import type { PlanListParams, PlanListResponse } from '../types'

/**
 * Hook to fetch paginated list of subscription plans
 */
export function usePlans(params: PlanListParams) {
  return useQuery<PlanListResponse>({
    queryKey: queryKeys.plans.list(params),
    queryFn: () => getPlans(params),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}


