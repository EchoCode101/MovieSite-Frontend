import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useBulkDeleteReviews } from '../hooks'

interface BulkDeleteReviewsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reviewIds: string[]
  onSuccess?: () => void
}

export function BulkDeleteReviewsDialog({
  open,
  onOpenChange,
  reviewIds,
  onSuccess,
}: BulkDeleteReviewsDialogProps) {
  const bulkDeleteMutation = useBulkDeleteReviews()

  const handleBulkDelete = () => {
    if (reviewIds.length === 0) return
    bulkDeleteMutation.mutate(reviewIds, {
      onSuccess: () => {
        onOpenChange(false)
        onSuccess?.()
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Reviews</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {reviewIds.length} review
            {reviewIds.length > 1 ? 's' : ''}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleBulkDelete}
            disabled={bulkDeleteMutation.isPending}
          >
            {bulkDeleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

