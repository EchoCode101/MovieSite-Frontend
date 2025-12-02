import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useAdminLogin } from '@/features/auth/hooks/use-admin-login'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

interface LoginFormProps {
  className?: string
}

export function LoginForm({ className }: LoginFormProps) {
  const emailId = useId()
  const passwordId = useId()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useAdminLogin()

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values)
  }

  const isSubmitting = loginMutation.isPending

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn('space-y-4', className)}
      noValidate
    >
      <div className="space-y-2 text-left">
        <Label htmlFor={emailId}>Email</Label>
        <Input
          id={emailId}
          type="email"
          autoComplete="email"
          disabled={isSubmitting}
          {...form.register('email')}
        />
        {form.formState.errors.email ? (
          <p className="text-sm text-red-500">
            {form.formState.errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2 text-left">
        <Label htmlFor={passwordId}>Password</Label>
        <Input
          id={passwordId}
          type="password"
          autoComplete="current-password"
          disabled={isSubmitting}
          {...form.register('password')}
        />
        {form.formState.errors.password ? (
          <p className="text-sm text-red-500">
            {form.formState.errors.password.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Log in'}
      </Button>
    </form>
  )
}


