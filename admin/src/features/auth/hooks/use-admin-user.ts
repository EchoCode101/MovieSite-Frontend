import { useQuery } from '@tanstack/react-query'

import { getCurrentAdmin } from '@/features/auth/api/auth-api'
import type { AuthUser } from '@/features/auth/api/types'
import { queryKeys } from '@/lib/query-keys'

export function useAdminUser() {
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('adminToken')

  const query = useQuery<AuthUser>({
    queryKey: queryKeys.auth.me(),
    queryFn: getCurrentAdmin,
    enabled: hasToken,
    staleTime: 1000 * 60 * 5,
  })

  return query
}


