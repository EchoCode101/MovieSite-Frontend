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
import type { Genre } from '../types'
import { useCreateGenre, useUpdateGenre } from '../hooks'

const genreSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name must be 255 characters or less'),
  slug: z.string().max(255, 'Slug must be 255 characters or less').optional(),
})

type GenreFormValues = z.infer<typeof genreSchema>

interface GenreFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  genre?: Genre | null
}

/**
 * Generate slug from name
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function GenreFormDialog({
  open,
  onOpenChange,
  mode,
  genre,
}: GenreFormDialogProps) {
  const baseId = useId()
  const nameId = `${baseId}-name`
  const slugId = `${baseId}-slug`
  const isEdit = mode === 'edit' && genre

  const createMutation = useCreateGenre()
  const updateMutation = useUpdateGenre()

  const form = useForm<GenreFormValues>({
    resolver: zodResolver(genreSchema),
    defaultValues: {
      name: genre?.name ?? '',
      slug: genre?.slug ?? '',
    },
  })

  const watchedName = form.watch('name')

  // Auto-generate slug from name
  useEffect(() => {
    if (watchedName && !isEdit) {
      const autoSlug = generateSlug(watchedName)
      form.setValue('slug', autoSlug)
    }
  }, [watchedName, isEdit, form])

  useEffect(() => {
    if (open) {
      form.reset({
        name: genre?.name ?? '',
        slug: genre?.slug ?? '',
      })
    }
  }, [open, genre, form])

  const onSubmit = (values: GenreFormValues) => {
    if (isEdit && genre) {
      const genreId = genre.id || genre._id || ''
      updateMutation.mutate(
        {
          id: genreId,
          payload: values,
        },
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
          <DialogTitle>{isEdit ? 'Edit Genre' : 'Create Genre'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the genre information.' : 'Create a new genre for categorizing content.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={nameId}>Name *</Label>
            <Input
              id={nameId}
              {...form.register('name')}
              placeholder="e.g., Action"
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

