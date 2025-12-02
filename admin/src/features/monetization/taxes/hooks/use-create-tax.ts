import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import { createTax } from '../api/taxes-api'
import type { CreateTaxPayload, Tax } from '../types'

/**
 * Hook to create a new tax
 */
export function useCreateTax() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateTaxPayload) => createTax(payload),
    onSuccess: (tax: Tax) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.taxes.all })
      if (tax.id || tax._id) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.taxes.detail(tax.id || tax._id || ''),
        })
      }
      toast.success('Tax created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create tax', error.message)
    },
  })
}


