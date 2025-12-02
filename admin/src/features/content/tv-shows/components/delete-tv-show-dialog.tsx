import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { TvShowDetail } from '../types'
import { useDeleteTvShow } from '../hooks'

interface DeleteTvShowDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tvShow: TvShowDetail | null
}

export function DeleteTvShowDialog({
  open,
  onOpenChange,
  tvShow,
}: DeleteTvShowDialogProps) {
  const deleteMutation = useDeleteTvShow()

  const handleDelete = () => {
    if (!tvShow) return
    const tvShowId = tvShow.id || tvShow._id || ''
    deleteMutation.mutate(tvShowId, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete TV Show</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this TV show? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-slate-300">
            Deleting: <span className="font-semibold">&quot;{tvShow?.title}&quot;</span>
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

