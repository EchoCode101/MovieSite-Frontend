import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface SubscriptionBadgeProps {
  plan: string
  className?: string
}

const planColors: Record<string, string> = {
  Free: 'bg-slate-500',
  Basic: 'bg-blue-500',
  Premium: 'bg-purple-500',
  Ultimate: 'bg-amber-500',
}

export function SubscriptionBadge({
  plan,
  className,
}: SubscriptionBadgeProps) {
  const colorClass = planColors[plan] || 'bg-slate-500'

  return (
    <Badge
      variant="default"
      className={cn(colorClass, 'text-white', className)}
    >
      {plan}
    </Badge>
  )
}

