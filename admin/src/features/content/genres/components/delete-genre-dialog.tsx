import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { Genre } from '../types'
import { useDeleteGenre } from '../hooks'

interface DeleteGenreDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  genre: Genre | null
}

export function DeleteGenreDialog({
  open,
  onOpenChange,
  genre,
}: DeleteGenreDialogProps) {
  const deleteMutation = useDeleteGenre()

  const handleDelete = () => {
    if (!genre) return
    const genreId = genre.id || genre._id || ''
    deleteMutation.mutate(genreId, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Genre</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this genre? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-slate-300">
            Deleting: <span className="font-semibold">&quot;{genre?.name}&quot;</span>
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

