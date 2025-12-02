import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'

import { getPaymentMethods } from '../api/payment-methods-api'
import type { PaymentMethodListResponse } from '../types'

/**
 * Hook to fetch all payment methods (admin)
 */
export function usePaymentMethods() {
  return useQuery<PaymentMethodListResponse>({
    queryKey: queryKeys.paymentMethods.all,
    queryFn: () => getPaymentMethods(),
    staleTime: 1000 * 60 * 2,
  })
}


