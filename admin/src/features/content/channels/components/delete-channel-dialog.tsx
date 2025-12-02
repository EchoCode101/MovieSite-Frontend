import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { Channel } from '../types'
import { useDeleteChannel } from '../hooks'

interface DeleteChannelDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  channel: Channel | null
}

export function DeleteChannelDialog({
  open,
  onOpenChange,
  channel,
}: DeleteChannelDialogProps) {
  const deleteMutation = useDeleteChannel()

  const handleDelete = () => {
    if (!channel) return
    const channelId = channel.id || channel._id || ''
    deleteMutation.mutate(channelId, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Channel</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this channel? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-slate-300">
            Deleting: <span className="font-semibold">&quot;{channel?.name}&quot;</span>
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

