import { useEffect, useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

import type { PaymentMethod } from '../types'
import { useCreatePaymentMethod, useUpdatePaymentMethod } from '../hooks'

const paymentMethodSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or less'),
  display_name: z
    .string()
    .max(100, 'Display name must be 100 characters or less')
    .optional(),
  configJson: z
    .string()
    .min(2, 'Config JSON is required')
    .refine((value) => {
      try {
        JSON.parse(value)
        return true
      } catch {
        return false
      }
    }, 'Config must be valid JSON'),
  is_active: z.boolean().optional(),
  is_default: z.boolean().optional(),
})

type PaymentMethodFormValues = z.infer<typeof paymentMethodSchema>

interface PaymentMethodFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  method?: PaymentMethod | null
}

export function PaymentMethodFormDialog({
  open,
  onOpenChange,
  mode,
  method,
}: PaymentMethodFormDialogProps) {
  const isEdit = mode === 'edit' && Boolean(method)
  const baseId = useId()
  const nameId = `${baseId}-name`
  const displayNameId = `${baseId}-display-name`
  const configId = `${baseId}-config-json`
  const isActiveId = `${baseId}-is-active`
  const isDefaultId = `${baseId}-is-default`

  const createMutation = useCreatePaymentMethod()
  const updateMutation = useUpdatePaymentMethod()

  const [configError, setConfigError] = useState<string | null>(null)

  const form = useForm<PaymentMethodFormValues>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      name: method?.name ?? '',
      display_name: method?.display_name ?? '',
      configJson: JSON.stringify(method?.config ?? {}, null, 2),
      is_active: method?.is_active ?? true,
      is_default: method?.is_default ?? false,
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        name: method?.name ?? '',
        display_name: method?.display_name ?? '',
        configJson: JSON.stringify(method?.config ?? {}, null, 2),
        is_active: method?.is_active ?? true,
        is_default: method?.is_default ?? false,
      })
      setConfigError(null)
    }
  }, [open, method, form])

  const onSubmit = (values: PaymentMethodFormValues) => {
    try {
      const parsedConfig = JSON.parse(values.configJson)
      const payload = {
        name: values.name,
        display_name: values.display_name || undefined,
        config: parsedConfig as Record<string, unknown>,
        is_active: values.is_active ?? true,
        is_default: values.is_default ?? false,
      }

      if (isEdit && method) {
        const id = method.id || method._id || ''
        if (!id) return
        updateMutation.mutate(
          { id, payload },
          {
            onSuccess: () => {
              onOpenChange(false)
              form.reset()
            },
          },
        )
      } else {
        createMutation.mutate(payload, {
          onSuccess: () => {
            onOpenChange(false)
            form.reset()
          },
        })
      }
      setConfigError(null)
    } catch (error) {
      setConfigError(
        error instanceof Error ? error.message : 'Invalid JSON configuration',
      )
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit payment method' : 'Create payment method'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update gateway configuration and visibility.'
              : 'Configure a new payment gateway. Be careful with API keys and secrets.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={nameId}>Name *</Label>
              <Input
                id={nameId}
                {...form.register('name')}
                placeholder="e.g. stripe"
                disabled={isLoading}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-400">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={displayNameId}>Display name</Label>
              <Input
                id={displayNameId}
                {...form.register('display_name')}
                placeholder="e.g. Credit Card"
                disabled={isLoading}
              />
              {form.formState.errors.display_name && (
                <p className="text-sm text-red-400">
                  {form.formState.errors.display_name.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={configId}>Config (JSON) *</Label>
            <Textarea
              id={configId}
              {...form.register('configJson')}
              className="font-mono text-xs"
              rows={8}
              disabled={isLoading}
            />
            <p className="text-xs text-slate-400">
              Store gateway credentials and options as JSON. Do not share this
              configuration publicly.
            </p>
            {(form.formState.errors.configJson || configError) && (
              <p className="text-sm text-red-400">
                {form.formState.errors.configJson?.message || configError}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id={isActiveId}
                checked={form.watch('is_active') ?? true}
                onCheckedChange={(checked) =>
                  form.setValue('is_active', checked)
                }
                disabled={isLoading}
              />
              <Label htmlFor={isActiveId}>Active</Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id={isDefaultId}
                checked={form.watch('is_default') ?? false}
                onCheckedChange={(checked) =>
                  form.setValue('is_default', checked)
                }
                disabled={isLoading}
              />
              <Label htmlFor={isDefaultId}>Default</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (isEdit ? 'Updating...' : 'Creating...') : isEdit ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


