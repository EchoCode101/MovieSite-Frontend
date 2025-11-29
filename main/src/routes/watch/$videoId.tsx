import { createFileRoute, Link } from "@tanstack/react-router";
import { useVideo } from "@/features/videos/hooks/useVideos";
import { useEpisode } from "@/features/episodes/hooks/useEpisodes";
import { useTVShow } from "@/features/tv-shows/hooks/useTvShows";
import { useSeason } from "@/features/seasons/hooks/useSeasons";
import { VideoPlayer } from "@/features/videos/components/video-player";
import { CommentList } from "@/features/comments/components/comment-list";
import { ReviewList } from "@/features/comments/components/review-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, ArrowLeft, Clock, Calendar } from "lucide-react";
import {
  useLikeDislikeCounts,
  useToggleLikeDislike,
  useUserReaction,
} from "@/features/likes/hooks/useLikes";
import { useUser } from "@/features/auth/hooks/useAuth";
import { useActiveSubscription } from "@/features/subscriptions/hooks/useSubscriptions";
import { usePPVAccess } from "@/features/pay-per-view/hooks/usePayPerView";
import {
  canAccessContent,
  hasPPVAccess,
} from "@/features/auth/utils/access-control";
import { LoadingState } from "@/components/common/loading-state";
import { ErrorState } from "@/components/common/error-state";
import { PPVPurchaseButton } from "@/features/pay-per-view/components/ppv-purchase-button";
import type { Video } from "@/features/videos/types";

export const Route = createFileRoute("/watch/$videoId")({
  component: WatchPage,
});

