import { Inbox } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  title?: string
  message?: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
  className?: string
}

/**
 * Empty state component
 * 
 * Per frontend rules 8: All routes must handle Empty states when needed
 */
export function EmptyState({
  title = 'No items found',
  message = 'There are no items to display at this time.',
  actionLabel,
  actionHref,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-20 text-center', className)}>
      <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-md">{message}</p>
      {(actionLabel && actionHref) && (
        <Button asChild>
          <a href={actionHref}>{actionLabel}</a>
        </Button>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  )
}

