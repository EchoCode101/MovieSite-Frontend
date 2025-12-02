import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { CastCrew } from '../types'
import { useDeleteCastCrew } from '../hooks'

interface DeleteCastCrewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  castCrew: CastCrew | null
}

export function DeleteCastCrewDialog({
  open,
  onOpenChange,
  castCrew,
}: DeleteCastCrewDialogProps) {
  const deleteMutation = useDeleteCastCrew()

  const handleDelete = () => {
    if (!castCrew) return
    const memberId = castCrew.id || castCrew._id || ''
    deleteMutation.mutate(memberId, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Cast/Crew Member</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this cast/crew member? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-slate-300">
            Deleting: <span className="font-semibold">&quot;{castCrew?.name}&quot;</span>
          </p>
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

