import { createFileRoute, Link } from '@tanstack/react-router'
import { useEpisode } from '@/features/episodes/hooks/useEpisodes'
import { useTVShow } from '@/features/tv-shows/hooks/useTvShows'
import { useSeason } from '@/features/seasons/hooks/useSeasons'
import { VideoPlayer } from '@/features/videos/components/video-player'
import { CommentList } from '@/features/comments/components/comment-list'
import { ReviewList } from '@/features/comments/components/review-list'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ThumbsUp, ThumbsDown, ArrowLeft } from 'lucide-react'
import {
  useLikeDislikeCounts,
  useToggleLikeDislike,
  useUserReaction,
} from '@/features/likes/hooks/useLikes'
import { useUser } from '@/features/auth/hooks/useAuth'
import { useActiveSubscription } from '@/features/subscriptions/hooks/useSubscriptions'
import { usePPVAccess } from '@/features/pay-per-view/hooks/usePayPerView'
import { canAccessContent, hasPPVAccess } from '@/features/auth/utils/access-control'
import { Loader2 } from 'lucide-react'
import type { Video } from '@/features/videos/types'

export const Route = createFileRoute('/episodes/$id')({
  component: EpisodeWatchPage,
})

function EpisodeWatchPage() {
  const { id } = Route.useParams()
  const { data: episode, isLoading, error } = useEpisode(id)
  // Make TV show fetch optional - don't block if it fails
  const { data: tvShow, error: tvShowError } = useTVShow(episode?.tv_show_id || '', { enabled: !!episode?.tv_show_id })
  const { data: season, error: seasonError } = useSeason(episode?.season_id || '', { enabled: !!episode?.season_id })
  const { data: user } = useUser()
  const { data: activeSubscription } = useActiveSubscription()
  const { data: ppvAccess } = usePPVAccess('episode', id)

  // Check access
  // Pass both activeSubscription plan name and user's subscription_plan field as fallback
  const hasAccess = episode
    ? canAccessContent(
        activeSubscription?.plan?.name as any,
        episode.plan_ids,
        episode.access_type,
        user?.subscription_plan as any
      ) || (episode.access_type === 'pay_per_view' && hasPPVAccess(ppvAccess?.hasAccess || false, ppvAccess?.purchaseType, ppvAccess?.expiresAt))
    : false

  // Like/Dislike functionality - use 'episode' as target_type
  const { data: likeCounts } = useLikeDislikeCounts('episode', id)
  const { data: userReaction } = useUserReaction('episode', id)
  const toggleLike = useToggleLikeDislike()

  const handleLike = () => {
    toggleLike.mutate({
      target_id: id,
      target_type: 'episode',
      is_like: true,
    })
  }

  const handleDislike = () => {
    toggleLike.mutate({
      target_id: id,
      target_type: 'episode',
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
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg">
            <p className="font-medium">Access Restricted</p>
            <p className="text-sm mt-1">
              {error.message || 'You do not have access to this episode. Please check your subscription or purchase status.'}
            </p>
          </div>
        </div>
      </div>
    )

  if (!episode)
    return (
      <div className="container mx-auto py-8 text-center">Episode not found</div>
    )

  // Transform episode to video format for VideoPlayer
  const video: Video = {
    id: episode.id,
    title: episode.title,
    description: episode.description || '',
    thumbnailUrl: episode.thumbnail_url || '',
    videoUrl: episode.streams?.[0]?.url || '',
    duration: episode.duration_minutes ? episode.duration_minutes * 60 : undefined,
    category: 'TV Show',
    accessLevel: episode.access_type === 'free' ? 'Free' : 'Premium',
    isPremium: episode.access_type !== 'free',
    rating: 0,
    views: 0,
    createdAt: episode.createdAt || new Date().toISOString(),
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Navigation */}
        {season && (
          <Button variant="ghost" className="mb-4" asChild>
            <Link 
              to="/seasons/$seasonId" 
              params={{ seasonId: season.id }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {season.name}
            </Link>
          </Button>
        )}

        {/* Access Control Check */}
        {!hasAccess && (
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <p className="text-center text-muted-foreground">
              {episode.access_type === 'pay_per_view'
                ? 'This episode requires purchase. Please purchase to watch.'
                : 'This episode requires a subscription. Please upgrade your plan to watch.'}
            </p>
            <div className="flex justify-center mt-4">
              <Button asChild>
                <a href={episode.access_type === 'pay_per_view' ? '#' : '/pricing'}>
                  {episode.access_type === 'pay_per_view' ? 'Purchase Now' : 'Upgrade Plan'}
                </a>
              </Button>
            </div>
          </div>
        )}

        {/* Video Player - Only show if user has access */}
        {hasAccess && <VideoPlayer video={video} />}

        {/* Episode Info */}
        <div className="mt-6">
          <h1 className="text-2xl font-bold">{episode.title}</h1>
          {tvShow && season && (
            <p className="text-sm text-muted-foreground mt-1">
              {tvShow.title} • {season.name} • Episode {episode.episode_number}
            </p>
          )}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            {episode.duration_minutes && (
              <span>• {Math.floor(episode.duration_minutes / 60)}h {episode.duration_minutes % 60}m</span>
            )}
            {episode.release_date && (
              <span>• {new Date(episode.release_date).getFullYear()}</span>
            )}
          </div>
          <p className="mt-4 text-muted-foreground whitespace-pre-wrap">
            {episode.description}
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
            <CommentList videoId={id} targetType="episode" />
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <ReviewList videoId={id} targetType="episode" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

