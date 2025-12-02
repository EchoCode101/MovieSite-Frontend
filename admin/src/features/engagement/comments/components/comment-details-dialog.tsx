import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import type { Comment } from '../types'

interface CommentDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  comment: Comment | null
}

function getTargetDisplayName(comment: Comment | null): string {
  if (!comment) return 'Unknown'
  const target = comment.target || comment.video
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

export function CommentDetailsDialog({
  open,
  onOpenChange,
  comment,
}: CommentDetailsDialogProps) {
  if (!comment) return null

  const author = comment.member
  const authorName = author
    ? `${author.first_name || ''} ${author.last_name || ''}`.trim() ||
      author.username ||
      'Unknown'
    : 'Unknown'
  const target = comment.target || comment.video

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Comment Details</DialogTitle>
          <DialogDescription>
            View detailed information about this comment.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-400">Content</h3>
            <p className="text-slate-200 whitespace-pre-wrap">{comment.content}</p>
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
              <p className="text-slate-200">{getTargetDisplayName(comment)}</p>
              <Badge className="bg-blue-500/20 text-blue-300">
                {getTargetTypeLabel(comment.target_type)}
              </Badge>
            </div>
          </div>

          {target?.thumbnail_url && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400">Target Thumbnail</h3>
              <img
                src={target.thumbnail_url}
                alt={getTargetDisplayName(comment)}
                className="h-32 w-auto rounded object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400">Likes</h3>
              <p className="text-slate-200">{comment.likesCount || 0}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400">Dislikes</h3>
              <p className="text-slate-200">{comment.dislikesCount || 0}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400">Created</h3>
              <p className="text-slate-200">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

