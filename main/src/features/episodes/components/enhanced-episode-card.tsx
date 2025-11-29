import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Play, BookmarkCheck, BookmarkPlus, ShoppingCart, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, Calendar } from "lucide-react";
import type { Episode } from "../types";
import { useUser } from "@/features/auth/hooks/useAuth";
import { getActiveProfileId } from "@/features/profiles/components/profile-selector";
import { useWatchlist, useAddToWatchlist, useRemoveFromWatchlist } from "@/features/watch/hooks/useWatchlist";
import { PPVPurchaseButton } from "@/features/pay-per-view/components/ppv-purchase-button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedEpisodeCardProps {
  episode: Episode;
  className?: string;
}

export function EnhancedEpisodeCard({ episode, className }: EnhancedEpisodeCardProps) {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const activeProfileId = getActiveProfileId();
  const [isHovered, setIsHovered] = useState(false);

  // Check if episode is in watchlist
  const { data: watchlist } = useWatchlist({
    profile_id: activeProfileId || undefined,
    target_type: "episode",
  });

  const isInWatchlist =
    watchlist?.items?.some(
      (item) => item.target_id === episode.id && item.target_type === "episode"
    ) || false;

  const addToWatchlist = useAddToWatchlist();
  const removeFromWatchlist = useRemoveFromWatchlist();

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user || !activeProfileId) {
      return;
    }

    if (isInWatchlist) {
      removeFromWatchlist.mutate({
        profile_id: activeProfileId,
        target_type: "episode",
        target_id: episode.id,
      });
    } else {
      addToWatchlist.mutate({
        profile_id: activeProfileId,
        target_type: "episode",
        target_id: episode.id,
      });
    }
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate({ to: "/episodes/$id", params: { id: episode.id } });
  };

  const thumbnailUrl = episode.thumbnail_url || "";
  const duration = episode.duration_minutes
    ? `${Math.floor(episode.duration_minutes / 60)}h ${episode.duration_minutes % 60}m`
    : null;

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all hover:shadow-lg cursor-pointer",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to="/episodes/$id" params={{ id: episode.id }}>
        <div className="relative aspect-video bg-muted overflow-hidden">
          {/* Thumbnail */}
          <ImageWithFallback
            src={thumbnailUrl}
            alt={episode.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay with action buttons */}
          <div
            className={cn(
              "absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center gap-2",
              isHovered && "bg-black/50"
            )}
          >
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
              <Button
                size="sm"
                className="bg-primary/90 hover:bg-primary text-primary-foreground"
                onClick={handlePlay}
              >
                <Play className="h-4 w-4 mr-1" />
                Play
              </Button>
              {user && activeProfileId && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-background/90 hover:bg-background"
                  onClick={handleWatchlistToggle}
                  disabled={addToWatchlist.isPending || removeFromWatchlist.isPending}
                >
                  {addToWatchlist.isPending || removeFromWatchlist.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isInWatchlist ? (
                    <BookmarkCheck className="h-4 w-4" />
                  ) : (
                    <BookmarkPlus className="h-4 w-4" />
                  )}
                </Button>
              )}
              {episode.access_type === "pay_per_view" && (
                <div onClick={(e) => e.preventDefault()}>
                  <PPVPurchaseButton
                    content={episode}
                    contentType="episode"
                    className="bg-background/90 hover:bg-background"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Episode Number Badge */}
          <div className="absolute top-2 left-2 bg-primary  px-2 py-1 text-xs rounded font-bold">
            E{episode.episode_number}
          </div>

          {/* Access Type Badge */}
          <div className="absolute top-2 right-2">
            <Badge
              variant={
                episode.access_type === "free"
                  ? "default"
                  : episode.access_type === "subscription"
                    ? "secondary"
                    : "destructive"
              }
              className="text-xs"
            >
              {episode.access_type === "free"
                ? "Free"
                : episode.access_type === "subscription"
                  ? "Premium"
                  : "PPV"}
            </Badge>
          </div>

          {/* Duration Badge */}
          {duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-0.5 text-xs rounded">
              {duration}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {episode.title}
          </h3>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
            {episode.duration_minutes && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{episode.duration_minutes} min</span>
              </div>
            )}
            {episode.release_date && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(episode.release_date).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {episode.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {episode.description}
            </p>
          )}
        </div>
      </Link>
    </Card>
  );
}

