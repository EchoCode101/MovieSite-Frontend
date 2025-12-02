import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import type { Coupon } from '../types'
import { useDeleteCoupon } from '../hooks'

interface DeleteCouponDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  coupon?: Coupon | null
}

export function DeleteCouponDialog({
  open,
  onOpenChange,
  coupon,
}: DeleteCouponDialogProps) {
  const deleteMutation = useDeleteCoupon()

  const handleConfirm = () => {
    if (!coupon) return
    const id = coupon.id || coupon._id || ''
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
          <DialogTitle>Delete coupon</DialogTitle>
          <DialogDescription>
            {coupon
              ? `Are you sure you want to delete the "${coupon.code}" coupon? This action cannot be undone.`
              : 'Are you sure you want to delete this coupon? This action cannot be undone.'}
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


