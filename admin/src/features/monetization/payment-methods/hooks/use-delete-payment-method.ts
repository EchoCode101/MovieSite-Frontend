import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import { deletePaymentMethod } from '../api/payment-methods-api'

/**
 * Hook to delete a payment method
 */
export function useDeletePaymentMethod() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deletePaymentMethod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.paymentMethods.all })
      toast.success('Payment method deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete payment method', error.message)
    },
  })
}


