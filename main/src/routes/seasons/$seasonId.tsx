import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useSeason } from "@/features/seasons/hooks/useSeasons";
import { useEpisodes } from "@/features/episodes/hooks/useEpisodes";
import { useTVShow } from "@/features/tv-shows/hooks/useTvShows";
import {
  useWatchlist,
  useAddToWatchlist,
  useRemoveFromWatchlist,
} from "@/features/watch/hooks/useWatchlist";
import { useUser } from "@/features/auth/hooks/useAuth";
import { getActiveProfileId } from "@/features/profiles/components/profile-selector";
import { EnhancedEpisodeCard } from "@/features/episodes/components/enhanced-episode-card";
import {
  Loader2,
  ArrowLeft,
  Play,
  Calendar,
  Film,
  Search,
  X,
  BookmarkCheck,
  BookmarkPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FileText, Eye, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const seasonSearchSchema = z.object({
  search: z.string().optional(),
  sort: z.string().optional().default("episode_number"),
  order: z.enum(["ASC", "DESC"]).optional().default("ASC"),
  page: z.number().optional().default(1),
  limit: z.number().optional().default(12),
});

export const Route = createFileRoute("/seasons/$seasonId")({
  validateSearch: seasonSearchSchema,
  component: SeasonDetailPage,
});

function SeasonDetailPage() {
  const { seasonId } = Route.useParams();
  const navigate = useNavigate({ from: "/seasons/$seasonId" });
  const {
    search = "",
    sort = "episode_number",
    order = "ASC",
    page = 1,
    limit = 12,
  } = Route.useSearch();

  const [searchInput, setSearchInput] = useState(search);
  const [jumpToPage, setJumpToPage] = useState("");
  const scrollPositionRef = useRef(0);
  const filtersSectionRef = useRef<HTMLDivElement>(null);

  const { data: season, isLoading: seasonLoading } = useSeason(seasonId);

  // Fetch episodes using paginated API with season_id filter
  const {
    data: episodesData,
    isLoading: episodesLoading,
    error: episodesError,
  } = useEpisodes({
    season_id: seasonId,
    page,
    limit,
    sort,
    order,
    search: search || undefined,
  });

  // Extract episodes data early so it can be used in useEffect
  const episodes = episodesData?.episodes || [];
  const totalPages = episodesData?.totalPages || 1;
  const totalItems = episodesData?.totalItems || 0;
  const currentlyShowing = episodes.length;

  // Get TV show if we have season data
  const { data: tvShow, isLoading: tvShowLoading } = useTVShow(
    season?.tv_show_id || "",
    { enabled: !!season?.tv_show_id }
  );

  // Watchlist for TV show (season header)
  const { data: user } = useUser();
  const activeProfileId = getActiveProfileId();
  const { data: watchlist } = useWatchlist({
    profile_id: activeProfileId || undefined,
    target_type: "tvshow",
  });

  const isTVShowInWatchlist =
    watchlist?.items?.some(
      (item) => item.target_id === tvShow?.id && item.target_type === "tvshow"
    ) || false;

  const addToWatchlist = useAddToWatchlist();
  const removeFromWatchlist = useRemoveFromWatchlist();

  // Save scroll position before filter changes
  useEffect(() => {
    scrollPositionRef.current = window.scrollY;
  }, [search, sort, order, page]);

  // Restore scroll position after data loads (maintain position, don't jump to top)
  useEffect(() => {
    if (!episodesLoading && episodes.length > 0) {
      // Maintain scroll position instead of jumping to top
      // Only restore if we're not at the top already
      if (scrollPositionRef.current > 100) {
        window.scrollTo({
          top: scrollPositionRef.current,
          behavior: "auto", // Use 'auto' to prevent smooth scroll animation
        });
      }
    }
  }, [episodesLoading, episodes]);

  // Sync search input with URL param
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // Handle search submit (Enter key or search button)
  const handleSearchSubmit = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        search: searchInput || undefined,
        page: 1,
      }),
      replace: true, // Prevent history buildup
    });
  };

  // Handle Enter key press
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchInput("");
    navigate({
      search: (prev) => ({ ...prev, search: undefined, page: 1 }),
      replace: true,
    });
  };

  const handleSortChange = (value: string) => {
    navigate({
      search: (prev) => ({ ...prev, sort: value, page: 1 }),
      replace: true, // Prevent history buildup
    });
  };

  const handleOrderChange = (value: "ASC" | "DESC") => {
    navigate({
      search: (prev) => ({ ...prev, order: value, page: 1 }),
      replace: true, // Prevent history buildup
    });
  };

  const handlePageChange = (newPage: number) => {
    navigate({
      search: (prev) => ({ ...prev, page: newPage }),
      replace: true, // Prevent history buildup
    });
  };

  const handleJumpToPage = () => {
    const targetPage = Number(jumpToPage);
    if (targetPage >= 1 && targetPage <= totalPages) {
      handlePageChange(targetPage);
      setJumpToPage("");
    }
  };

  const handleClearFilters = () => {
    navigate({
      search: { page: 1 },
      replace: true,
    });
    setSearchInput("");
  };

  const handleTVShowWatchlistToggle = () => {
    if (!user || !activeProfileId || !tvShow) {
      return;
    }

    if (isTVShowInWatchlist) {
      removeFromWatchlist.mutate({
        profile_id: activeProfileId,
        target_type: "tvshow",
        target_id: tvShow.id,
      });
    } else {
      addToWatchlist.mutate({
        profile_id: activeProfileId,
        target_type: "tvshow",
        target_id: tvShow.id,
      });
    }
  };

  const handlePlayFirstEpisode = () => {
    if (episodes.length > 0) {
      navigate({ to: "/episodes/$id", params: { id: episodes[0].id } });
    }
  };

  const hasActiveFilters =
    search !== "" || sort !== "episode_number" || order !== "ASC";

  const SORT_OPTIONS = [
    { value: "episode_number", label: "Episode Number" },
    { value: "release_date", label: "Release Date" },
    { value: "title", label: "Title" },
  ];

  if (seasonLoading || tvShowLoading) {
    return (
      <div className="container mx-auto py-8 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
      </div>
    );
  }

  if (!season) {
    return (
      <div className="container mx-auto py-8 text-center">Season not found</div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation */}
          {tvShow && (
            <Button variant="ghost" className="mb-6" asChild>
              <Link to="/tv-shows/$id" params={{ id: tvShow.id }}>
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
                  {totalItems > 0 && (
                    <div className="flex items-center gap-1">
                      <Film className="h-4 w-4" />
                      <span>
                        {totalItems} {totalItems === 1 ? "episode" : "episodes"}
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

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  {episodes.length > 0 && (
                    <Button
                      onClick={handlePlayFirstEpisode}
                      size="lg"
                      className="gap-2"
                    >
                      <Play className="h-5 w-5 fill-current" />
                      Play First Episode
                    </Button>
                  )}
                  {user && activeProfileId && tvShow && (
                    <Button
                      variant="secondary"
                      size="lg"
                      className="gap-2"
                      onClick={handleTVShowWatchlistToggle}
                      disabled={
                        addToWatchlist.isPending ||
                        removeFromWatchlist.isPending
                      }
                    >
                      {addToWatchlist.isPending ||
                      removeFromWatchlist.isPending ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : isTVShowInWatchlist ? (
                        <>
                          <BookmarkCheck className="h-5 w-5" />
                          In Watchlist
                        </>
                      ) : (
                        <>
                          <BookmarkPlus className="h-5 w-5" />
                          Add to Watchlist
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Filters and Search */}
          <div className="mb-6" ref={filtersSectionRef}>
            <div className="flex flex-wrap items-center gap-4">
              {/* Search Input */}
              <div className="flex-1 min-w-[200px]">
                <div className="relative flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      type="text"
                      placeholder="Search episodes..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                      className="pl-10 pr-10"
                    />
                    {searchInput && (
                      <button
                        type="button"
                        onClick={handleClearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <Button
                    type="button"
                    onClick={handleSearchSubmit}
                    size="sm"
                    className="h-10 px-4 gap-2"
                  >
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">Search</span>
                  </Button>
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium whitespace-nowrap">
                  Sort:
                </label>
                <Select value={sort} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Order Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={order === "ASC" ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    handleOrderChange(order === "ASC" ? "DESC" : "ASC")
                  }
                >
                  {order === "ASC" ? "↑ Ascending" : "↓ Descending"}
                </Button>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Episodes Grid */}
          {episodesError && !episodesLoading && (
            <div className="text-center py-12 text-destructive">
              <p className="text-lg">
                Failed to load episodes. Please try again later.
              </p>
            </div>
          )}
          {episodesLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            </div>
          ) : episodes.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {episodes.map((episode) => (
                  <EnhancedEpisodeCard key={episode.id} episode={episode} />
                ))}
              </div>

              {/* Pagination */}
              {totalItems > 0 && (
                <div className="mt-12">
                  <div className="flex items-center justify-between gap-8 flex-wrap lg:flex-nowrap">
                    {/* Pagination Info - Left Side */}
                    <div className="inline-flex items-center gap-6 px-6 py-4 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50 shadow-lg backdrop-blur-sm shrink-0">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Page
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-foreground">
                              {page}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              /
                            </span>
                            <span className="text-lg font-semibold text-muted-foreground">
                              {totalPages}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Separator
                        orientation="vertical"
                        className="h-12 bg-border/50"
                      />

                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                          <Eye className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Showing
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-foreground">
                              {currentlyShowing}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              of
                            </span>
                            <span className="text-lg font-semibold text-muted-foreground">
                              {totalItems}
                            </span>
                            <Badge
                              variant="secondary"
                              className="ml-2 text-xs font-medium capitalize"
                            >
                              episodes
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Jump to Page - Center */}
                    <div className="flex items-center gap-2 shrink-0 order-3 lg:order-2 w-full justify-center lg:w-auto lg:justify-start">
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        Go to:
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Input
                          type="number"
                          min={1}
                          max={totalPages}
                          value={jumpToPage}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Only allow numbers
                            if (value === "" || /^\d+$/.test(value)) {
                              setJumpToPage(value);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleJumpToPage();
                            }
                          }}
                          placeholder={page.toString()}
                          className="w-16 h-9 text-center text-sm"
                        />
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleJumpToPage}
                          disabled={
                            !jumpToPage ||
                            Number(jumpToPage) < 1 ||
                            Number(jumpToPage) > totalPages
                          }
                          className="h-9 px-3 gap-1.5"
                        >
                          <ArrowRight className="h-3.5 w-3.5" />
                          <span className="text-xs">Go</span>
                        </Button>
                      </div>
                    </div>

                    {/* Pagination Controls - Right Side */}
                    <div className="shrink-0 order-2 lg:order-3 w-full justify-center lg:w-auto lg:justify-end">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() =>
                                handlePageChange(Math.max(1, page - 1))
                              }
                              className={
                                page === 1
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                          {(() => {
                            const pages: (number | string)[] = [];
                            const maxVisible = 7;
                            const sidePages = 2;

                            if (totalPages <= maxVisible) {
                              for (let i = 1; i <= totalPages; i++) {
                                pages.push(i);
                              }
                            } else {
                              pages.push(1);
                              let start = Math.max(2, page - sidePages);
                              let end = Math.min(
                                totalPages - 1,
                                page + sidePages
                              );

                              if (page <= sidePages + 2) {
                                end = Math.min(maxVisible - 1, totalPages - 1);
                              }
                              if (page >= totalPages - sidePages - 1) {
                                start = Math.max(
                                  2,
                                  totalPages - (maxVisible - 2)
                                );
                              }

                              if (start > 2) {
                                pages.push("ellipsis-start");
                              }
                              for (let i = start; i <= end; i++) {
                                pages.push(i);
                              }
                              if (end < totalPages - 1) {
                                pages.push("ellipsis-end");
                              }
                              pages.push(totalPages);
                            }

                            return pages.map((pageNum, i) => {
                              if (
                                pageNum === "ellipsis-start" ||
                                pageNum === "ellipsis-end"
                              ) {
                                return (
                                  <PaginationItem key={`ellipsis-${i}`}>
                                    <span className="px-4 py-2 text-muted-foreground">
                                      ...
                                    </span>
                                  </PaginationItem>
                                );
                              }
                              return (
                                <PaginationItem key={pageNum}>
                                  <PaginationLink
                                    isActive={page === pageNum}
                                    onClick={() =>
                                      handlePageChange(pageNum as number)
                                    }
                                    className="cursor-pointer"
                                  >
                                    {pageNum}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            });
                          })()}
                          <PaginationItem>
                            <PaginationNext
                              onClick={() =>
                                handlePageChange(Math.min(totalPages, page + 1))
                              }
                              className={
                                page === totalPages
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Film className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">No episodes found.</p>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
