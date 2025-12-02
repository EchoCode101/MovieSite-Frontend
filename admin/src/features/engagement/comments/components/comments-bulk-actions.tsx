import { Button } from '@/components/ui/button'

interface CommentsBulkActionsProps {
  selectedIds: string[]
  onClearSelection: () => void
  onBulkDelete: () => void
}

export function CommentsBulkActions({
  selectedIds,
  onClearSelection,
  onBulkDelete,
}: CommentsBulkActionsProps) {
  if (selectedIds.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-3">
      <div className="text-sm text-slate-200">
        {selectedIds.length} comment{selectedIds.length > 1 ? 's' : ''} selected
      </div>
      <div className="flex flex-wrap gap-2">
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

