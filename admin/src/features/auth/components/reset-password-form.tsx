import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useResetPassword } from '@/features/auth/hooks/use-reset-password'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

interface ResetPasswordFormProps {
  token: string
  className?: string
}

export function ResetPasswordForm({ token, className }: ResetPasswordFormProps) {
  const passwordId = useId()
  const confirmPasswordId = useId()
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const mutation = useResetPassword()

  const onSubmit = (values: ResetPasswordValues) => {
    mutation.mutate({ token, password: values.password })
  }

  const isSubmitting = mutation.isPending

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn('space-y-4', className)}
      noValidate
    >
      <div className="space-y-2 text-left">
        <Label htmlFor={passwordId}>New password</Label>
        <Input
          id={passwordId}
          type="password"
          autoComplete="new-password"
          disabled={isSubmitting}
          {...form.register('password')}
        />
        {form.formState.errors.password ? (
          <p className="text-sm text-red-500">
            {form.formState.errors.password.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2 text-left">
        <Label htmlFor={confirmPasswordId}>Confirm new password</Label>
        <Input
          id={confirmPasswordId}
          type="password"
          autoComplete="new-password"
          disabled={isSubmitting}
          {...form.register('confirmPassword')}
        />
        {form.formState.errors.confirmPassword ? (
          <p className="text-sm text-red-500">
            {form.formState.errors.confirmPassword.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Resetting password...' : 'Reset password'}
      </Button>
    </form>
  )
}


