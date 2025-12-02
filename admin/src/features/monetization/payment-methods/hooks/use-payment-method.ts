import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'

import { getPaymentMethodById } from '../api/payment-methods-api'
import type { PaymentMethod } from '../types'

/**
 * Hook to fetch a single payment method by ID
 */
export function usePaymentMethod(id?: string) {
  return useQuery<PaymentMethod>({
    queryKey: queryKeys.paymentMethods.detail(id || ''),
    queryFn: () => {
      if (!id) {
        return Promise.reject(new Error('Payment method ID is required'))
      }
      return getPaymentMethodById(id)
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  })
}


