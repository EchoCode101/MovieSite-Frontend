import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'

import { getPageBySlug } from '../api/pages-api'
import type { Page } from '../types'

export function usePage(slug?: string) {
  return useQuery<Page>({
    queryKey: queryKeys.pages.detail(slug || ''),
    queryFn: () => {
      if (!slug) {
        return Promise.reject(new Error('Slug is required'))
      }
      return getPageBySlug(slug)
    },
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
  })
}


