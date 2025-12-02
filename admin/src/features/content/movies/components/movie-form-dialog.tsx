import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { MovieDetail, MovieStream } from '../types'
import { useCreateMovie, useUpdateMovie } from '../hooks'
import { StreamManager } from './stream-manager'

const movieSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().optional(),
  description: z.string().optional(),
  short_description: z.string().optional(),
  thumbnail_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  poster_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  banner_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  trailer_url_type: z.enum(['youtube', 'vimeo', 'mp4', 'hls']).optional(),
  trailer_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  access_type: z.enum(['free', 'subscription', 'pay_per_view']).optional(),
  plan_ids: z.string().optional(),
  pay_per_view_price: z.number().min(0).optional(),
  purchase_type: z.enum(['rent', 'buy']).optional(),
  access_duration_hours: z.number().min(0).optional(),
  language: z.string().optional(),
  imdb_rating: z.number().min(0).max(10).optional(),
  content_rating: z.string().optional(),
  release_date: z.string().optional(),
  duration_minutes: z.number().min(0).optional(),
  genres: z.string().optional(),
  cast: z.string().optional(),
  directors: z.string().optional(),
  tags: z.string().optional(),
  is_premium: z.boolean().optional(),
  is_featured: z.boolean().optional(),
  is_trending: z.boolean().optional(),
  is_coming_soon: z.boolean().optional(),
  is_downloadable: z.boolean().optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  seo_keywords: z.string().optional(),
  status: z.enum(['draft', 'published']).optional(),
})

type MovieFormValues = z.infer<typeof movieSchema>

interface MovieFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  movie?: MovieDetail | null
}

