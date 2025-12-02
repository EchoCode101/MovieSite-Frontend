import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'

import { login } from '@/features/auth/api/auth-api'
import type { LoginPayload, LoginResponse } from '@/features/auth/api/types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

export function useAdminLogin() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data: LoginResponse) => {
      // Validate token exists and store it
      if (!data.token) {
        toast.error('Login failed', 'Token not received from server')
        return
      }
      
      localStorage.setItem('adminToken', data.token)
      // Seed or invalidate current admin query
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() })

      toast.success('Logged in successfully')
      router.navigate({ to: '/dashboard' })
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : 'Login failed. Please try again.'
      toast.error('Login failed', message)
    },
  })
}


