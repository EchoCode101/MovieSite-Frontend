import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import { deleteCoupon } from '../api/coupons-api'

/**
 * Hook to delete a coupon
 */
export function useDeleteCoupon() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCoupon(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.coupons.all })
      toast.success('Coupon deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete coupon', error.message)
    },
  })
}


