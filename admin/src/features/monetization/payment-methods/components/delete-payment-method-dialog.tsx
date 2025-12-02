import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import type { PaymentMethod } from '../types'
import { useDeletePaymentMethod } from '../hooks'

interface DeletePaymentMethodDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  method?: PaymentMethod | null
}

export function DeletePaymentMethodDialog({
  open,
  onOpenChange,
  method,
}: DeletePaymentMethodDialogProps) {
  const deleteMutation = useDeletePaymentMethod()

  const handleConfirm = () => {
    if (!method) return
    const id = method.id || method._id || ''
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
          <DialogTitle>Delete payment method</DialogTitle>
          <DialogDescription>
            {method
              ? `Are you sure you want to delete "${method.display_name || method.name}"? This action cannot be undone.`
              : 'Are you sure you want to delete this payment method? This action cannot be undone.'}
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


