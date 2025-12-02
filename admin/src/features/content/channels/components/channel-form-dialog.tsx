import { useEffect, useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Channel, StreamType } from '../types'
import { useCreateChannel, useUpdateChannel } from '../hooks'

/**
 * Generate slug from name
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const channelSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name must be 255 characters or less'),
  slug: z.string().max(255, 'Slug must be 255 characters or less').optional(),
  description: z.string().optional(),
  logo_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  banner_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  stream_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  stream_type: z.enum(['hls', 'dash', 'mp4']).optional(),
  language: z.string().optional(),
  country: z.string().optional(),
  category: z.string().optional(),
  is_active: z.boolean().optional(),
  is_featured: z.boolean().optional(),
  sort_order: z.number().int().optional(),
})

type ChannelFormValues = z.infer<typeof channelSchema>

interface ChannelFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  channel?: Channel | null
}

export function ChannelFormDialog({
  open,
  onOpenChange,
  mode,
  channel,
}: ChannelFormDialogProps) {
  const baseId = useId()
  const nameId = `${baseId}-name`
  const slugId = `${baseId}-slug`
  const descriptionId = `${baseId}-description`
  const logoId = `${baseId}-logo-url`
  const bannerId = `${baseId}-banner-url`
  const streamUrlId = `${baseId}-stream-url`
  const streamTypeId = `${baseId}-stream-type`
  const languageId = `${baseId}-language`
  const countryId = `${baseId}-country`
  const categoryId = `${baseId}-category`
  const isActiveId = `${baseId}-is-active`
  const isFeaturedId = `${baseId}-is-featured`
  const sortOrderId = `${baseId}-sort-order`
  const isEdit = mode === 'edit' && channel
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)

  const createMutation = useCreateChannel()
  const updateMutation = useUpdateChannel()

  const form = useForm<ChannelFormValues>({
    resolver: zodResolver(channelSchema),
    defaultValues: {
      name: channel?.name ?? '',
      slug: channel?.slug ?? '',
      description: channel?.description ?? '',
      logo_url: channel?.logo_url ?? '',
      banner_url: channel?.banner_url ?? '',
      stream_url: channel?.stream_url ?? '',
      stream_type: channel?.stream_type,
      language: channel?.language ?? '',
      country: channel?.country ?? '',
      category: channel?.category ?? '',
      is_active: channel?.is_active ?? true,
      is_featured: channel?.is_featured ?? false,
      sort_order: channel?.sort_order,
    },
  })

  const watchedName = form.watch('name')
  const watchedLogoUrl = form.watch('logo_url')
  const watchedBannerUrl = form.watch('banner_url')

  // Auto-generate slug from name
  useEffect(() => {
    if (watchedName && !isEdit) {
      const autoSlug = generateSlug(watchedName)
      form.setValue('slug', autoSlug)
    }
  }, [watchedName, isEdit, form])

  useEffect(() => {
    if (watchedLogoUrl) {
      setLogoPreview(watchedLogoUrl)
    } else {
      setLogoPreview(null)
    }
  }, [watchedLogoUrl])

  useEffect(() => {
    if (watchedBannerUrl) {
      setBannerPreview(watchedBannerUrl)
    } else {
      setBannerPreview(null)
    }
  }, [watchedBannerUrl])

  useEffect(() => {
    if (open) {
      form.reset({
        name: channel?.name ?? '',
        slug: channel?.slug ?? '',
        description: channel?.description ?? '',
        logo_url: channel?.logo_url ?? '',
        banner_url: channel?.banner_url ?? '',
        stream_url: channel?.stream_url ?? '',
        stream_type: channel?.stream_type,
        language: channel?.language ?? '',
        country: channel?.country ?? '',
        category: channel?.category ?? '',
        is_active: channel?.is_active ?? true,
        is_featured: channel?.is_featured ?? false,
        sort_order: channel?.sort_order,
      })
      setLogoPreview(channel?.logo_url || null)
      setBannerPreview(channel?.banner_url || null)
    }
  }, [open, channel, form])

  const onSubmit = (values: ChannelFormValues) => {
    const payload = {
      ...values,
      description: values.description || undefined,
      logo_url: values.logo_url || undefined,
      banner_url: values.banner_url || undefined,
      stream_url: values.stream_url || undefined,
      language: values.language || undefined,
      country: values.country || undefined,
      category: values.category || undefined,
      slug: values.slug || undefined,
    }

    if (isEdit && channel) {
      const channelId = channel.id || channel._id || ''
      updateMutation.mutate(
        {
          id: channelId,
          payload,
        },
        {
          onSuccess: () => {
            onOpenChange(false)
            form.reset()
            setLogoPreview(null)
            setBannerPreview(null)
          },
        },
      )
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          onOpenChange(false)
          form.reset()
          setLogoPreview(null)
          setBannerPreview(null)
        },
      })
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Channel' : 'Create Channel'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update channel information and stream settings.' : 'Create a new live TV channel with stream URL and metadata.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={nameId}>Name *</Label>
              <Input
                id={nameId}
                {...form.register('name')}
                placeholder="e.g., Entertainment Channel"
                disabled={isLoading}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-400">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={slugId}>Slug</Label>
              <Input
                id={slugId}
                {...form.register('slug')}
                placeholder="Auto-generated from name"
                disabled={isLoading || !isEdit}
              />
              {form.formState.errors.slug && (
                <p className="text-sm text-red-400">{form.formState.errors.slug.message}</p>
              )}
              {!isEdit && (
                <p className="text-xs text-slate-400">
                  Slug will be auto-generated from name if not provided
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={descriptionId}>Description</Label>
            <Textarea
              id={descriptionId}
              {...form.register('description')}
              placeholder="Enter channel description..."
              rows={3}
              disabled={isLoading}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-400">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={logoId}>Logo URL</Label>
              <Input
                id={logoId}
                {...form.register('logo_url')}
                placeholder="https://example.com/logo.jpg"
                disabled={isLoading}
              />
              {form.formState.errors.logo_url && (
                <p className="text-sm text-red-400">{form.formState.errors.logo_url.message}</p>
              )}
              {logoPreview && (
                <div className="mt-2">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="h-20 w-20 rounded object-cover"
                    onError={() => setLogoPreview(null)}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={bannerId}>Banner URL</Label>
              <Input
                id={bannerId}
                {...form.register('banner_url')}
                placeholder="https://example.com/banner.jpg"
                disabled={isLoading}
              />
              {form.formState.errors.banner_url && (
                <p className="text-sm text-red-400">{form.formState.errors.banner_url.message}</p>
              )}
              {bannerPreview && (
                <div className="mt-2">
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    className="h-20 w-full rounded object-cover"
                    onError={() => setBannerPreview(null)}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={streamUrlId}>Stream URL</Label>
              <Input
                id={streamUrlId}
                {...form.register('stream_url')}
                placeholder="https://example.com/stream.m3u8"
                disabled={isLoading}
              />
              {form.formState.errors.stream_url && (
                <p className="text-sm text-red-400">{form.formState.errors.stream_url.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={streamTypeId}>Stream Type</Label>
              <Select
                value={form.watch('stream_type') || ''}
                onValueChange={(value) => form.setValue('stream_type', value as StreamType)}
                disabled={isLoading}
              >
                <SelectTrigger id={streamTypeId} className="bg-slate-950">
                  <SelectValue placeholder="Select stream type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hls">HLS</SelectItem>
                  <SelectItem value="dash">DASH</SelectItem>
                  <SelectItem value="mp4">MP4</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.stream_type && (
                <p className="text-sm text-red-400">{form.formState.errors.stream_type.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor={languageId}>Language</Label>
              <Input
                id={languageId}
                {...form.register('language')}
                placeholder="e.g., en"
                disabled={isLoading}
              />
              {form.formState.errors.language && (
                <p className="text-sm text-red-400">{form.formState.errors.language.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={countryId}>Country</Label>
              <Input
                id={countryId}
                {...form.register('country')}
                placeholder="e.g., US"
                disabled={isLoading}
              />
              {form.formState.errors.country && (
                <p className="text-sm text-red-400">{form.formState.errors.country.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={categoryId}>Category</Label>
              <Input
                id={categoryId}
                {...form.register('category')}
                placeholder="e.g., Entertainment"
                disabled={isLoading}
              />
              {form.formState.errors.category && (
                <p className="text-sm text-red-400">{form.formState.errors.category.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id={isActiveId}
                checked={form.watch('is_active') ?? true}
                onCheckedChange={(checked) => form.setValue('is_active', checked)}
                disabled={isLoading}
              />
              <Label htmlFor={isActiveId}>Active</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id={isFeaturedId}
                checked={form.watch('is_featured') ?? false}
                onCheckedChange={(checked) => form.setValue('is_featured', checked)}
                disabled={isLoading}
              />
              <Label htmlFor={isFeaturedId}>Featured</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor={sortOrderId}>Sort Order</Label>
              <Input
                id={sortOrderId}
                type="number"
                {...form.register('sort_order', { valueAsNumber: true })}
                placeholder="0"
                disabled={isLoading}
              />
              {form.formState.errors.sort_order && (
                <p className="text-sm text-red-400">{form.formState.errors.sort_order.message}</p>
              )}
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
              {isLoading
                ? isEdit
                  ? 'Updating...'
                  : 'Creating...'
                : isEdit
                  ? 'Update'
                  : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

