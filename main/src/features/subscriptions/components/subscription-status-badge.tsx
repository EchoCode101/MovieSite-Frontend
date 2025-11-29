import { Badge } from '@/components/ui/badge'
import type { Subscription } from '../types'
import { cn } from '@/lib/utils'

interface SubscriptionStatusBadgeProps {
  status: Subscription['status']
  className?: string
}

/**
 * Component to display subscription status with appropriate styling
 */
export function SubscriptionStatusBadge({ status, className }: SubscriptionStatusBadgeProps) {
  const getVariant = () => {
    switch (status) {
      case 'active':
        return 'default'
      case 'cancelled':
        return 'secondary'
      case 'expired':
        return 'destructive'
      case 'pending':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  return (
    <Badge variant={getVariant()} className={cn('capitalize', className)}>
      {status}
    </Badge>
  )
}

