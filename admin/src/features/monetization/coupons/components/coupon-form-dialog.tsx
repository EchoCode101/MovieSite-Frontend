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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

import {
  discountTypes,
  moneySchema,
  percentageSchema,
  optionalDateSchema,
} from '@/features/monetization/types'
import type { DiscountType } from '@/features/monetization/types'
import type { Coupon } from '../types'
import { useCreateCoupon, useUpdateCoupon } from '../hooks'

const couponSchema = z.object({
  code: z
    .string()
    .min(1, 'Code is required')
    .max(50, 'Code must be 50 characters or less'),
  description: z
    .string()
    .max(255, 'Description must be 255 characters or less')
    .optional(),
  discount_type: z.custom<DiscountType>().refine((val) => discountTypes.includes(val as DiscountType), {
    message: 'Invalid discount type',
  }),
  discount_value: z.union([
    moneySchema,
    percentageSchema,
  ]),
  max_uses: z
    .number()
    .int()
    .min(1, 'Must be at least 1')
    .optional(),
  max_uses_per_user: z
    .number()
    .int()
    .min(1, 'Must be at least 1')
    .optional(),
  valid_from: optionalDateSchema,
  valid_until: optionalDateSchema,
  is_active: z.boolean().optional(),
})

type CouponFormValues = z.infer<typeof couponSchema>

interface CouponFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  coupon?: Coupon | null
}

export function CouponFormDialog({
  open,
  onOpenChange,
  mode,
  coupon,
}: CouponFormDialogProps) {
  const isEdit = mode === 'edit' && Boolean(coupon)
  const baseId = useId()
  const codeId = `${baseId}-code`
  const discountTypeId = `${baseId}-discount-type`
  const discountValueId = `${baseId}-discount-value`
  const maxUsesId = `${baseId}-max-uses`
  const maxUsesPerUserId = `${baseId}-max-uses-per-user`
  const validFromId = `${baseId}-valid-from`
  const validUntilId = `${baseId}-valid-until`
  const descriptionId = `${baseId}-description`
  const isActiveId = `${baseId}-is-active`

  const createMutation = useCreateCoupon()
  const updateMutation = useUpdateCoupon()

  const form = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: coupon?.code ?? '',
      description: coupon?.description ?? '',
      discount_type: coupon?.discount_type ?? 'percent',
      discount_value: coupon?.discount_value ?? 0,
      max_uses: coupon?.max_uses,
      max_uses_per_user: coupon?.max_uses_per_user,
      valid_from: coupon?.valid_from ?? '',
      valid_until: coupon?.valid_until ?? '',
      is_active: coupon?.is_active ?? true,
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        code: coupon?.code ?? '',
        description: coupon?.description ?? '',
        discount_type: coupon?.discount_type ?? 'percent',
        discount_value: coupon?.discount_value ?? 0,
        max_uses: coupon?.max_uses,
        max_uses_per_user: coupon?.max_uses_per_user,
        valid_from: coupon?.valid_from ?? '',
        valid_until: coupon?.valid_until ?? '',
        is_active: coupon?.is_active ?? true,
      })
    }
  }, [open, coupon, form])

  const onSubmit = (values: CouponFormValues) => {
    const payload = {
      ...values,
      // normalize empty strings to undefined for dates
      valid_from: values.valid_from || undefined,
      valid_until: values.valid_until || undefined,
    }

    if (isEdit && coupon) {
      const id = coupon.id || coupon._id || ''
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
          <DialogTitle>
            {isEdit ? 'Edit coupon' : 'Create coupon'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update coupon details and restrictions.'
              : 'Create a new discount coupon.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={codeId}>Code *</Label>
              <Input
                id={codeId}
                {...form.register('code')}
                placeholder="e.g. SAVE20"
                disabled={isLoading}
              />
              {form.formState.errors.code && (
                <p className="text-sm text-red-400">
                  {form.formState.errors.code.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={discountTypeId}>Discount type *</Label>
              <Select
                value={form.watch('discount_type')}
                onValueChange={(next) =>
                  form.setValue('discount_type', next as DiscountType)
                }
              >
                <SelectTrigger id={discountTypeId} className="w-full">
                  <SelectValue placeholder="Select discount type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percent">Percent</SelectItem>
                  <SelectItem value="fixed">Fixed amount</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.discount_type && (
                <p className="text-sm text-red-400">
                  {form.formState.errors.discount_type.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor={discountValueId}>Discount value *</Label>
              <Input
                id={discountValueId}
                type="number"
                step="0.01"
                {...form.register('discount_value', { valueAsNumber: true })}
                disabled={isLoading}
              />
              {form.formState.errors.discount_value && (
                <p className="text-sm text-red-400">
                  {form.formState.errors.discount_value.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={maxUsesId}>Max uses</Label>
              <Input
                id={maxUsesId}
                type="number"
                {...form.register('max_uses', { valueAsNumber: true })}
                disabled={isLoading}
              />
              {form.formState.errors.max_uses && (
                <p className="text-sm text-red-400">
                  {form.formState.errors.max_uses.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={maxUsesPerUserId}>Max uses per user</Label>
              <Input
                id={maxUsesPerUserId}
                type="number"
                {...form.register('max_uses_per_user', { valueAsNumber: true })}
                disabled={isLoading}
              />
              {form.formState.errors.max_uses_per_user && (
                <p className="text-sm text-red-400">
                  {form.formState.errors.max_uses_per_user.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={validFromId}>Valid from</Label>
              <Input
                id={validFromId}
                type="datetime-local"
                {...form.register('valid_from')}
                disabled={isLoading}
              />
              {form.formState.errors.valid_from && (
                <p className="text-sm text-red-400">
                  {form.formState.errors.valid_from.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={validUntilId}>Valid until</Label>
              <Input
                id={validUntilId}
                type="datetime-local"
                {...form.register('valid_until')}
                disabled={isLoading}
              />
              {form.formState.errors.valid_until && (
                <p className="text-sm text-red-400">
                  {form.formState.errors.valid_until.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={descriptionId}>Description</Label>
            <Input
              id={descriptionId}
              {...form.register('description')}
              placeholder="Short description (for admins)"
              disabled={isLoading}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-400">
                {form.formState.errors.description.message}
              </p>
            )}
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


