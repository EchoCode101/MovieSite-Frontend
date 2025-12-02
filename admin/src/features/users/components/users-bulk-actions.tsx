import { Button } from '@/components/ui/button'
import type { AdminUserSummary } from '../types'

interface UsersBulkActionsProps {
  selectedIds: string[]
  users: AdminUserSummary[]
  onClearSelection: () => void
  onBulkDelete: () => void
}

function exportUsersToCsv(users: AdminUserSummary[]) {
  if (users.length === 0) return

  const headers = [
    'id',
    'username',
    'email',
    'subscription_plan',
    'role',
    'status',
    'createdAt',
  ]

  const rows = users.map((user) => [
    user.id || user._id || '',
    user.username,
    user.email,
    user.subscription_plan,
    user.role,
    user.status,
    user.createdAt,
  ])

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'users-export.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function UsersBulkActions({
  selectedIds,
  users,
  onClearSelection,
  onBulkDelete,
}: UsersBulkActionsProps) {
  if (selectedIds.length === 0) {
    return null
  }

  const selectedUsers = users.filter((user) =>
    selectedIds.includes(user.id || user._id || ''),
  )

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-3">
      <div className="text-sm text-slate-200">
        {selectedIds.length} user{selectedIds.length > 1 ? 's' : ''} selected
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => exportUsersToCsv(selectedUsers)}
        >
          Export CSV
        </Button>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={onBulkDelete}
        >
          Delete selected
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
        >
          Clear
        </Button>
      </div>
    </div>
  )
}


