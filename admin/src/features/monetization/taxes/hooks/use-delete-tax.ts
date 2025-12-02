import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import { deleteTax } from '../api/taxes-api'

/**
 * Hook to delete a tax
 */
export function useDeleteTax() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteTax(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.taxes.all })
      toast.success('Tax deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete tax', error.message)
    },
  })
}


