import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { VideoDetail } from '../types'
import { useDeleteVideo } from '../hooks'

interface DeleteVideoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  video: VideoDetail | null
}

export function DeleteVideoDialog({
  open,
  onOpenChange,
  video,
}: DeleteVideoDialogProps) {
  const deleteMutation = useDeleteVideo()

  const handleDelete = () => {
    if (!video) return
    const videoId = video.id || video._id || ''
    deleteMutation.mutate(videoId, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Video</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this video? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-slate-300">
            Deleting: <span className="font-semibold">&quot;{video?.title}&quot;</span>
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

