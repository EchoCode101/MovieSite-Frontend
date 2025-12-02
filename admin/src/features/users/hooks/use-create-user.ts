import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createUser } from '../api/users-api'
import type { CreateUserPayload } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to create a new user
 */
export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateUserPayload) => createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
      toast.success('User created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create user', error.message)
    },
  })
}

