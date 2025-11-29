import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingStateProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  message?: string
}

/**
 * Loading state component
 * 
 * Per frontend rules 8: All routes must handle Loading states
 */
export function LoadingState({ className, size = 'md', message }: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div className={cn('flex flex-col items-center justify-center py-20', className)}>
      <Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />
      {message && <p className="mt-4 text-muted-foreground">{message}</p>}
    </div>
  )
}

