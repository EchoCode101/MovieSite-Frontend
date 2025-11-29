import { cn } from '@/lib/utils'

interface WatchProgressIndicatorProps {
  watchedSeconds: number
  totalSeconds: number
  showPercentage?: boolean
  className?: string
}

/**
 * Component to display watch progress as a progress bar
 * 
 * @param watchedSeconds - Number of seconds watched
 * @param totalSeconds - Total number of seconds
 * @param showPercentage - Whether to show percentage text
 * @param className - Additional CSS classes
 */
export function WatchProgressIndicator({
  watchedSeconds,
  totalSeconds,
  showPercentage = true,
  className,
}: WatchProgressIndicatorProps) {
  const progress = totalSeconds > 0 ? (watchedSeconds / totalSeconds) * 100 : 0
  const percentage = Math.round(progress)

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-1">
        {showPercentage && (
          <span className="text-xs text-muted-foreground">{percentage}%</span>
        )}
        <span className="text-xs text-muted-foreground">
          {formatTime(watchedSeconds)} / {formatTime(totalSeconds)}
        </span>
      </div>
      <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

/**
 * Format seconds to HH:MM:SS or MM:SS format
 */
function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

