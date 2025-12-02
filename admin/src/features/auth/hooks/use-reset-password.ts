import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'

import { resetPassword } from '@/features/auth/api/auth-api'
import type { ResetPasswordPayload } from '@/features/auth/api/types'
import { toast } from '@/lib/toast'

export function useResetPassword() {
  const router = useRouter()

  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
    onSuccess: () => {
      toast.success('Password reset successfully', 'You can now log in.')
      router.navigate({ to: '/login' })
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to reset password. Please try again.'
      toast.error('Reset password failed', message)
    },
  })
}


