import { useQuery } from '@tanstack/react-query'

import { getReports } from '../api/reports-api'
import type { ReportListParams } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch all reports (no pagination)
 */
export function useReports(params?: ReportListParams) {
  return useQuery({
    queryKey: queryKeys.reports.list(params),
    queryFn: () => getReports(params),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

