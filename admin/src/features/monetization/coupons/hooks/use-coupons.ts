import { useQuery } from '@tanstack/react-query'

import { getCoupons } from '../api/coupons-api'
import type { Coupon, CouponListParams } from '../types'

/**
 * Hook to fetch coupons with optional client-side filtering
 * (backend currently exposes only GET /api/coupons without filters)
 */
export function useCoupons(params: CouponListParams) {
  return useQuery<Coupon[]>({
    queryKey: ['coupons', 'list', params],
    queryFn: () => getCoupons(),
    select: (data) => {
      if (!data?.length) return []
      return data.filter((coupon) => {
        if (params.is_active !== undefined && coupon.is_active !== params.is_active) {
          return false
        }
        if (params.discount_type && coupon.discount_type !== params.discount_type) {
          return false
        }
        return true
      })
    },
    staleTime: 1000 * 60 * 2,
  })
}


