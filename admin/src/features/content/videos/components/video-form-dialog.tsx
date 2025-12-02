import { useEffect, useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import type { VideoDetail } from '../types'
import { useCreateVideo, useUpdateVideo } from '../hooks'
import { VideoUpload } from './video-upload'
import type { UploadResult } from '../types'

const videoSchemaBase = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  video_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  thumbnail_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  category: z.string().optional(),
  language: z.string().optional(),
  access_level: z.string().optional(),
  published: z.boolean().optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  tags: z.string().optional(),
})

const createVideoSchema = videoSchemaBase.extend({
  video_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
})

const updateVideoSchema = videoSchemaBase

type CreateVideoFormValues = z.infer<typeof createVideoSchema>
type UpdateVideoFormValues = z.infer<typeof updateVideoSchema>

type VideoFormValues = CreateVideoFormValues | UpdateVideoFormValues

interface VideoFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  video?: VideoDetail | null
}

export function VideoFormDialog({
  open,
  onOpenChange,
  mode,
  video,
}: VideoFormDialogProps) {
  const titleId = useId()
  const descriptionId = useId()
  const videoUrlId = useId()
  const thumbnailUrlId = useId()
  const categoryId = useId()
  const languageId = useId()
  const accessLevelId = useId()
  const seoTitleId = useId()
  const seoDescriptionId = useId()
  const tagsId = useId()
  const publishedId = useId()

  const isEdit = mode === 'edit' && video
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null)

  const form = useForm<VideoFormValues>({
    resolver: zodResolver(isEdit ? updateVideoSchema : createVideoSchema),
    defaultValues: {
      title: video?.title ?? '',
      description: video?.description ?? '',
      video_url: video?.video_url ?? '',
      thumbnail_url: video?.thumbnail_url ?? '',
      category: video?.category ?? '',
      language: video?.language ?? '',
      access_level: video?.access_level ?? 'Free',
      published: video?.published ?? true,
      seo_title: video?.seo_title ?? '',
      seo_description: video?.seo_description ?? '',
      tags: video?.tags?.join(', ') ?? '',
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        title: video?.title ?? '',
        description: video?.description ?? '',
        video_url: video?.video_url ?? '',
        thumbnail_url: video?.thumbnail_url ?? '',
        category: video?.category ?? '',
        language: video?.language ?? '',
        access_level: video?.access_level ?? 'Free',
        published: video?.published ?? true,
        seo_title: video?.seo_title ?? '',
        seo_description: video?.seo_description ?? '',
        tags: video?.tags?.join(', ') ?? '',
      } as VideoFormValues)
      setUploadedVideoUrl(null)
    }
  }, [open, video, form])

  const createMutation = useCreateVideo()
  const updateMutation = useUpdateVideo()

  const isSubmitting = createMutation.isPending || updateMutation.isPending

  const handleUploadComplete = (result: UploadResult) => {
    setUploadedVideoUrl(result.secure_url)
    form.setValue('video_url', result.secure_url)
  }

  const onSubmit = (values: VideoFormValues) => {
    const videoUrl = uploadedVideoUrl || values.video_url
    const tags = values.tags ? values.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : undefined

    if (isEdit && video) {
      const videoId = video.id || video._id || ''
      updateMutation.mutate(
        {
          id: videoId,
          payload: {
            ...values,
            video_url: videoUrl,
            tags,
          },
        },
        {
          onSuccess: () => {
            onOpenChange(false)
          },
        },
      )
    } else {
      if (!videoUrl) {
        form.setError('video_url', {
          type: 'manual',
          message: 'Video URL is required. Please upload a video or provide a URL.',
        })
        return
      }
      createMutation.mutate(
        {
          ...values,
          video_url: videoUrl,
          tags,
        },
        {
          onSuccess: () => {
            onOpenChange(false)
            form.reset()
            setUploadedVideoUrl(null)
          },
        },
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit video' : 'Create video'}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update video information and settings.' : 'Create a new video with title, description, and metadata.'}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor={titleId}>Title *</Label>
            <Input
              id={titleId}
              disabled={isSubmitting}
              {...form.register('title')}
            />
            {form.formState.errors.title ? (
              <p className="text-sm text-red-500">
                {form.formState.errors.title.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor={descriptionId}>Description</Label>
            <Textarea
              id={descriptionId}
              disabled={isSubmitting}
              {...form.register('description')}
            />
            {form.formState.errors.description ? (
              <p className="text-sm text-red-500">
                {form.formState.errors.description.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label>Upload Video</Label>
            <VideoUpload
              onUploadComplete={handleUploadComplete}
              onError={(error) => {
                form.setError('video_url', { type: 'manual', message: error.message })
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={videoUrlId}>Video URL</Label>
            <Input
              id={videoUrlId}
              type="url"
              disabled={isSubmitting}
              {...form.register('video_url')}
              placeholder="https://example.com/video.mp4"
            />
            {form.formState.errors.video_url ? (
              <p className="text-sm text-red-500">
                {form.formState.errors.video_url.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor={thumbnailUrlId}>Thumbnail URL</Label>
            <Input
              id={thumbnailUrlId}
              type="url"
              disabled={isSubmitting}
              {...form.register('thumbnail_url')}
              placeholder="https://example.com/thumb.jpg"
            />
            {form.formState.errors.thumbnail_url ? (
              <p className="text-sm text-red-500">
                {form.formState.errors.thumbnail_url.message}
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={categoryId}>Category</Label>
              <Input
                id={categoryId}
                disabled={isSubmitting}
                {...form.register('category')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={languageId}>Language</Label>
              <Input
                id={languageId}
                disabled={isSubmitting}
                {...form.register('language')}
                placeholder="en"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={accessLevelId}>Access Level</Label>
            <Input
              id={accessLevelId}
              disabled={isSubmitting}
              {...form.register('access_level')}
              placeholder="Free"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id={publishedId}
              checked={form.watch('published')}
              onCheckedChange={(checked) => form.setValue('published', checked)}
              disabled={isSubmitting}
            />
            <Label htmlFor={publishedId}>Published</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor={tagsId}>Tags (comma-separated)</Label>
            <Input
              id={tagsId}
              disabled={isSubmitting}
              {...form.register('tags')}
              placeholder="tag1, tag2, tag3"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={seoTitleId}>SEO Title</Label>
            <Input
              id={seoTitleId}
              disabled={isSubmitting}
              {...form.register('seo_title')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={seoDescriptionId}>SEO Description</Label>
            <Textarea
              id={seoDescriptionId}
              disabled={isSubmitting}
              {...form.register('seo_description')}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isEdit ? 'Save changes' : 'Create video'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

