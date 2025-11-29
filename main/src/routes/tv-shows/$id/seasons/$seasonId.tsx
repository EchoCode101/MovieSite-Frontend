import { createFileRoute, Link } from "@tanstack/react-router";
import { useSeason } from "@/features/seasons/hooks/useSeasons";
import { useEpisodesBySeason } from "@/features/episodes/hooks/useEpisodes";
import { useTVShow } from "@/features/tv-shows/hooks/useTvShows";
import { Loader2, ArrowLeft, Play, Clock, Calendar, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tv-shows/$id/seasons/$seasonId")({
  component: SeasonDetailPage,
});

function SeasonDetailPage() {
  const { id: tvShowId, seasonId } = Route.useParams();
  const { data: tvShow, isLoading: tvShowLoading } = useTVShow(tvShowId);
  const { data: season, isLoading: seasonLoading } = useSeason(seasonId);
  const { data: episodes, isLoading: episodesLoading } =
    useEpisodesBySeason(seasonId);

  if (tvShowLoading || seasonLoading || episodesLoading)
    return (
      <div className="container mx-auto py-8 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
      </div>
    );

  if (!season)
    return (
      <div className="container mx-auto py-8 text-center">Season not found</div>
    );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation */}
          {tvShow && (
            <Button variant="ghost" className="mb-6" asChild>
              <Link to="/tv-shows/$id" params={{ id: tvShowId }}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to {tvShow.title}
              </Link>
            </Button>
          )}

          {/* Season Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
              <ImageWithFallback
                src={
                  season.poster_url ||
                  tvShow?.poster_url ||
                  tvShow?.thumbnail_url ||
                  ""
                }
                alt={season.name}
                className="w-full aspect-[2/3] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {season.name}
                </h1>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  {season.season_number && (
                    <Badge variant="outline" className="font-semibold">
                      Season {season.season_number}
                    </Badge>
                  )}
                  {episodes && episodes.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Film className="h-4 w-4" />
                      <span>
                        {episodes.length}{" "}
                        {episodes.length === 1 ? "episode" : "episodes"}
                      </span>
                    </div>
                  )}
                  {season.air_date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(season.air_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {season.description && (
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {season.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Episodes List */}
          {episodes && episodes.length > 0 ? (
            <div>
              <h2 className="text-3xl font-bold mb-6">Episodes</h2>
              <div className="space-y-3">
                {episodes.map((episode, index) => (
                  <Link
                    key={episode.id}
                    to="/episodes/$id"
                    params={{ id: episode.id }}
                  >
                    <div className="group border rounded-lg p-4 hover:bg-muted/50 transition-all hover:shadow-md cursor-pointer">
                      <div className="flex gap-4">
                        {/* Episode Thumbnail */}
                        <div className="relative w-32 h-20 md:w-40 md:h-24 flex-shrink-0 rounded overflow-hidden bg-muted">
                          <ImageWithFallback
                            src={episode.thumbnail_url || ""}
                            alt={episode.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <Play className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>

                        {/* Episode Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
                                  Episode {episode.episode_number}
                                </span>
                                {episode.duration_minutes && (
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span>{episode.duration_minutes} min</span>
                                  </div>
                                )}
                                {episode.release_date && (
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    <span>
                                      {new Date(
                                        episode.release_date
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                )}
                                {episode.access_type && (
                                  <Badge
                                    variant={
                                      episode.access_type === "free"
                                        ? "default"
                                        : "secondary"
                                    }
                                    className="text-xs"
                                  >
                                    {episode.access_type === "free"
                                      ? "Free"
                                      : episode.access_type === "subscription"
                                        ? "Subscription"
                                        : "PPV"}
                                  </Badge>
                                )}
                              </div>
                              <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                {episode.title}
                              </h3>
                              {episode.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {episode.description}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.preventDefault();
                                // Navigation handled by Link
                              }}
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Film className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No episodes available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
