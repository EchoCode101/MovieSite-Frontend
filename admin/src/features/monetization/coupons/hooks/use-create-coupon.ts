import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import { createCoupon } from '../api/coupons-api'
import type { CreateCouponPayload, Coupon } from '../types'

/**
 * Hook to create a new coupon
 */
export function useCreateCoupon() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateCouponPayload) => createCoupon(payload),
    onSuccess: (coupon: Coupon) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.coupons.all })
      if (coupon.id || coupon._id) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.coupons.detail(coupon.id || coupon._id || ''),
        })
      }
      toast.success('Coupon created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create coupon', error.message)
    },
  })
}


