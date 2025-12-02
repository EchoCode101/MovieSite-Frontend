import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateUser } from '../api/users-api'
import type { UpdateUserPayload } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to update an existing user
 */
export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserPayload }) =>
      updateUser(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.detail(variables.id),
      })
      toast.success('User updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update user', error.message)
    },
  })
}

