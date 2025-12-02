import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { Review } from '../types'
import { useDeleteReview } from '../hooks'

interface DeleteReviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  review: Review | null
}

export function DeleteReviewDialog({
  open,
  onOpenChange,
  review,
}: DeleteReviewDialogProps) {
  const deleteMutation = useDeleteReview()

  const handleDelete = () => {
    if (!review) return
    const reviewId = review.id || review._id || ''
    deleteMutation.mutate(reviewId, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  const contentPreview =
    review?.review_content && review.review_content.length > 50
      ? `${review.review_content.substring(0, 50)}...`
      : review?.review_content

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Review</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this review? This action cannot be undone.
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

