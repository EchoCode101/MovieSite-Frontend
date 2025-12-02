import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'

import { getTaxes } from '../api/taxes-api'
import type { TaxListResponse } from '../types'

/**
 * Hook to fetch all taxes (admin)
 */
export function useTaxes() {
  return useQuery<TaxListResponse>({
    queryKey: queryKeys.taxes.all,
    queryFn: () => getTaxes(),
    staleTime: 1000 * 60 * 2,
  })
}


