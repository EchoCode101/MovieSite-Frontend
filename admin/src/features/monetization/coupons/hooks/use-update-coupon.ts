import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import { updateCoupon } from '../api/coupons-api'
import type { UpdateCouponPayload } from '../types'

interface UpdateCouponVariables {
  id: string
  payload: UpdateCouponPayload
}

/**
 * Hook to update an existing coupon
 */
export function useUpdateCoupon() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: UpdateCouponVariables) =>
      updateCoupon(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.coupons.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.coupons.detail(variables.id),
      })
      toast.success('Coupon updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update coupon', error.message)
    },
  })
}


