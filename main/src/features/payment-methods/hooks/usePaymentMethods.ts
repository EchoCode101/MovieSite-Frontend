import { useQuery } from '@tanstack/react-query'
import { getPaymentMethods } from '../api/payment-methods'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch active payment methods
 * 
 * @returns Query hook for payment methods
 */
export const usePaymentMethods = () => {
  return useQuery({
    queryKey: queryKeys.paymentMethods.all,
    queryFn: getPaymentMethods,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

