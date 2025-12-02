import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { Comment } from '../types'
import { useDeleteComment } from '../hooks'

interface DeleteCommentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  comment: Comment | null
}

export function DeleteCommentDialog({
  open,
  onOpenChange,
  comment,
}: DeleteCommentDialogProps) {
  const deleteMutation = useDeleteComment()

  const handleDelete = () => {
    if (!comment) return
    const commentId = comment.id || comment._id || ''
    deleteMutation.mutate(commentId, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  const contentPreview =
    comment?.content && comment.content.length > 50
      ? `${comment.content.substring(0, 50)}...`
      : comment?.content

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Comment</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this comment? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {contentPreview && (
            <div className="mt-3 rounded bg-slate-800/50 p-3">
              <p className="text-sm text-slate-400 italic">&quot;{contentPreview}&quot;</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

