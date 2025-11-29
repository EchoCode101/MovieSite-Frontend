import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import {
  useAddToWatchlist,
  useRemoveFromWatchlist,
  useWatchlist,
} from "@/features/watch/hooks/useWatchlist";
import { useEpisodesBySeason } from "@/features/episodes/hooks/useEpisodes";
import { getActiveProfileId } from "@/features/profiles/components/profile-selector";
import { useUser } from "@/features/auth/hooks/useAuth";
import {
  Play,
  Plus,
  BookmarkCheck,
  Calendar,
  Film,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Season } from "../types";

interface SeasonCardProps {
  season: Season;
  tvShowId: string;
  tvShowThumbnail?: string;
  className?: string;
}

export function SeasonCard({
  season,
  tvShowId,
  tvShowThumbnail,
  className,
}: SeasonCardProps) {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const activeProfileId = getActiveProfileId();
  const [isHovered, setIsHovered] = useState(false);

  // Check if TV show is in watchlist
  const { data: watchlist } = useWatchlist({
    profile_id: activeProfileId || undefined,
    target_type: "tvshow",
  });

  const isInWatchlist =
    watchlist?.items?.some(
      (item) => item.target_id === tvShowId && item.target_type === "tvshow"
    ) || false;

  const addToWatchlist = useAddToWatchlist();
  const removeFromWatchlist = useRemoveFromWatchlist();

  // Fetch first episode for play button
  const { data: episodes } = useEpisodesBySeason(season.id);
  const firstEpisode = episodes && episodes.length > 0 ? episodes[0] : null;

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user || !activeProfileId) {
      return;
    }

    if (isInWatchlist) {
      removeFromWatchlist.mutate({
        profile_id: activeProfileId,
        target_type: "tvshow",
        target_id: tvShowId,
      });
    } else {
      addToWatchlist.mutate({
        profile_id: activeProfileId,
        target_type: "tvshow",
        target_id: tvShowId,
      });
    }
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (firstEpisode) {
      navigate({ to: "/episodes/$id", params: { id: firstEpisode.id } });
    }
  };

  return (
    <div
      className={cn("relative group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to="/seasons/$seasonId"
        params={{ seasonId: season.id }}
        className="block"
      >
        <div className="cursor-pointer space-y-2">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted">
            <ImageWithFallback
              src={season.poster_url || tvShowThumbnail || ""}
              alt={season.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />

            {/* Action Buttons Overlay */}
            {isHovered && (
              <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {firstEpisode && (
                  <Button
                    size="sm"
                    className="bg-primary/90 hover:bg-primary text-primary-foreground"
                    onClick={handlePlay}
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Play
                  </Button>
                )}
                {user && activeProfileId && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-background/90 hover:bg-background"
                    onClick={handleWatchlistToggle}
                    disabled={
                      addToWatchlist.isPending || removeFromWatchlist.isPending
                    }
                  >
                    {addToWatchlist.isPending ||
                    removeFromWatchlist.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isInWatchlist ? (
                      <BookmarkCheck className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-sm md:text-base group-hover:text-primary transition-colors">
              {season.name}
            </h3>
            {season.episode_count !== undefined && (
              <p className="text-xs text-muted-foreground">
                {season.episode_count}{" "}
                {season.episode_count === 1 ? "episode" : "episodes"}
              </p>
            )}
            {season.air_date && (
              <p className="text-xs text-muted-foreground">
                {new Date(season.air_date).getFullYear()}
              </p>
            )}
          </div>
        </div>
      </Link>

      {/* Hover Tooltip with Season Info */}
      <Tooltip open={isHovered}>
        <TooltipTrigger asChild>
          <div className="absolute inset-0 pointer-events-none" />
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="w-80 p-4 bg-popover border shadow-lg"
          sideOffset={10}
        >
          <div className="space-y-3">
            <div>
              <h4 className="font-bold text-lg mb-1">{season.name}</h4>
              {season.season_number && (
                <Badge variant="outline" className="text-xs">
                  Season {season.season_number}
                </Badge>
              )}
            </div>

            {season.description && (
              <p className="text-sm text-muted-foreground line-clamp-3">
                {season.description}
              </p>
            )}

            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              {season.air_date && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {new Date(season.air_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
              {season.episode_count !== undefined && (
                <div className="flex items-center gap-1">
                  <Film className="h-3 w-3" />
                  <span>
                    {season.episode_count}{" "}
                    {season.episode_count === 1 ? "episode" : "episodes"}
                  </span>
                </div>
              )}
              {season.status && (
                <Badge variant="outline" className="text-xs capitalize">
                  {season.status}
                </Badge>
              )}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
