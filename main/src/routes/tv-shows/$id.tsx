import { createFileRoute } from "@tanstack/react-router";
import { useTVShow } from "@/features/tv-shows/hooks/useTvShows";
import { useSeasonsByTVShow } from "@/features/seasons/hooks/useSeasons";
import {
  Loader2,
  Star,
  Calendar,
  Globe,
  Film,
  Users,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { GenreBadge } from "@/features/genres/components/genre-badge";
import { CastList } from "@/features/cast-crew/components/cast-list";
import { useGenres } from "@/features/genres/hooks/useGenres";
import { SeasonCard } from "@/features/seasons/components/season-card";

export const Route = createFileRoute("/tv-shows/$id")({
  component: TVShowDetailPage,
});

function TVShowDetailPage() {
  const { id } = Route.useParams();
  const { data: tvShow, isLoading, error } = useTVShow(id);
  const { data: seasons } = useSeasonsByTVShow(id);
  const { data: genres } = useGenres();

  if (isLoading)
    return (
      <div className="container mx-auto py-8 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto py-8 text-center text-destructive">
        Error loading TV show: {error.message}
      </div>
    );

  if (!tvShow)
    return (
      <div className="container mx-auto py-8 text-center">
        TV show not found
      </div>
    );

  // Get genre names from IDs
  const genreNames =
    tvShow.genres?.map((genreId) => {
      const genre = genres?.find((g) => g.id === genreId);
      return genre ? { id: genre.id, name: genre.name } : genreId;
    }) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Banner Image */}
      {tvShow.banner_url && (
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
          <ImageWithFallback
            src={tvShow.banner_url}
            alt={tvShow.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
      )}

      <div className="container mx-auto py-8">
        <div className="max-w-7xl mx-auto">
          {/* TV Show Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
              <ImageWithFallback
                src={tvShow.poster_url || tvShow.thumbnail_url || ""}
                alt={tvShow.title}
                className="w-full aspect-[2/3] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {tvShow.title}
                </h1>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  {tvShow.imdb_rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-foreground">
                        {tvShow.imdb_rating.toFixed(1)}
                      </span>
                      <span className="text-muted-foreground">/10</span>
                    </div>
                  )}
                  {tvShow.release_year && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{tvShow.release_year}</span>
                    </div>
                  )}
                  {tvShow.content_rating && (
                    <Badge variant="outline" className="font-semibold">
                      {tvShow.content_rating}
                    </Badge>
                  )}
                  {tvShow.language && (
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      <span className="uppercase">{tvShow.language}</span>
                    </div>
                  )}
                  {tvShow.access_type && (
                    <Badge
                      variant={
                        tvShow.access_type === "free" ? "default" : "secondary"
                      }
                    >
                      {tvShow.access_type === "free"
                        ? "Free"
                        : tvShow.access_type === "subscription"
                          ? "Subscription"
                          : "Pay-Per-View"}
                    </Badge>
                  )}
                </div>

                {/* Genres */}
                {genreNames.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {genreNames.map((genre, idx) => (
                      <GenreBadge key={idx} genre={genre} linkTo />
                    ))}
                  </div>
                )}

                {/* Description */}
                {tvShow.description && (
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {tvShow.description}
                  </p>
                )}
              </div>

              <Separator />

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {tvShow.status && (
                  <div className="flex items-center gap-2">
                    <Film className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="outline" className="capitalize">
                      {tvShow.status}
                    </Badge>
                  </div>
                )}
                {seasons && seasons.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Seasons:</span>
                    <span className="font-semibold">{seasons.length}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cast & Directors */}
          {(tvShow.cast && tvShow.cast.length > 0) ||
          (tvShow.directors && tvShow.directors.length > 0) ? (
            <div className="mb-8 space-y-6">
              {tvShow.directors && tvShow.directors.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Directors
                  </h2>
                  <CastList castIds={tvShow.directors} limit={8} />
                </div>
              )}
              {tvShow.cast && tvShow.cast.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Cast
                  </h2>
                  <CastList castIds={tvShow.cast} limit={12} />
                </div>
              )}
            </div>
          ) : null}

          <Separator className="my-8" />

          {/* Seasons List */}
          {seasons && seasons.length > 0 ? (
            <div className="mt-8">
              <h2 className="text-3xl font-bold mb-6">Seasons</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {seasons.map((season) => (
                  <SeasonCard
                    key={season.id}
                    season={season}
                    tvShowId={id}
                    tvShowThumbnail={tvShow.thumbnail_url}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Film className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No seasons available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
