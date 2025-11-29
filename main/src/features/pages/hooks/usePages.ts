import { useQuery } from '@tanstack/react-query'
import { getPages, getPageBySlug } from '../api/pages'
import { queryKeys } from '@/lib/query-keys'

export const usePages = () => {
  return useQuery({
    queryKey: queryKeys.pages.all,
    queryFn: getPages,
    staleTime: 1000 * 60 * 30, // 30 minutes
  })
}

export const usePage = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.pages.detail(slug),
    queryFn: () => getPageBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 30, // 30 minutes
  })
}

