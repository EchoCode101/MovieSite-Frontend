import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import type { Tax } from '../types'
import { useDeleteTax } from '../hooks'

interface DeleteTaxDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tax?: Tax | null
}

export function DeleteTaxDialog({
  open,
  onOpenChange,
  tax,
}: DeleteTaxDialogProps) {
  const deleteMutation = useDeleteTax()

  const handleConfirm = () => {
    if (!tax) return
    const id = tax.id || tax._id || ''
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
          <DialogTitle>Delete tax</DialogTitle>
          <DialogDescription>
            {tax
              ? `Are you sure you want to delete the "${tax.name}" tax? This action cannot be undone.`
              : 'Are you sure you want to delete this tax? This action cannot be undone.'}
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


