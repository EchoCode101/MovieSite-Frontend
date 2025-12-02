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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { CastCrew, CastCrewType } from '../types'
import { useCreateCastCrew, useUpdateCastCrew } from '../hooks'

const castCrewSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name must be 255 characters or less'),
  type: z.enum(['actor', 'director', 'writer', 'crew']),
  bio: z.string().optional(),
  image_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
})

type CastCrewFormValues = z.infer<typeof castCrewSchema>

interface CastCrewFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  castCrew?: CastCrew | null
}

export function CastCrewFormDialog({
  open,
  onOpenChange,
  mode,
  castCrew,
}: CastCrewFormDialogProps) {
  const baseId = useId()
  const nameId = `${baseId}-name`
  const typeId = `${baseId}-type`
  const bioId = `${baseId}-bio`
  const imageId = `${baseId}-image-url`
  const isEdit = mode === 'edit' && castCrew
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const createMutation = useCreateCastCrew()
  const updateMutation = useUpdateCastCrew()

  const form = useForm<CastCrewFormValues>({
    resolver: zodResolver(castCrewSchema),
    defaultValues: {
      name: castCrew?.name ?? '',
      type: castCrew?.type ?? 'actor',
      bio: castCrew?.bio ?? '',
      image_url: castCrew?.image_url ?? '',
    },
  })

  const watchedImageUrl = form.watch('image_url')

  useEffect(() => {
    if (watchedImageUrl) {
      setImagePreview(watchedImageUrl)
    } else {
      setImagePreview(null)
    }
  }, [watchedImageUrl])

  useEffect(() => {
    if (open) {
      form.reset({
        name: castCrew?.name ?? '',
        type: castCrew?.type ?? 'actor',
        bio: castCrew?.bio ?? '',
        image_url: castCrew?.image_url ?? '',
      })
      setImagePreview(castCrew?.image_url || null)
    }
  }, [open, castCrew, form])

  const onSubmit = (values: CastCrewFormValues) => {
    const payload = {
      ...values,
      bio: values.bio || undefined,
      image_url: values.image_url || undefined,
    }

    if (isEdit && castCrew) {
      const memberId = castCrew.id || castCrew._id || ''
      updateMutation.mutate(
        {
          id: memberId,
          payload,
        },
        {
          onSuccess: () => {
            onOpenChange(false)
            form.reset()
            setImagePreview(null)
          },
        },
      )
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          onOpenChange(false)
          form.reset()
          setImagePreview(null)
        },
      })
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Cast/Crew Member' : 'Create Cast/Crew Member'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update cast/crew member information.' : 'Add a new cast or crew member to the database.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={nameId}>Name *</Label>
              <Input
                id={nameId}
                {...form.register('name')}
                placeholder="e.g., John Doe"
                disabled={isLoading}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-400">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={typeId}>Type *</Label>
              <Select
                value={form.watch('type')}
                onValueChange={(value) => form.setValue('type', value as CastCrewType)}
                disabled={isLoading}
              >
                <SelectTrigger id={typeId} className="bg-slate-950">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="actor">Actor</SelectItem>
                  <SelectItem value="director">Director</SelectItem>
                  <SelectItem value="writer">Writer</SelectItem>
                  <SelectItem value="crew">Crew</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.type && (
                <p className="text-sm text-red-400">{form.formState.errors.type.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={bioId}>Biography</Label>
            <Textarea
              id={bioId}
              {...form.register('bio')}
              placeholder="Enter biography..."
              rows={4}
              disabled={isLoading}
            />
            {form.formState.errors.bio && (
              <p className="text-sm text-red-400">{form.formState.errors.bio.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={imageId}>Image URL</Label>
            <Input
              id={imageId}
              {...form.register('image_url')}
              placeholder="https://example.com/image.jpg"
              disabled={isLoading}
            />
            {form.formState.errors.image_url && (
              <p className="text-sm text-red-400">{form.formState.errors.image_url.message}</p>
            )}
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 w-32 rounded object-cover"
                  onError={() => setImagePreview(null)}
                />
              </div>
            )}
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

