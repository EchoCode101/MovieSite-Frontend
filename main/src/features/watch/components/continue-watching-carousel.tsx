import { Link } from '@tanstack/react-router'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { WatchProgressIndicator } from './watch-progress-indicator'
import { useContinueWatching } from '../hooks/useWatchHistory'
import { getActiveProfileId } from '@/features/profiles/components/profile-selector'
import { LoadingState } from '@/components/common/loading-state'
import { EmptyState } from '@/components/common/empty-state'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface ContinueWatchingCarouselProps {
  profileId?: string
  limit?: number
  className?: string
}

/**
 * Component to display continue watching items in a carousel
 * 
 * Shows items with progress indicators and links to resume watching
 */
export function ContinueWatchingCarousel({
  profileId,
  limit = 10,
  className,
}: ContinueWatchingCarouselProps) {
  const activeProfileId = profileId || getActiveProfileId()
  const { data: items, isLoading, error } = useContinueWatching(
    activeProfileId || '',
    limit
  )

  if (!activeProfileId) {
    return null
  }

  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        <h2 className="text-2xl font-bold">Continue Watching</h2>
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="min-w-[200px]">
              <Skeleton className="w-full aspect-video rounded-lg" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return null // Silently fail - don't show error for continue watching
  }

  if (!items || items.length === 0) {
    return null // Don't show empty state - just don't render
  }

  const getContentLink = (item: typeof items[0]) => {
    if (item.target_type === 'movie') {
      return `/watch/${item.target_id}`
    }
    if (item.target_type === 'episode') {
      return `/episodes/${item.target_id}`
    }
    return '#'
  }

  return (
    <div className={cn('space-y-4', className)}>
      <h2 className="text-2xl font-bold">Continue Watching</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item) => (
            <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Link to={getContentLink(item)}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative aspect-video overflow-hidden">
                      <ImageWithFallback
                        src={item.content.thumbnail_url || ''}
                        alt={item.content.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                        <WatchProgressIndicator
                          watchedSeconds={item.watched_seconds}
                          totalSeconds={item.total_seconds}
                          showPercentage={false}
                          className="text-white"
                        />
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                        {item.content.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {Math.round(item.progress_percent)}% watched
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

