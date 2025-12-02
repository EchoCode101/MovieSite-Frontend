import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'

import { getTransactionById } from '../api/transactions-api'
import type { Transaction } from '../types'

/**
 * Hook to fetch a single transaction by ID
 */
export function useTransaction(id?: string) {
  return useQuery<Transaction>({
    queryKey: queryKeys.transactions.detail(id || ''),
    queryFn: () => {
      if (!id) {
        return Promise.reject(new Error('Transaction ID is required'))
      }
      return getTransactionById(id)
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  })
}


