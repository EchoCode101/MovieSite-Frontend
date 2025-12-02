import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import { updatePaymentMethod } from '../api/payment-methods-api'
import type { UpdatePaymentMethodPayload } from '../types'

interface UpdatePaymentMethodVariables {
  id: string
  payload: UpdatePaymentMethodPayload
}

/**
 * Hook to update an existing payment method
 */
export function useUpdatePaymentMethod() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: UpdatePaymentMethodVariables) =>
      updatePaymentMethod(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.paymentMethods.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.paymentMethods.detail(variables.id),
      })
      toast.success('Payment method updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update payment method', error.message)
    },
  })
}


