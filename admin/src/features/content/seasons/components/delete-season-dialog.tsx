import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { SeasonDetail } from '../types'
import { useDeleteSeason } from '../hooks'

interface DeleteSeasonDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  season: SeasonDetail | null
}

export function DeleteSeasonDialog({
  open,
  onOpenChange,
  season,
}: DeleteSeasonDialogProps) {
  const deleteMutation = useDeleteSeason()

  const handleDelete = () => {
    if (!season) return
    const seasonId = season.id || season._id || ''
    deleteMutation.mutate(seasonId, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Season</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this season? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-slate-300">
            Deleting: <span className="font-semibold">&quot;{season?.name || `Season ${season?.season_number}`}&quot;</span>
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

