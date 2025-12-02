import { useQuery } from '@tanstack/react-query'

import { validateCoupon } from '../api/coupons-api'
import type { ValidateCouponResponse } from '../types'

/**
 * Hook to validate a coupon code for an optional plan
 */
export function useValidateCoupon(code?: string, planId?: string) {
  return useQuery<ValidateCouponResponse>({
    queryKey: ['coupons', 'validate', code, planId],
    queryFn: () => {
      if (!code) {
        return Promise.reject(new Error('Coupon code is required'))
      }
      return validateCoupon(code, planId)
    },
    enabled: Boolean(code),
    staleTime: 0,
  })
}


