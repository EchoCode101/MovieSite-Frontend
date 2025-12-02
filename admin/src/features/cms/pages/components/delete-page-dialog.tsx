import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import type { Page } from '../types'
import { useDeletePage } from '../hooks'

interface DeletePageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  page?: Page | null
}

export function DeletePageDialog({
  open,
  onOpenChange,
  page,
}: DeletePageDialogProps) {
  const deleteMutation = useDeletePage()

  const handleConfirm = () => {
    if (!page) return

    deleteMutation.mutate(page.slug, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  const isLoading = deleteMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete page</DialogTitle>
          <DialogDescription>
            {page
              ? `Are you sure you want to delete the page "${page.title}"? This action cannot be undone.`
              : 'Are you sure you want to delete this page? This action cannot be undone.'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


