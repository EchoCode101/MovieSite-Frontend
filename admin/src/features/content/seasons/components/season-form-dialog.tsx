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
import type { SeasonDetail } from '../types'
import { useCreateSeason, useUpdateSeason } from '../hooks'
import { useAllTvShows } from '@/features/content/tv-shows/hooks'

const seasonSchema = z.object({
  tv_show_id: z.string().min(1, 'TV show is required'),
  season_number: z.number().min(1, 'Season number must be at least 1'),
  name: z.string().optional(),
  description: z.string().optional(),
  poster_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  release_date: z.string().optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  status: z.enum(['draft', 'published']).optional(),
})

type SeasonFormValues = z.infer<typeof seasonSchema>

interface SeasonFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  season?: SeasonDetail | null
  tvShowId?: string
}

export function SeasonFormDialog({
  open,
  onOpenChange,
  mode,
  season,
  tvShowId,
}: SeasonFormDialogProps) {
  const isEdit = mode === 'edit' && season
  const { data: tvShows = [] } = useAllTvShows()

  const form = useForm<SeasonFormValues>({
    resolver: zodResolver(seasonSchema),
    defaultValues: {
      tv_show_id: season?.tv_show_id || tvShowId || '',
      season_number: season?.season_number || 1,
      name: season?.name || '',
      description: season?.description || '',
      poster_url: season?.poster_url || '',
      release_date: season?.release_date
        ? new Date(season.release_date).toISOString().split('T')[0]
        : '',
      seo_title: season?.seo_title || '',
      seo_description: season?.seo_description || '',
      status: season?.status || 'published',
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        tv_show_id: season?.tv_show_id || tvShowId || '',
        season_number: season?.season_number || 1,
        name: season?.name || '',
        description: season?.description || '',
        poster_url: season?.poster_url || '',
        release_date: season?.release_date
          ? new Date(season.release_date).toISOString().split('T')[0]
          : '',
        seo_title: season?.seo_title || '',
        seo_description: season?.seo_description || '',
        status: season?.status || 'published',
      } as SeasonFormValues)
    }
  }, [open, season, tvShowId, form])

  const createMutation = useCreateSeason()
  const updateMutation = useUpdateSeason()

  const isSubmitting = createMutation.isPending || updateMutation.isPending

  const onSubmit = (values: SeasonFormValues) => {
    const payload = {
      ...values,
      release_date: values.release_date ? new Date(values.release_date).toISOString() : undefined,
    }

    if (isEdit && season) {
      const seasonId = season.id || season._id || ''
      const { tv_show_id: _tvShowId, season_number: _seasonNumber, ...updatePayload } = payload
      updateMutation.mutate(
        { id: seasonId, payload: updatePayload },
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
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit season' : 'Create season'}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update season information and settings.' : 'Create a new season for the selected TV show.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {!isEdit && (
            <div className="space-y-2">
              <Label>TV Show *</Label>
              <Select
                value={form.watch('tv_show_id')}
                onValueChange={(val) => form.setValue('tv_show_id', val)}
                disabled={!!tvShowId || isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select TV show" />
                </SelectTrigger>
                <SelectContent>
                  {tvShows.map((tvShow) => {
                    const showId = tvShow.id || tvShow._id || ''
                    return (
                      <SelectItem key={showId} value={showId}>
                        {tvShow.title}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              {form.formState.errors.tv_show_id ? (
                <p className="text-sm text-red-500">
                  {form.formState.errors.tv_show_id.message}
                </p>
              ) : null}
            </div>
          )}

          {!isEdit && (
            <div className="space-y-2">
              <Label>Season Number *</Label>
              <Input
                type="number"
                min="1"
                disabled={isSubmitting}
                {...form.register('season_number', { valueAsNumber: true })}
              />
              {form.formState.errors.season_number ? (
                <p className="text-sm text-red-500">
                  {form.formState.errors.season_number.message}
                </p>
              ) : null}
            </div>
          )}

          <div className="space-y-2">
            <Label>Name</Label>
            <Input disabled={isSubmitting} {...form.register('name')} />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea disabled={isSubmitting} {...form.register('description')} />
          </div>

          <div className="space-y-2">
            <Label>Poster URL</Label>
            <Input disabled={isSubmitting} {...form.register('poster_url')} />
          </div>

          <div className="space-y-2">
            <Label>Release Date</Label>
            <Input
              type="date"
              disabled={isSubmitting}
              {...form.register('release_date')}
            />
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

