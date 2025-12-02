import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteUser } from '../api/users-api'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to delete a user
 */
export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
      toast.success('User deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete user', error.message)
    },
  })
}

