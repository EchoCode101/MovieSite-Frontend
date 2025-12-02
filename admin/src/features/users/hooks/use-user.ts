import { useQuery } from '@tanstack/react-query'

import { getUserById } from '../api/users-api'
import type { AdminUserDetail } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch a single user by ID
 */
export function useUser(id: string | undefined) {
  return useQuery<AdminUserDetail>({
    queryKey: queryKeys.users.detail(id ?? ''),
    queryFn: () => {
      if (!id) {
        throw new Error('User id is required')
      }
      return getUserById(id)
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

