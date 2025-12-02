import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import type { Plan } from '../types'
import { useDeletePlan } from '../hooks'

interface DeletePlanDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  plan?: Plan | null
}

export function DeletePlanDialog({
  open,
  onOpenChange,
  plan,
}: DeletePlanDialogProps) {
  const deleteMutation = useDeletePlan()

  const handleConfirm = () => {
    if (!plan) return
    const id = plan.id || plan._id || ''
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
          <DialogTitle>Delete subscription plan</DialogTitle>
          <DialogDescription>
            {plan
              ? `Are you sure you want to delete the "${plan.name}" plan? This action cannot be undone.`
              : 'Are you sure you want to delete this plan? This action cannot be undone.'}
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


