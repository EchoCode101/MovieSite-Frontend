import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'

import { getTransactions } from '../api/transactions-api'
import type {
  Transaction,
  TransactionListParams,
  TransactionListResponse,
} from '../types'

/**
 * Hook to fetch transactions with optional client-side filtering
 */
export function useTransactions(params: TransactionListParams) {
  return useQuery<TransactionListResponse>({
    queryKey: queryKeys.transactions.all,
    queryFn: () => getTransactions(params),
    select: (data: Transaction[]) => {
      if (!data?.length) return []
      return data.filter((tx: Transaction) => {
        if (params.type && tx.type !== params.type) return false
        if (params.status && tx.status !== params.status) return false
        return true
      })
    },
    staleTime: 1000 * 60 * 2,
  })
}


