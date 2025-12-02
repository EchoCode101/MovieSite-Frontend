import { useEffect, useId } from 'react'
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

import { percentageSchema } from '@/features/monetization/types'
import type { Tax } from '../types'
import { useCreateTax, useUpdateTax } from '../hooks'

const taxSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Name must be 255 characters or less'),
  country: z
    .string()
    .max(10, 'Country code must be 10 characters or less')
    .optional(),
  rate_percent: percentageSchema,
  is_active: z.boolean().optional(),
})

type TaxFormValues = z.infer<typeof taxSchema>

interface TaxFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  tax?: Tax | null
}

export function TaxFormDialog({
  open,
  onOpenChange,
  mode,
  tax,
}: TaxFormDialogProps) {
  const isEdit = mode === 'edit' && Boolean(tax)
  const baseId = useId()
  const nameId = `${baseId}-name`
  const countryId = `${baseId}-country`
  const rateId = `${baseId}-rate-percent`
  const isActiveId = `${baseId}-is-active`

  const createMutation = useCreateTax()
  const updateMutation = useUpdateTax()

  const form = useForm<TaxFormValues>({
    resolver: zodResolver(taxSchema),
    defaultValues: {
      name: tax?.name ?? '',
      country: tax?.country ?? '',
      rate_percent: tax?.rate_percent ?? 0,
      is_active: tax?.is_active ?? true,
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        name: tax?.name ?? '',
        country: tax?.country ?? '',
        rate_percent: tax?.rate_percent ?? 0,
        is_active: tax?.is_active ?? true,
      })
    }
  }, [open, tax, form])

  const onSubmit = (values: TaxFormValues) => {
    const payload = {
      ...values,
      country: values.country || undefined,
    }

    if (isEdit && tax) {
      const id = tax.id || tax._id || ''
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
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit tax' : 'Create tax'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update tax configuration.'
              : 'Create a new tax rate for a specific country.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={nameId}>Name *</Label>
            <Input
              id={nameId}
              {...form.register('name')}
              placeholder="e.g. VAT"
              disabled={isLoading}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-400">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={countryId}>Country code</Label>
              <Input
                id={countryId}
                {...form.register('country')}
                placeholder="e.g. US"
                disabled={isLoading}
              />
              {form.formState.errors.country && (
                <p className="text-sm text-red-400">
                  {form.formState.errors.country.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={rateId}>Rate (%) *</Label>
              <Input
                id={rateId}
                type="number"
                step="0.01"
                {...form.register('rate_percent', { valueAsNumber: true })}
                disabled={isLoading}
              />
              {form.formState.errors.rate_percent && (
                <p className="text-sm text-red-400">
                  {form.formState.errors.rate_percent.message}
                </p>
              )}
            </div>
          </div>

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


