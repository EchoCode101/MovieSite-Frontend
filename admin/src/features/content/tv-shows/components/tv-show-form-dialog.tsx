import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
import type { TvShowDetail } from '../types'
import { useCreateTvShow, useUpdateTvShow } from '../hooks'

const tvShowSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().optional(),
  description: z.string().optional(),
  thumbnail_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  poster_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  banner_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  access_type: z.enum(['free', 'subscription', 'pay_per_view']).optional(),
  plan_ids: z.string().optional(),
  language: z.string().optional(),
  imdb_rating: z.number().min(0).max(10).optional(),
  content_rating: z.string().optional(),
  release_year: z.number().min(1900).max(2100).optional(),
  genres: z.string().optional(),
  cast: z.string().optional(),
  directors: z.string().optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  seo_keywords: z.string().optional(),
  status: z.enum(['draft', 'published']).optional(),
})

type TvShowFormValues = z.infer<typeof tvShowSchema>

interface TvShowFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  tvShow?: TvShowDetail | null
}

export function TvShowFormDialog({
  open,
  onOpenChange,
  mode,
  tvShow,
}: TvShowFormDialogProps) {
  const isEdit = mode === 'edit' && tvShow

  const form = useForm<TvShowFormValues>({
    resolver: zodResolver(tvShowSchema),
    defaultValues: {
      title: tvShow?.title ?? '',
      slug: tvShow?.slug ?? '',
      description: tvShow?.description ?? '',
      thumbnail_url: tvShow?.thumbnail_url ?? '',
      poster_url: tvShow?.poster_url ?? '',
      banner_url: tvShow?.banner_url ?? '',
      access_type: tvShow?.access_type ?? 'free',
      plan_ids: tvShow?.plan_ids?.join(', ') ?? '',
      language: tvShow?.language ?? '',
      imdb_rating: tvShow?.imdb_rating,
      content_rating: tvShow?.content_rating ?? '',
      release_year: tvShow?.release_year,
      genres: tvShow?.genres?.join(', ') ?? '',
      cast: tvShow?.cast?.join(', ') ?? '',
      directors: tvShow?.directors?.join(', ') ?? '',
      seo_title: tvShow?.seo_title ?? '',
      seo_description: tvShow?.seo_description ?? '',
      seo_keywords: tvShow?.seo_keywords?.join(', ') ?? '',
      status: tvShow?.status ?? 'published',
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        title: tvShow?.title ?? '',
        slug: tvShow?.slug ?? '',
        description: tvShow?.description ?? '',
        thumbnail_url: tvShow?.thumbnail_url ?? '',
        poster_url: tvShow?.poster_url ?? '',
        banner_url: tvShow?.banner_url ?? '',
        access_type: tvShow?.access_type ?? 'free',
        plan_ids: tvShow?.plan_ids?.join(', ') ?? '',
        language: tvShow?.language ?? '',
        imdb_rating: tvShow?.imdb_rating,
        content_rating: tvShow?.content_rating ?? '',
        release_year: tvShow?.release_year,
        genres: tvShow?.genres?.join(', ') ?? '',
        cast: tvShow?.cast?.join(', ') ?? '',
        directors: tvShow?.directors?.join(', ') ?? '',
        seo_title: tvShow?.seo_title ?? '',
        seo_description: tvShow?.seo_description ?? '',
        seo_keywords: tvShow?.seo_keywords?.join(', ') ?? '',
        status: tvShow?.status ?? 'published',
      } as TvShowFormValues)
    }
  }, [open, tvShow, form])

  const createMutation = useCreateTvShow()
  const updateMutation = useUpdateTvShow()

  const isSubmitting = createMutation.isPending || updateMutation.isPending

  const onSubmit = (values: TvShowFormValues) => {
    const planIds = values.plan_ids
      ? values.plan_ids.split(',').map((id) => id.trim()).filter(Boolean)
      : undefined
    const genres = values.genres
      ? values.genres.split(',').map((g) => g.trim()).filter(Boolean)
      : undefined
    const cast = values.cast
      ? values.cast.split(',').map((c) => c.trim()).filter(Boolean)
      : undefined
    const directors = values.directors
      ? values.directors.split(',').map((d) => d.trim()).filter(Boolean)
      : undefined
    const seoKeywords = values.seo_keywords
      ? values.seo_keywords.split(',').map((k) => k.trim()).filter(Boolean)
      : undefined

    const payload = {
      ...values,
      plan_ids: planIds,
      genres,
      cast,
      directors,
      seo_keywords: seoKeywords,
    }

    if (isEdit && tvShow) {
      const tvShowId = tvShow.id || tvShow._id || ''
      updateMutation.mutate(
        { id: tvShowId, payload },
        {
          onSuccess: () => {
            onOpenChange(false)
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit TV show' : 'Create TV show'}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update TV show information and settings.' : 'Create a new TV show with details and metadata.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input disabled={isSubmitting} {...form.register('title')} />
              {form.formState.errors.title ? (
                <p className="text-sm text-red-500">
                  {form.formState.errors.title.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label>Slug</Label>
              <Input disabled={isSubmitting} {...form.register('slug')} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea disabled={isSubmitting} {...form.register('description')} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Thumbnail URL</Label>
              <Input disabled={isSubmitting} {...form.register('thumbnail_url')} />
            </div>

            <div className="space-y-2">
              <Label>Poster URL</Label>
              <Input disabled={isSubmitting} {...form.register('poster_url')} />
            </div>

            <div className="space-y-2">
              <Label>Banner URL</Label>
              <Input disabled={isSubmitting} {...form.register('banner_url')} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Language</Label>
              <Input disabled={isSubmitting} {...form.register('language')} />
            </div>

            <div className="space-y-2">
              <Label>Release Year</Label>
              <Input
                type="number"
                disabled={isSubmitting}
                {...form.register('release_year', { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>IMDB Rating</Label>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="10"
                disabled={isSubmitting}
                {...form.register('imdb_rating', { valueAsNumber: true })}
              />
            </div>

            <div className="space-y-2">
              <Label>Content Rating</Label>
              <Input disabled={isSubmitting} {...form.register('content_rating')} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Genres (comma-separated IDs)</Label>
              <Input disabled={isSubmitting} {...form.register('genres')} />
            </div>

            <div className="space-y-2">
              <Label>Access Type</Label>
              <Select
                value={form.watch('access_type')}
                onValueChange={(val) => form.setValue('access_type', val as 'free' | 'subscription' | 'pay_per_view')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="subscription">Subscription</SelectItem>
                  <SelectItem value="pay_per_view">Pay Per View</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Plan IDs (comma-separated)</Label>
            <Input disabled={isSubmitting} {...form.register('plan_ids')} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Cast (comma-separated IDs)</Label>
              <Input disabled={isSubmitting} {...form.register('cast')} />
            </div>

            <div className="space-y-2">
              <Label>Directors (comma-separated IDs)</Label>
              <Input disabled={isSubmitting} {...form.register('directors')} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>SEO Title</Label>
            <Input disabled={isSubmitting} {...form.register('seo_title')} />
          </div>

          <div className="space-y-2">
            <Label>SEO Description</Label>
            <Textarea disabled={isSubmitting} {...form.register('seo_description')} />
          </div>

          <div className="space-y-2">
            <Label>SEO Keywords (comma-separated)</Label>
            <Input disabled={isSubmitting} {...form.register('seo_keywords')} />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={form.watch('status')}
              onValueChange={(val) => form.setValue('status', val as 'draft' | 'published')}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : isEdit ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

