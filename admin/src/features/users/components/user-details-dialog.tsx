import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { AdminUserDetail } from '../types'
import { SubscriptionBadge } from './subscription-badge'

interface UserDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: AdminUserDetail | null
}

export function UserDetailsDialog({
  open,
  onOpenChange,
  user,
}: UserDetailsDialogProps) {
  if (!user) return null

  const fullName =
    user.first_name || user.last_name
      ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
      : null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User details</DialogTitle>
          <DialogDescription>
            View detailed information about this user.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          <div>
            <div className="text-xs uppercase text-slate-500">Username</div>
            <div className="font-medium text-slate-100">{user.username}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-slate-500">Email</div>
            <div className="text-slate-100">{user.email}</div>
          </div>
          {fullName ? (
            <div>
              <div className="text-xs uppercase text-slate-500">Name</div>
              <div className="text-slate-100">{fullName}</div>
            </div>
          ) : null}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs uppercase text-slate-500">Role</div>
              <div className="text-slate-100 capitalize">{user.role}</div>
            </div>
            <div>
              <div className="text-xs uppercase text-slate-500">Status</div>
              <div className="text-slate-100">{user.status}</div>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase text-slate-500">Plan</div>
            <SubscriptionBadge plan={user.subscription_plan} />
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-400">
            <div>
              <div className="uppercase">Created</div>
              <div>{new Date(user.createdAt).toLocaleString()}</div>
            </div>
            <div>
              <div className="uppercase">Updated</div>
              <div>{new Date(user.updatedAt).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


