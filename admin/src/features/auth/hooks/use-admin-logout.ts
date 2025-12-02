import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'

import { logout } from '@/features/auth/api/auth-api'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

export function useAdminLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      localStorage.removeItem('adminToken')
      queryClient.removeQueries({ queryKey: queryKeys.auth.me() })

      toast.success('Logged out')
      router.navigate({ to: '/login' })
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : 'Logout failed. Please try again.'
      toast.error('Logout failed', message)
    },
  })
}


