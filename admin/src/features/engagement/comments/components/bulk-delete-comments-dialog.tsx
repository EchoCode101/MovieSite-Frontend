import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useBulkDeleteComments } from '../hooks'

interface BulkDeleteCommentsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  commentIds: string[]
  onSuccess?: () => void
}

export function BulkDeleteCommentsDialog({
  open,
  onOpenChange,
  commentIds,
  onSuccess,
}: BulkDeleteCommentsDialogProps) {
  const bulkDeleteMutation = useBulkDeleteComments()

  const handleBulkDelete = () => {
    if (commentIds.length === 0) return
    bulkDeleteMutation.mutate(commentIds, {
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
          <DialogTitle>Delete Comments</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {commentIds.length} comment
            {commentIds.length > 1 ? 's' : ''}? This action cannot be undone.
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

