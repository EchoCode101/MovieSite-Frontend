import { useQuery } from '@tanstack/react-query'
import { getPlans, getPlanById } from '../api/plans'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch subscription plans
 * 
 * @param params - Query parameters
 * @returns Query hook for plans
 */
export const usePlans = (params?: {
  is_active?: boolean
  is_featured?: boolean
  billing_cycle?: 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  page?: number
  limit?: number
}) => {
  return useQuery({
    queryKey: queryKeys.subscriptions.plans.lists(params),
    queryFn: () => getPlans(params),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

/**
 * Hook to fetch a single plan
 * 
 * @param id - Plan ID
 * @returns Query hook for plan
 */
export const usePlan = (id: string) => {
  return useQuery({
    queryKey: queryKeys.subscriptions.plans.detail(id),
    queryFn: () => getPlanById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

