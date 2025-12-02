import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { EpisodeDetail } from '../types'
import { useDeleteEpisode } from '../hooks'

interface DeleteEpisodeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  episode: EpisodeDetail | null
}

export function DeleteEpisodeDialog({
  open,
  onOpenChange,
  episode,
}: DeleteEpisodeDialogProps) {
  const deleteMutation = useDeleteEpisode()

  const handleDelete = () => {
    if (!episode) return
    const episodeId = episode.id || episode._id || ''
    deleteMutation.mutate(episodeId, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Episode</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this episode? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-slate-300">
            Deleting: <span className="font-semibold">&quot;{episode?.title}&quot;</span>
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

