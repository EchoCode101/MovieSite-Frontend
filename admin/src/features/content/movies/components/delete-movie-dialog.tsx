import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { MovieDetail } from '../types'
import { useDeleteMovie } from '../hooks'

interface DeleteMovieDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  movie: MovieDetail | null
}

export function DeleteMovieDialog({
  open,
  onOpenChange,
  movie,
}: DeleteMovieDialogProps) {
  const deleteMutation = useDeleteMovie()

  const handleDelete = () => {
    if (!movie) return
    const movieId = movie.id || movie._id || ''
    deleteMutation.mutate(movieId, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Movie</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this movie? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-slate-300">
            Deleting: <span className="font-semibold">&quot;{movie?.title}&quot;</span>
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