function WatchPage() {
  const { videoId } = Route.useParams();

  // Handle undefined videoId
  if (!videoId || videoId === "undefined") {
    return (
      <div className="container mx-auto py-8 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-bold">Invalid Video ID</h2>
          <p className="text-muted-foreground">
            The video ID is missing or invalid. Please navigate to a video from
            the catalog.
          </p>
        </div>
      </div>
    );
  }

  // Try to fetch as video first
  const {
    data: video,
    isLoading: videoLoading,
    error: videoError,
  } = useVideo(videoId);

  // Try to fetch as episode (will run in parallel, we'll use whichever succeeds)
  const {
    data: episode,
    isLoading: episodeLoading,
    error: episodeError,
  } = useEpisode(videoId);

  // Fetch TV show and season if it's an episode
  const { data: tvShow } = useTVShow(episode?.tv_show_id || "", {
    enabled: !!episode?.tv_show_id,
  });
  const { data: season } = useSeason(episode?.season_id || "", {
    enabled: !!episode?.season_id,
  });

  const { data: user } = useUser();
  const { data: activeSubscription } = useActiveSubscription();
  const { data: ppvAccess } = usePPVAccess(
    episode ? "episode" : "video",
    videoId
  );

  const isLoading = videoLoading || episodeLoading;
  const error = videoError || episodeError;

  // Determine if content is episode or video
  const isEpisode = !!episode;
  const contentType = isEpisode ? "episode" : "video";

  // Check access
  // Pass both activeSubscription plan name and user's subscription_plan field as fallback
  const hasAccess = isEpisode
    ? canAccessContent(
        activeSubscription?.plan?.name as any,
        episode.plan_ids,
        episode.access_type,
        user?.subscription_plan as any
      ) ||
      (episode.access_type === "pay_per_view" &&
        hasPPVAccess(
          ppvAccess?.hasAccess || false,
          ppvAccess?.purchaseType,
          ppvAccess?.expiresAt
        ))
    : true; // Videos don't have access control in this context

  // Like/Dislike functionality
  const { data: likeCounts } = useLikeDislikeCounts(contentType, videoId);
  const { data: userReaction } = useUserReaction(contentType, videoId);
  const toggleLike = useToggleLikeDislike();

  const handleLike = () => {
    toggleLike.mutate({
      target_id: videoId,
      target_type: contentType,
      is_like: true,
    });
  };

  const handleDislike = () => {
    toggleLike.mutate({
      target_id: videoId,
      target_type: contentType,
      is_like: false,
    });
  };

  if (isLoading) {
    return <LoadingState message="Loading content..." />;
  }

  if (error && !video && !episode) {
    return (
      <ErrorState
        message={error.message}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!video && !episode) {
    return (
      <div className="container mx-auto py-8 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-bold">Content Not Found</h2>
          <p className="text-muted-foreground">
            The content you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  // Transform episode or video to Video format for VideoPlayer
  const videoForPlayer: Video =
    isEpisode && episode
      ? {
          id: episode.id,
          title: episode.title,
          description: episode.description || "",
          thumbnailUrl: episode.thumbnail_url || "",
          videoUrl: episode.streams?.[0]?.url || "",
          duration: episode.duration_minutes
            ? episode.duration_minutes * 60
            : undefined,
          category: "TV Show",
          accessLevel:
            episode.access_type === "free"
              ? "Free"
              : episode.access_type === "subscription"
                ? "Premium"
                : "Premium",
          isPremium: episode.access_type !== "free",
          rating: 0,
          views: 0,
          createdAt: episode.createdAt || new Date().toISOString(),
        }
      : video!;

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Navigation for Episodes */}
        {isEpisode && season && (
          <Button variant="ghost" className="mb-6" asChild>
            <Link
              to="/seasons/$seasonId"
              params={{ seasonId: season.id }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {season.name}
            </Link>
          </Button>
        )}

        {/* Access Control Check for Episodes */}
        {isEpisode && episode && !hasAccess && (
          <div className="mb-6 p-6 bg-muted rounded-lg border">
            {episode.access_type === "pay_per_view" ? (
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  This episode requires purchase. Please purchase to watch.
                </p>
                <PPVPurchaseButton content={episode} contentType="episode" />
              </div>
            ) : (
              <>
                <p className="text-center text-muted-foreground mb-4">
                  This episode requires a subscription. Please upgrade your plan
                  to watch.
                </p>
                <div className="flex justify-center">
                  <Button asChild>
                    <Link to="/pricing">Upgrade Plan</Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Video Player - Only show if user has access */}
        {hasAccess && (
          <VideoPlayer
            video={videoForPlayer}
            contentType={isEpisode ? "episode" : undefined}
            contentId={videoId}
          />
        )}

        {/* Content Info */}
        <div className="mt-6">
          <h1 className="text-2xl font-bold">{videoForPlayer.title}</h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
            {isEpisode && episode && (
              <>
                {episode.episode_number && (
                  <span className="font-semibold text-foreground">
                    Episode {episode.episode_number}
                  </span>
                )}
                {episode.duration_minutes && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{episode.duration_minutes} min</span>
                  </div>
                )}
                {episode.release_date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(episode.release_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </>
            )}
            {!isEpisode && video && (
              <>
                <span>{video.views.toLocaleString()} views</span>
                <span>•</span>
                <span>{new Date(video.createdAt).toLocaleDateString()}</span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="mt-4 text-muted-foreground whitespace-pre-wrap">
            {videoForPlayer.description}
          </p>

          {/* Like/Dislike Buttons */}
          <div className="flex items-center gap-2 mt-4">
            <Button
              variant={userReaction?.isLike === true ? "default" : "outline"}
              size="sm"
              className={`gap-2 ${
                userReaction?.isLike === true
                  ? "bg-primary hover:bg-primary/90"
                  : ""
              }`}
              onClick={handleLike}
              disabled={!user || toggleLike.isPending}
            >
              <ThumbsUp className="h-4 w-4" />
              {likeCounts?.likes || 0}
            </Button>
            <Button
              variant={userReaction?.isLike === false ? "default" : "outline"}
              size="sm"
              className={`gap-2 ${
                userReaction?.isLike === false
                  ? "bg-destructive hover:bg-destructive/90"
                  : ""
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
            <CommentList
              videoId={videoId}
              targetType={
                (isEpisode ? "episode" : "video") as
                  | "video"
                  | "movie"
                  | "tvshow"
                  | "episode"
              }
            />
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <ReviewList
              videoId={videoId}
              targetType={
                (isEpisode ? "episode" : "video") as
                  | "video"
                  | "movie"
                  | "tvshow"
                  | "episode"
              }
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
