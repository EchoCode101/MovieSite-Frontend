import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { useRemoveFromWatchlist } from '../hooks/useWatchlist'
import { getMovieById } from '@/features/movies/api/movies'
import { getTVShowById } from '@/features/tv-shows/api/tv-shows'
import { getEpisodeById } from '@/features/episodes/api/episodes'
import type { WatchlistItem } from '../types'
import { Trash2, Loader2 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { queryKeys } from '@/lib/query-keys'

interface WatchlistItemCardProps {
  item: WatchlistItem
  profileId: string
  className?: string
}

/**
 * Component to display a watchlist item with content details
 * 
 * Fetches content details based on target_type and target_id
 */
export function WatchlistItemCard({ item, profileId, className }: WatchlistItemCardProps) {
  const removeFromWatchlist = useRemoveFromWatchlist()

  // Fetch content details based on type
  const { data: content, isLoading, error } = useQuery({
    queryKey: queryKeys.video.detail(item.target_type, item.target_id),
    queryFn: async () => {
      switch (item.target_type) {
        case 'movie':
          return { type: 'movie' as const, data: await getMovieById(item.target_id) }
        case 'tvshow':
          return { type: 'tvshow' as const, data: await getTVShowById(item.target_id) }
        case 'episode':
          return { type: 'episode' as const, data: await getEpisodeById(item.target_id) }
        default:
          throw new Error(`Unknown target_type: ${item.target_type}`)
      }
    },
    enabled: !!item.target_id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const handleRemove = () => {
    removeFromWatchlist.mutate({
      profile_id: profileId,
      target_type: item.target_type,
      target_id: item.target_id,
    })
  }

  const getContentLink = () => {
    if (!content) return '#'
    switch (content.type) {
      case 'movie':
        return `/movies/${item.target_id}`
      case 'tvshow':
        return `/tv-shows/${item.target_id}`
      case 'episode':
        return `/episodes/${item.target_id}`
      default:
        return '#'
    }
  }

  const getContentTitle = () => {
    if (!content) return 'Loading...'
    return content.data.title || 'Untitled'
  }

  const getContentThumbnail = () => {
    if (!content) return ''
    if (content.type === 'movie') {
      return content.data.thumbnail_url || content.data.poster_url || ''
    }
    if (content.type === 'tvshow') {
      return content.data.thumbnail_url || content.data.poster_url || ''
    }
    if (content.type === 'episode') {
      return content.data.thumbnail_url || ''
    }
    return ''
  }

  const getContentDescription = () => {
    if (!content) return ''
    return content.data.description || ''
  }

  if (isLoading) {
    return (
      <Card className={cn('overflow-hidden', className)}>
        <CardContent className="p-0">
          <Skeleton className="w-full aspect-video" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !content) {
    return (
      <Card className={cn('overflow-hidden', className)}>
        <CardContent className="p-4">
          <p className="text-sm text-destructive">
            Failed to load {item.target_type}: {item.target_id}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn('overflow-hidden hover:shadow-lg transition-shadow', className)}>
      <Link to={getContentLink()}>
        <CardContent className="p-0">
          <div className="relative aspect-video overflow-hidden">
            <ImageWithFallback
              src={getContentThumbnail()}
              alt={getContentTitle()}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{getContentTitle()}</h3>
            {getContentDescription() && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {getContentDescription()}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Added {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="pt-0">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleRemove}
          disabled={removeFromWatchlist.isPending}
        >
          {removeFromWatchlist.isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Removing...
            </>
          ) : (
            <>
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

