import { useEffect, useId } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { AdminUserDetail } from '../types'
import { useCreateUser, useUpdateUser } from '../hooks'

const userSchemaBase = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  first_name: z.string().max(50).optional(),
  last_name: z.string().max(50).optional(),
  subscription_plan: z.enum(['Free', 'Basic', 'Premium', 'Ultimate']),
  role: z.enum(['user', 'admin']),
  status: z.enum(['Active', 'Inactive']),
})

const createUserSchema = userSchemaBase.extend({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[a-z]/, 'Password must contain a lowercase letter')
    .regex(/[0-9]/, 'Password must contain a digit'),
})

const updateUserSchema = userSchemaBase.extend({
  password: z.string().optional(),
})

type CreateUserFormValues = z.infer<typeof createUserSchema>
type UpdateUserFormValues = z.infer<typeof updateUserSchema>

type UserFormValues = CreateUserFormValues | UpdateUserFormValues

interface UserFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  user?: AdminUserDetail | null
}

export function UserFormDialog({
  open,
  onOpenChange,
  mode,
  user,
}: UserFormDialogProps) {
  const usernameId = useId()
  const emailId = useId()
  const passwordId = useId()

  const isEdit = mode === 'edit' && user

  const form = useForm<UserFormValues>({
    resolver: zodResolver(isEdit ? updateUserSchema : createUserSchema),
    defaultValues: {
      username: user?.username ?? '',
      email: user?.email ?? '',
      first_name: user?.first_name ?? '',
      last_name: user?.last_name ?? '',
      subscription_plan: (user?.subscription_plan as
        | 'Free'
        | 'Basic'
        | 'Premium'
        | 'Ultimate'
        | undefined) ?? 'Free',
      role: user?.role ?? 'user',
      status: user?.status ?? 'Active',
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        username: user?.username ?? '',
        email: user?.email ?? '',
        first_name: user?.first_name ?? '',
        last_name: user?.last_name ?? '',
        subscription_plan: (user?.subscription_plan as
          | 'Free'
          | 'Basic'
          | 'Premium'
          | 'Ultimate'
          | undefined) ?? 'Free',
        role: user?.role ?? 'user',
        status: user?.status ?? 'Active',
      } as UserFormValues)
    }
  }, [open, user, form])

  const createMutation = useCreateUser()
  const updateMutation = useUpdateUser()

  const isSubmitting = createMutation.isPending || updateMutation.isPending

  const onSubmit = (values: UserFormValues) => {
    if (isEdit && user) {
      const { password: _password, ...rest } = values
      updateMutation.mutate(
        { id: user.id || user._id || '', payload: rest },
        {
          onSuccess: () => {
            onOpenChange(false)
          },
        },
      )
    } else {
      if (!values.password) {
        form.setError('password', {
          type: 'manual',
          message: 'Password is required for new users',
        })
        return
      }
      createMutation.mutate(
        {
          username: values.username,
          email: values.email,
          password: values.password,
          first_name: values.first_name,
          last_name: values.last_name,
          subscription_plan: values.subscription_plan,
          role: values.role,
          status: values.status,
        },
        {
          onSuccess: () => {
            onOpenChange(false)
            form.reset()
          },
        },
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit user' : 'Create user'}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update user information and settings.' : 'Create a new user account with the specified details.'}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor={usernameId}>Username</Label>
            <Input
              id={usernameId}
              disabled={isSubmitting}
              {...form.register('username')}
            />
            {form.formState.errors.username ? (
              <p className="text-sm text-red-500">
                {form.formState.errors.username.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor={emailId}>Email</Label>
            <Input
              id={emailId}
              type="email"
              disabled={isSubmitting}
              {...form.register('email')}
            />
            {form.formState.errors.email ? (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            ) : null}
          </div>

          {!isEdit ? (
            <div className="space-y-2">
              <Label htmlFor={passwordId}>Password</Label>
              <Input
                id={passwordId}
                type="password"
                disabled={isSubmitting}
                {...form.register('password')}
              />
              {form.formState.errors.password ? (
                <p className="text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>First name</Label>
              <Input disabled={isSubmitting} {...form.register('first_name')} />
              {form.formState.errors.first_name ? (
                <p className="text-sm text-red-500">
                  {form.formState.errors.first_name.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label>Last name</Label>
              <Input disabled={isSubmitting} {...form.register('last_name')} />
              {form.formState.errors.last_name ? (
                <p className="text-sm text-red-500">
                  {form.formState.errors.last_name.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Plan</Label>
              <Input
                disabled={isSubmitting}
                {...form.register('subscription_plan')}
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input disabled={isSubmitting} {...form.register('role')} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Input disabled={isSubmitting} {...form.register('status')} />
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isEdit ? 'Save changes' : 'Create user'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


