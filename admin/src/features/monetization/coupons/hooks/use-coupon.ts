import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'

import { getCouponById } from '../api/coupons-api'
import type { Coupon } from '../types'

/**
 * Hook to fetch a single coupon by ID
 */
export function useCoupon(id?: string) {
  return useQuery<Coupon>({
    queryKey: queryKeys.coupons.detail(id || ''),
    queryFn: () => {
      if (!id) {
        return Promise.reject(new Error('Coupon ID is required'))
      }
      return getCouponById(id)
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  })
}


