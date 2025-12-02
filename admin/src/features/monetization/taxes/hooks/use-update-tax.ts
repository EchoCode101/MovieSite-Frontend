import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import { updateTax } from '../api/taxes-api'
import type { UpdateTaxPayload } from '../types'

interface UpdateTaxVariables {
  id: string
  payload: UpdateTaxPayload
}

/**
 * Hook to update an existing tax
 */
export function useUpdateTax() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: UpdateTaxVariables) => updateTax(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.taxes.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.taxes.detail(variables.id),
      })
      toast.success('Tax updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update tax', error.message)
    },
  })
}


