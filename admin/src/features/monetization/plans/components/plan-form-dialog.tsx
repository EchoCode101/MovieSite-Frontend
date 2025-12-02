import { useEffect } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { billingCycles, moneySchema } from '@/features/monetization/types'
import type { BillingCycle } from '@/features/monetization/types'
import type { Plan } from '../types'
import { useCreatePlan, useUpdatePlan } from '../hooks'

const planSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name must be 255 characters or less'),
  slug: z.string().max(255, 'Slug must be 255 characters or less').optional(),
  description: z.string().max(1000, 'Description must be 1000 characters or less').optional(),
  price: moneySchema,
  billing_cycle: z.custom<BillingCycle>().refine((val) => billingCycles.includes(val as BillingCycle), {
    message: 'Invalid billing cycle',
  }),
  max_profiles: z
    .number()
    .int()
    .min(1, 'Must allow at least 1 profile')
    .optional(),
  max_devices: z
    .number()
    .int()
    .min(1, 'Must allow at least 1 device')
    .optional(),
  allow_download: z.boolean().optional(),
  allow_cast: z.boolean().optional(),
  ad_supported: z.boolean().optional(),
  is_featured: z.boolean().optional(),
  is_active: z.boolean().optional(),
})

type PlanFormValues = z.infer<typeof planSchema>

interface PlanFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  plan?: Plan | null
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function PlanFormDialog({
  open,
  onOpenChange,
  mode,
  plan,
}: PlanFormDialogProps) {
  const isEdit = mode === 'edit' && Boolean(plan)

  const createMutation = useCreatePlan()
  const updateMutation = useUpdatePlan()

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: plan?.name ?? '',
      slug: plan?.slug ?? '',
      description: plan?.description ?? '',
      price: plan?.price ?? 0,
      billing_cycle: plan?.billing_cycle ?? 'monthly',
      max_profiles: plan?.max_profiles ?? 1,
      max_devices: plan?.max_devices ?? 1,
      allow_download: plan?.allow_download ?? true,
      allow_cast: plan?.allow_cast ?? true,
      ad_supported: plan?.ad_supported ?? false,
      is_featured: plan?.is_featured ?? false,
      is_active: plan?.is_active ?? true,
    },
  })

  const watchedName = form.watch('name')

  useEffect(() => {
    if (!isEdit && watchedName) {
      const autoSlug = generateSlug(watchedName)
      form.setValue('slug', autoSlug)
    }
  }, [watchedName, isEdit, form])

  useEffect(() => {
    if (open) {
      form.reset({
        name: plan?.name ?? '',
        slug: plan?.slug ?? '',
        description: plan?.description ?? '',
        price: plan?.price ?? 0,
        billing_cycle: plan?.billing_cycle ?? 'monthly',
        max_profiles: plan?.max_profiles ?? 1,
        max_devices: plan?.max_devices ?? 1,
        allow_download: plan?.allow_download ?? true,
        allow_cast: plan?.allow_cast ?? true,
        ad_supported: plan?.ad_supported ?? false,
        is_featured: plan?.is_featured ?? false,
        is_active: plan?.is_active ?? true,
      })
    }
  }, [open, plan, form])

  const onSubmit = (values: PlanFormValues) => {
    if (isEdit && plan) {
      const id = plan.id || plan._id || ''
      if (!id) return
      updateMutation.mutate(
        { id, payload: values },
        {
          onSuccess: () => {
            onOpenChange(false)
            form.reset()
          },
        },
      )
    } else {
      createMutation.mutate(values, {
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
            {isEdit ? 'Edit subscription plan' : 'Create subscription plan'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the subscription plan configuration.'
              : 'Define a new subscription plan for your users.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="e.g. Premium"
              disabled={isLoading}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-400">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              {...form.register('slug')}
              placeholder="Auto-generated from name"
              disabled={isLoading}
            />
            {form.formState.errors.slug && (
              <p className="text-sm text-red-400">
                {form.formState.errors.slug.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              {...form.register('description')}
              placeholder="Short description of the plan"
              disabled={isLoading}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-400">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...form.register('price', { valueAsNumber: true })}
                disabled={isLoading}
              />
              {form.formState.errors.price && (
                <p className="text-sm text-red-400">
                  {form.formState.errors.price.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="billing_cycle">Billing cycle *</Label>
              <Select
                value={form.watch('billing_cycle')}
                onValueChange={(next) =>
                  form.setValue('billing_cycle', next as BillingCycle)
                }
              >
                <SelectTrigger id="billing_cycle" className="w-full">
                  <SelectValue placeholder="Select billing cycle" />
                </SelectTrigger>
                <SelectContent>
                  {billingCycles.map((cycle) => (
                    <SelectItem key={cycle} value={cycle}>
                      {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.billing_cycle && (
                <p className="text-sm text-red-400">
                  {form.formState.errors.billing_cycle.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="max_profiles">Max profiles</Label>
              <Input
                id="max_profiles"
                type="number"
                {...form.register('max_profiles', { valueAsNumber: true })}
                disabled={isLoading}
              />
              {form.formState.errors.max_profiles && (
                <p className="text-sm text-red-400">
                  {form.formState.errors.max_profiles.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="max_devices">Max devices</Label>
              <Input
                id="max_devices"
                type="number"
                {...form.register('max_devices', { valueAsNumber: true })}
                disabled={isLoading}
              />
              {form.formState.errors.max_devices && (
                <p className="text-sm text-red-400">
                  {form.formState.errors.max_devices.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 pt-6">
              <Switch
                id="allow_download"
                checked={form.watch('allow_download') ?? false}
                onCheckedChange={(checked) =>
                  form.setValue('allow_download', checked)
                }
                disabled={isLoading}
              />
              <Label htmlFor="allow_download">Allow downloads</Label>
            </div>

            <div className="flex items-center gap-2 pt-6">
              <Switch
                id="allow_cast"
                checked={form.watch('allow_cast') ?? false}
                onCheckedChange={(checked) =>
                  form.setValue('allow_cast', checked)
                }
                disabled={isLoading}
              />
              <Label htmlFor="allow_cast">Allow casting</Label>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Switch
                id="ad_supported"
                checked={form.watch('ad_supported') ?? false}
                onCheckedChange={(checked) =>
                  form.setValue('ad_supported', checked)
                }
                disabled={isLoading}
              />
              <Label htmlFor="ad_supported">Ad-supported</Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="is_featured"
                checked={form.watch('is_featured') ?? false}
                onCheckedChange={(checked) =>
                  form.setValue('is_featured', checked)
                }
                disabled={isLoading}
              />
              <Label htmlFor="is_featured">Featured</Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="is_active"
                checked={form.watch('is_active') ?? true}
                onCheckedChange={(checked) =>
                  form.setValue('is_active', checked)
                }
                disabled={isLoading}
              />
              <Label htmlFor="is_active">Active</Label>
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


