import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'

import { getTaxById } from '../api/taxes-api'
import type { Tax } from '../types'

/**
 * Hook to fetch a single tax by ID
 */
export function useTax(id?: string) {
  return useQuery<Tax>({
    queryKey: queryKeys.taxes.detail(id || ''),
    queryFn: () => {
      if (!id) {
        return Promise.reject(new Error('Tax ID is required'))
      }
      return getTaxById(id)
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  })
}


