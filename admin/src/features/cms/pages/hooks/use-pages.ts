import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'

import { getPages } from '../api/pages-api'
import type { PageListResponse } from '../types'

export function usePages() {
  return useQuery<PageListResponse>({
    queryKey: queryKeys.pages.all,
    queryFn: getPages,
    staleTime: 1000 * 60 * 5,
  })
}


