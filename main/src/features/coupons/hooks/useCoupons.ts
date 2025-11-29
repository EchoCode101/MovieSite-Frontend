import { useMutation } from '@tanstack/react-query'
import { validateCoupon } from '../api/coupons'
import { toast } from 'sonner'

/**
 * Hook to validate a coupon code
 * 
 * @returns Mutation hook for coupon validation
 */
export const useValidateCoupon = () => {
  return useMutation({
    mutationFn: (code: string) => validateCoupon(code),
    onSuccess: (data) => {
      if (data.is_valid) {
        toast.success(`Coupon "${code}" is valid! ${data.discount_type === 'percent' ? `${data.discount_value}%` : `$${data.discount_value}`} discount applied.`)
      } else {
        toast.error('Invalid or expired coupon code')
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to validate coupon')
    },
  })
}

