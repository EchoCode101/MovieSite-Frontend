import { useQuery } from '@tanstack/react-query'

import { getUsers } from '../api/users-api'
import type { UserListParams, UserListResponse } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch paginated list of users
 */
export function useUsers(params: UserListParams) {
  return useQuery<UserListResponse>({
    queryKey: queryKeys.users.list(params),
    queryFn: () => getUsers(params),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

