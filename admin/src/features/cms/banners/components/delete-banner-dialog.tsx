import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import type { Banner } from '../types'
import { useDeleteBanner } from '../hooks'

interface DeleteBannerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  banner?: Banner | null
}

export function DeleteBannerDialog({
  open,
  onOpenChange,
  banner,
}: DeleteBannerDialogProps) {
  const deleteMutation = useDeleteBanner()

  const handleConfirm = () => {
    if (!banner) return
    const id = banner.id || banner._id || ''
    if (!id) return

    deleteMutation.mutate(id, {
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
          <DialogTitle>Delete banner</DialogTitle>
          <DialogDescription>
            {banner
              ? `Are you sure you want to delete the banner "${banner.title || banner.image_url}"? This action cannot be undone.`
              : 'Are you sure you want to delete this banner? This action cannot be undone.'}
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


