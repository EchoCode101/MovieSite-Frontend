import { useQuery } from '@tanstack/react-query'
import { getTransactions, getTransactionById } from '../api/transactions'
import { queryKeys } from '@/lib/query-keys'

export const useTransactions = (params?: {
  type?: 'subscription' | 'pay_per_view'
  status?: 'pending' | 'paid' | 'failed' | 'refunded'
  limit?: number
  page?: number
}) => {
  return useQuery({
    queryKey: queryKeys.transactions.lists(params),
    queryFn: () => getTransactions(params),
    staleTime: 1000 * 60 * 5,
  })
}

export const useTransaction = (id: string) => {
  return useQuery({
    queryKey: queryKeys.transactions.detail(id),
    queryFn: () => getTransactionById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
}

