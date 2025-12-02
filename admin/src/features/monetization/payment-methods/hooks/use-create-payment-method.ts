import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import { createPaymentMethod } from '../api/payment-methods-api'
import type { CreatePaymentMethodPayload, PaymentMethod } from '../types'

/**
 * Hook to create a new payment method
 */
export function useCreatePaymentMethod() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreatePaymentMethodPayload) =>
      createPaymentMethod(payload),
    onSuccess: (method: PaymentMethod) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.paymentMethods.all })
      if (method.id || method._id) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.paymentMethods.detail(method.id || method._id || ''),
        })
      }
      toast.success('Payment method created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create payment method', error.message)
    },
  })
}


