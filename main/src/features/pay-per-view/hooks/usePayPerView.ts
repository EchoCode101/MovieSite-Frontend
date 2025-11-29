import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getPPVPurchases, purchasePPV, checkPPVAccess } from '../api/pay-per-view'
import type { PurchasePPVData } from '../types'
import { toast } from 'sonner'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch user's PPV purchases
 * 
 * @returns Query hook for PPV purchases
 */
export const usePPVPurchases = () => {
  return useQuery({
    queryKey: queryKeys.payPerView.purchases(),
    queryFn: getPPVPurchases,
    staleTime: 1000 * 60 * 5,
  })
}

/**
 * Hook to purchase pay-per-view content
 * 
 * @returns Mutation hook for PPV purchase
 */
export const usePurchasePPV = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PurchasePPVData) => purchasePPV(data),
    onSuccess: () => {
      toast.success('Purchase successful! You can now watch this content.')
      queryClient.invalidateQueries({ queryKey: queryKeys.payPerView.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all })
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to complete purchase')
    },
  })
}

/**
 * Hook to check PPV access for content
 * 
 * @param targetType - Type of target (movie, tvshow, episode)
 * @param targetId - ID of the target
 * @returns Query hook for PPV access check
 */
export const usePPVAccess = (targetType: string, targetId: string) => {
  return useQuery({
    queryKey: queryKeys.payPerView.access(targetType, targetId),
    queryFn: () => checkPPVAccess(targetType, targetId),
    enabled: !!targetType && !!targetId,
    staleTime: 1000 * 60 * 2,
  })
}

