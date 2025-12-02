import { useMutation } from '@tanstack/react-query'

import { forgotPassword } from '@/features/auth/api/auth-api'
import type { ForgotPasswordPayload } from '@/features/auth/api/types'
import { toast } from '@/lib/toast'

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPassword(payload),
    onSuccess: () => {
      toast.success(
        'If an account exists, a reset link has been sent to your email address.',
      )
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to process forgot password request. Please try again.'
      toast.error('Forgot password failed', message)
    },
  })
}


