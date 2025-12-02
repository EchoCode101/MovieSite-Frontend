import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import type { Review } from '../types'

interface ReviewDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  review: Review | null
}

function getTargetDisplayName(review: Review | null): string {
  if (!review) return 'Unknown'
  const target = review.target || review.video
  if (target?.title) return target.title
  if (target?.name) return target.name
  return 'Unknown'
}

function getTargetTypeLabel(type?: string): string {
  switch (type) {
    case 'video':
      return 'Video'
    case 'movie':
      return 'Movie'
    case 'tvshow':
      return 'TV Show'
    case 'episode':
      return 'Episode'
    default:
      return 'Unknown'
  }
}

function renderStars(rating: number) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-slate-600'
          }`}
        />
      ))}
      <span className="ml-2 text-lg font-semibold text-slate-200">({rating}/5)</span>
    </div>
  )
}

export function ReviewDetailsDialog({
  open,
  onOpenChange,
  review,
}: ReviewDetailsDialogProps) {
  if (!review) return null

  const author = review.member
  const authorName = author
    ? `${author.first_name || ''} ${author.last_name || ''}`.trim() ||
      author.username ||
      'Unknown'
    : 'Unknown'
  const target = review.target || review.video

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
          <DialogDescription>
            View detailed information about this review.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-400">Rating</h3>
            {renderStars(review.rating)}
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-400">Content</h3>
            <p className="text-slate-200 whitespace-pre-wrap">{review.review_content}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400">Author</h3>
              <p className="text-slate-200">{authorName}</p>
              {author?.email && (
                <p className="text-sm text-slate-400">{author.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400">Target Content</h3>
              <p className="text-slate-200">{getTargetDisplayName(review)}</p>
              <Badge className="bg-blue-500/20 text-blue-300">
                {getTargetTypeLabel(review.target_type)}
              </Badge>
            </div>
          </div>

          {target?.thumbnail_url && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400">Target Thumbnail</h3>
              <img
                src={target.thumbnail_url}
                alt={getTargetDisplayName(review)}
                className="h-32 w-auto rounded object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400">Likes</h3>
              <p className="text-slate-200">{review.likesCount || 0}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400">Dislikes</h3>
              <p className="text-slate-200">{review.dislikesCount || 0}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400">Created</h3>
              <p className="text-slate-200">
                {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

