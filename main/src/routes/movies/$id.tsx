import { createFileRoute } from '@tanstack/react-router'
import { useMovie } from '@/features/movies/hooks/useMovies'
import { Loader2 } from 'lucide-react'
import { VideoPlayer } from '@/features/videos/components/video-player'
import { CommentList } from '@/features/comments/components/comment-list'
import { ReviewList } from '@/features/comments/components/review-list'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import {
  useLikeDislikeCounts,
  useToggleLikeDislike,
  useUserReaction,
} from '@/features/likes/hooks/useLikes'
import { useUser } from '@/features/auth/hooks/useAuth'
import { useActiveSubscription } from '@/features/subscriptions/hooks/useSubscriptions'
import { usePPVAccess } from '@/features/pay-per-view/hooks/usePayPerView'
import { canAccessContent, hasPPVAccess } from '@/features/auth/utils/access-control'
import { PPVPurchaseButton } from '@/features/pay-per-view/components/ppv-purchase-button'
import type { Video } from '@/features/videos/types'

export const Route = createFileRoute('/movies/$id')({
  component: MovieDetailPage,
})

function MovieDetailPage() {
  const { id } = Route.useParams()
  const { data: movie, isLoading, error } = useMovie(id)
  const { data: user } = useUser()
  const { data: activeSubscription } = useActiveSubscription()
  const { data: ppvAccess } = usePPVAccess('movie', id)

  // Check access
  // Pass both activeSubscription plan name and user's subscription_plan field as fallback
  const hasAccess = movie
    ? canAccessContent(
        activeSubscription?.plan?.name as any,
        movie.plan_ids,
        movie.access_type,
        user?.subscription_plan as any
      ) || (movie.access_type === 'pay_per_view' && hasPPVAccess(ppvAccess?.hasAccess || false, ppvAccess?.purchaseType, ppvAccess?.expiresAt))
    : false

  // Like/Dislike functionality
  const { data: likeCounts } = useLikeDislikeCounts('video', id)
  const { data: userReaction } = useUserReaction('video', id)
  const toggleLike = useToggleLikeDislike()

  const handleLike = () => {
    toggleLike.mutate({
      target_id: id,
      target_type: 'video',
      is_like: true,
    })
  }

  const handleDislike = () => {
    toggleLike.mutate({
      target_id: id,
      target_type: 'video',
      is_like: false,
    })
  }

  if (isLoading)
    return (
      <div className="container mx-auto py-8 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
      </div>
    )

  if (error)
    return (
      <div className="container mx-auto py-8 text-center text-destructive">
        Error loading movie: {error.message}
      </div>
    )

  if (!movie)
    return (
      <div className="container mx-auto py-8 text-center">Movie not found</div>
    )

  // Transform movie to video format for VideoPlayer
  const video: Video = {
    id: movie.id,
    title: movie.title,
    description: movie.description || '',
    thumbnailUrl: movie.thumbnail_url || '',
    videoUrl: movie.video_url || '',
    duration: movie.duration,
    category: movie.genres?.[0] || 'Unknown',
    accessLevel: movie.access_type === 'free' ? 'Free' : movie.access_type === 'subscription' ? 'Premium' : 'Premium',
    isPremium: movie.access_type !== 'free',
    rating: movie.rating,
    views: 0,
    createdAt: movie.createdAt || new Date().toISOString(),
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-5xl mx-auto">
        {/* Access Control Check */}
        {!hasAccess && (
          <div className="mb-6 p-4 bg-muted rounded-lg">
            {movie.access_type === 'pay_per_view' ? (
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  This content requires purchase. Please purchase to watch.
                </p>
                <PPVPurchaseButton content={movie} contentType="movie" />
              </div>
            ) : (
              <>
                <p className="text-center text-muted-foreground">
                  This content requires a subscription. Please upgrade your plan to watch.
                </p>
                <div className="flex justify-center mt-4">
                  <Button asChild>
                    <a href="/pricing">Upgrade Plan</a>
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Video Player - Only show if user has access */}
        {hasAccess && (
          <VideoPlayer
            video={video}
            contentType="movie"
            contentId={movie.id}
          />
        )}

        {/* Movie Info */}
        <div className="mt-6">
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            {movie.rating && <span>⭐ {movie.rating.toFixed(1)}</span>}
            {movie.release_date && (
              <span>• {new Date(movie.release_date).getFullYear()}</span>
            )}
            {movie.duration && (
              <span>• {Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
            )}
          </div>
          <p className="mt-4 text-muted-foreground whitespace-pre-wrap">
            {movie.description}
          </p>

          {/* Like/Dislike Buttons */}
          <div className="flex items-center gap-2 mt-4">
            <Button
              variant={userReaction?.isLike === true ? 'default' : 'outline'}
              size="sm"
              className={`gap-2 ${
                userReaction?.isLike === true
                  ? 'bg-primary hover:bg-primary/90'
                  : ''
              }`}
              onClick={handleLike}
              disabled={!user || toggleLike.isPending}
            >
              <ThumbsUp className="h-4 w-4" />
              {likeCounts?.likes || 0}
            </Button>
            <Button
              variant={userReaction?.isLike === false ? 'default' : 'outline'}
              size="sm"
              className={`gap-2 ${
                userReaction?.isLike === false
                  ? 'bg-destructive hover:bg-destructive/90'
                  : ''
              }`}
              onClick={handleDislike}
              disabled={!user || toggleLike.isPending}
            >
              <ThumbsDown className="h-4 w-4" />
              {likeCounts?.dislikes || 0}
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Comments and Reviews Tabs */}
        <Tabs defaultValue="comments" className="mt-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="comments" className="mt-6">
            <CommentList videoId={id} />
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <ReviewList videoId={id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