export function MovieFormDialog({
  open,
  onOpenChange,
  mode,
  movie,
}: MovieFormDialogProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [streams, setStreams] = useState<MovieStream[]>([])
  const featuredId = `is_featured-${movie?.id || 'new'}`
  const trendingId = `is_trending-${movie?.id || 'new'}`
  const comingSoonId = `is_coming_soon-${movie?.id || 'new'}`
  const downloadableId = `is_downloadable-${movie?.id || 'new'}`

  const isEdit = mode === 'edit' && movie

  const form = useForm<MovieFormValues>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: movie?.title ?? '',
      slug: movie?.slug ?? '',
      description: movie?.description ?? '',
      short_description: movie?.short_description ?? '',
      thumbnail_url: movie?.thumbnail_url ?? '',
      poster_url: movie?.poster_url ?? '',
      banner_url: movie?.banner_url ?? '',
      trailer_url_type: movie?.trailer_url_type,
      trailer_url: movie?.trailer_url ?? '',
      access_type: movie?.access_type ?? 'free',
      plan_ids: movie?.plan_ids?.join(', ') ?? '',
      pay_per_view_price: movie?.pay_per_view_price,
      purchase_type: movie?.purchase_type,
      access_duration_hours: movie?.access_duration_hours,
      language: movie?.language ?? '',
      imdb_rating: movie?.imdb_rating,
      content_rating: movie?.content_rating ?? '',
      release_date: movie?.release_date
        ? new Date(movie.release_date).toISOString().split('T')[0]
        : '',
      duration_minutes: movie?.duration_minutes,
      genres: movie?.genres?.join(', ') ?? '',
      cast: movie?.cast?.join(', ') ?? '',
      directors: movie?.directors?.join(', ') ?? '',
      tags: movie?.tags?.join(', ') ?? '',
      is_premium: movie?.is_premium ?? false,
      is_featured: movie?.is_featured ?? false,
      is_trending: movie?.is_trending ?? false,
      is_coming_soon: movie?.is_coming_soon ?? false,
      is_downloadable: movie?.is_downloadable ?? false,
      seo_title: movie?.seo_title ?? '',
      seo_description: movie?.seo_description ?? '',
      seo_keywords: movie?.seo_keywords?.join(', ') ?? '',
      status: movie?.status ?? 'published',
    },
  })

  useEffect(() => {
    if (open) {
      setCurrentStep(1)
      setStreams(movie?.streams || [])
      form.reset({
        title: movie?.title ?? '',
        slug: movie?.slug ?? '',
        description: movie?.description ?? '',
        short_description: movie?.short_description ?? '',
        thumbnail_url: movie?.thumbnail_url ?? '',
        poster_url: movie?.poster_url ?? '',
        banner_url: movie?.banner_url ?? '',
        trailer_url_type: movie?.trailer_url_type,
        trailer_url: movie?.trailer_url ?? '',
        access_type: movie?.access_type ?? 'free',
        plan_ids: movie?.plan_ids?.join(', ') ?? '',
        pay_per_view_price: movie?.pay_per_view_price,
        purchase_type: movie?.purchase_type,
        access_duration_hours: movie?.access_duration_hours,
        language: movie?.language ?? '',
        imdb_rating: movie?.imdb_rating,
        content_rating: movie?.content_rating ?? '',
        release_date: movie?.release_date
          ? new Date(movie.release_date).toISOString().split('T')[0]
          : '',
        duration_minutes: movie?.duration_minutes,
        genres: movie?.genres?.join(', ') ?? '',
        cast: movie?.cast?.join(', ') ?? '',
        directors: movie?.directors?.join(', ') ?? '',
        tags: movie?.tags?.join(', ') ?? '',
        is_premium: movie?.is_premium ?? false,
        is_featured: movie?.is_featured ?? false,
        is_trending: movie?.is_trending ?? false,
        is_coming_soon: movie?.is_coming_soon ?? false,
        is_downloadable: movie?.is_downloadable ?? false,
        seo_title: movie?.seo_title ?? '',
        seo_description: movie?.seo_description ?? '',
        seo_keywords: movie?.seo_keywords?.join(', ') ?? '',
        status: movie?.status ?? 'published',
      } as MovieFormValues)
    }
  }, [open, movie, form])

  const createMutation = useCreateMovie()
  const updateMutation = useUpdateMovie()

  const isSubmitting = createMutation.isPending || updateMutation.isPending

  const onSubmit = (values: MovieFormValues) => {
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
    const tags = values.tags
      ? values.tags.split(',').map((t) => t.trim()).filter(Boolean)
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
      tags,
      seo_keywords: seoKeywords,
      streams: streams.length > 0 ? streams : undefined,
      release_date: values.release_date ? new Date(values.release_date).toISOString() : undefined,
    }

    if (isEdit && movie) {
      const movieId = movie.id || movie._id || ''
      updateMutation.mutate(
        { id: movieId, payload },
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
          setStreams([])
        },
      })
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit movie' : 'Create movie'} - Step {currentStep} of 3
          </DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update movie information and settings.' : 'Create a new movie with details, streams, and metadata.'}
          </DialogDescription>
        </DialogHeader>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === step
                    ? 'bg-blue-600 text-white'
                    : currentStep > step
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-700 text-slate-400'
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`w-12 h-1 ${
                    currentStep > step ? 'bg-green-600' : 'bg-slate-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
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

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea disabled={isSubmitting} {...form.register('description')} />
              </div>

              <div className="space-y-2">
                <Label>Short Description</Label>
                <Textarea disabled={isSubmitting} {...form.register('short_description')} />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Release Date</Label>
                  <Input
                    type="date"
                    disabled={isSubmitting}
                    {...form.register('release_date')}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Duration (minutes)</Label>
                  <Input
                    type="number"
                    disabled={isSubmitting}
                    {...form.register('duration_minutes', { valueAsNumber: true })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Input disabled={isSubmitting} {...form.register('language')} />
                </div>
                <div className="space-y-2">
                  <Label>Content Rating</Label>
                  <Input disabled={isSubmitting} {...form.register('content_rating')} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>IMDB Rating (0-10)</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  disabled={isSubmitting}
                  {...form.register('imdb_rating', { valueAsNumber: true })}
                />
              </div>
            </div>
          )}

          {/* Step 2: Media & Streams */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Thumbnail URL</Label>
                <Input
                  type="url"
                  disabled={isSubmitting}
                  {...form.register('thumbnail_url')}
                />
              </div>

              <div className="space-y-2">
                <Label>Poster URL</Label>
                <Input
                  type="url"
                  disabled={isSubmitting}
                  {...form.register('poster_url')}
                />
              </div>

              <div className="space-y-2">
                <Label>Banner URL</Label>
                <Input
                  type="url"
                  disabled={isSubmitting}
                  {...form.register('banner_url')}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Trailer URL Type</Label>
                  <Select
                    value={form.watch('trailer_url_type') || ''}
                    onValueChange={(value) =>
                      form.setValue('trailer_url_type', value as 'youtube' | 'vimeo' | 'mp4' | 'hls')
                    }
                  >
                    <SelectTrigger className="bg-slate-950">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="vimeo">Vimeo</SelectItem>
                      <SelectItem value="mp4">MP4</SelectItem>
                      <SelectItem value="hls">HLS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Trailer URL</Label>
                  <Input
                    type="url"
                    disabled={isSubmitting}
                    {...form.register('trailer_url')}
                  />
                </div>
              </div>

              <StreamManager streams={streams} onChange={setStreams} />
            </div>
          )}

          {/* Step 3: Access & Metadata */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Access Type</Label>
                <Select
                  value={form.watch('access_type') || 'free'}
                  onValueChange={(value) =>
                    form.setValue('access_type', value as 'free' | 'subscription' | 'pay_per_view')
                  }
                >
                  <SelectTrigger className="bg-slate-950">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="subscription">Subscription</SelectItem>
                    <SelectItem value="pay_per_view">Pay Per View</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Plan IDs (comma-separated)</Label>
                <Input disabled={isSubmitting} {...form.register('plan_ids')} />
              </div>

              {form.watch('access_type') === 'pay_per_view' && (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>PPV Price</Label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        disabled={isSubmitting}
                        {...form.register('pay_per_view_price', { valueAsNumber: true })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Purchase Type</Label>
                      <Select
                        value={form.watch('purchase_type') || ''}
                        onValueChange={(value) =>
                          form.setValue('purchase_type', value as 'rent' | 'buy')
                        }
                      >
                        <SelectTrigger className="bg-slate-950">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rent">Rent</SelectItem>
                          <SelectItem value="buy">Buy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Access Duration (hours)</Label>
                    <Input
                      type="number"
                      min="0"
                      disabled={isSubmitting}
                      {...form.register('access_duration_hours', { valueAsNumber: true })}
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label>Genres (comma-separated IDs)</Label>
                <Input disabled={isSubmitting} {...form.register('genres')} />
              </div>

              <div className="space-y-2">
                <Label>Cast (comma-separated IDs)</Label>
                <Input disabled={isSubmitting} {...form.register('cast')} />
              </div>

              <div className="space-y-2">
                <Label>Directors (comma-separated IDs)</Label>
                <Input disabled={isSubmitting} {...form.register('directors')} />
              </div>

              <div className="space-y-2">
                <Label>Tags (comma-separated)</Label>
                <Input disabled={isSubmitting} {...form.register('tags')} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={featuredId}
                    checked={form.watch('is_featured')}
                    onCheckedChange={(checked) => form.setValue('is_featured', checked)}
                    disabled={isSubmitting}
                  />
                  <Label htmlFor={featuredId}>Featured</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={trendingId}
                    checked={form.watch('is_trending')}
                    onCheckedChange={(checked) => form.setValue('is_trending', checked)}
                    disabled={isSubmitting}
                  />
                  <Label htmlFor={trendingId}>Trending</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={comingSoonId}
                    checked={form.watch('is_coming_soon')}
                    onCheckedChange={(checked) => form.setValue('is_coming_soon', checked)}
                    disabled={isSubmitting}
                  />
                  <Label htmlFor={comingSoonId}>Coming Soon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={downloadableId}
                    checked={form.watch('is_downloadable')}
                    onCheckedChange={(checked) => form.setValue('is_downloadable', checked)}
                    disabled={isSubmitting}
                  />
                  <Label htmlFor={downloadableId}>Downloadable</Label>
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
                  value={form.watch('status') || 'published'}
                  onValueChange={(value) =>
                    form.setValue('status', value as 'draft' | 'published')
                  }
                >
                  <SelectTrigger className="bg-slate-950">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter className="pt-2">
            <div className="flex justify-between w-full">
              <div>
                {currentStep > 1 && (
                  <Button type="button" variant="ghost" onClick={handlePrevious}>
                    Previous
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                {currentStep < 3 ? (
                  <Button type="button" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isEdit ? 'Save changes' : 'Create movie'}
                  </Button>
                )}
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

