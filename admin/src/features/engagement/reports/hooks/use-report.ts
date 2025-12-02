import { useQuery } from '@tanstack/react-query'

import { getReportById } from '../api/reports-api'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch a single report by ID
 */
export function useReport(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.reports.detail(id || ''),
    queryFn: () => {
      if (!id) throw new Error('Report ID is required')
      return getReportById(id)
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

