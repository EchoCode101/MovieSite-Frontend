import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { AdminUserDetail } from '../types'
import { useDeleteUser } from '../hooks'

interface DeleteUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: AdminUserDetail | null
  isSelf?: boolean
}

export function DeleteUserDialog({
  open,
  onOpenChange,
  user,
  isSelf,
}: DeleteUserDialogProps) {
  const deleteMutation = useDeleteUser()

  if (!user) return null

  const handleConfirm = () => {
    const id = user.id || user._id || ''
    if (!id) return

    deleteMutation.mutate(id, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete user</DialogTitle>
          <DialogDescription>
            This will permanently remove the user and all associated data
            (comments, reviews, etc.). This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <p className="text-slate-200">
            Are you sure you want to delete{' '}
            <span className="font-semibold">{user.username}</span>?
          </p>
          {isSelf ? (
            <p className="text-xs font-medium text-amber-400">
              You cannot delete your own admin account from here.
            </p>
          ) : null}
        </div>
        <DialogFooter className="pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={deleteMutation.isPending || isSelf}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


