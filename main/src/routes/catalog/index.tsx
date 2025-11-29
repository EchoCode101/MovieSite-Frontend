import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useState } from "react";
import { useVideos } from "@/features/videos/hooks/useVideos";
import { useMovies } from "@/features/movies/hooks/useMovies";
import { useTVShows } from "@/features/tv-shows/hooks/useTvShows";
import { useEpisodes } from "@/features/episodes/hooks/useEpisodes";
import { VideoCard } from "@/features/videos/components/video-card";
import { MovieCard } from "@/features/movies/components/movie-card";
import { TVShowCard } from "@/features/tv-shows/components/tv-show-card";
import { EpisodeCard } from "@/features/episodes/components/episode-card";
import { FilterBar } from "@/features/videos/components/filter-bar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, FileText, Eye, ArrowRight } from "lucide-react";

const catalogSearchSchema = z.object({
  search: z.string().optional(),
  type: z
    .enum(["video", "movie", "tv-show", "episode"])
    .optional()
    .default("video"),
  genre: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .default("All"),
  year: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .default("All"),
  sort: z.string().optional().default("featured"),
  sort_order: z.enum(["ASC", "DESC"]).optional().default("DESC"),
  access_type: z.string().optional().default("All"),
  limit: z.number().optional().default(12),
  page: z.number().optional(), // Remove default - handle in component
});

export const Route = createFileRoute("/catalog/")({
  validateSearch: catalogSearchSchema,
  component: CatalogPage,
});

function CatalogPage() {
  const navigate = useNavigate({ from: "/catalog" });
  const {
    search,
    type = "video",
    genre = "All",
    year = "All",
    sort = "featured",
    sort_order = "DESC",
    access_type = "All",
    limit = 12,
    page = 1,
  } = Route.useSearch();

  const [jumpToPage, setJumpToPage] = useState("");

  // Map frontend sort values to backend sort values
  const mapSortToBackend = (
    sortValue: string,
    sortOrder?: "ASC" | "DESC"
  ): { sort: string; order: "ASC" | "DESC" } => {
    const order = sortOrder || "DESC";

    switch (sortValue) {
      case "featured":
        return { sort: "featured", order: "DESC" };
      case "popular":
        return { sort: "views_count", order: "DESC" };
      case "newest":
        return { sort: "createdAt", order: "DESC" };
      case "oldest":
        return { sort: "createdAt", order: "ASC" };
      case "rating":
        return { sort: "imdb_rating", order: order };
      case "most_viewed":
        return { sort: "views_count", order: order };
      case "most_liked":
        return { sort: "likes.length", order: order };
      default:
        return { sort: "updatedAt", order: order };
    }
  };

  const sortParams = mapSortToBackend(sort, sort_order as "ASC" | "DESC");

  // Normalize genre and year to arrays
  const genreArray = Array.isArray(genre)
    ? genre
    : genre !== "All"
      ? [genre]
      : [];
  const yearArray = Array.isArray(year) ? year : year !== "All" ? [year] : [];

  // Convert year array to numbers for API
  const yearNumbers =
    yearArray.length > 0
      ? yearArray.map((y) => Number(y)).filter((y) => !isNaN(y))
      : undefined;

  const accessTypeParam =
    access_type !== "All"
      ? (access_type as "free" | "subscription" | "pay_per_view")
      : undefined;

  // Fetch data based on content type
  const {
    data: videosData,
    isLoading: videosLoading,
    error: videosError,
  } = useVideos({
    page,
    limit,
    search: search,
    genre: genreArray.length > 0 ? genreArray : undefined,
    year: yearNumbers && yearNumbers.length > 0 ? yearNumbers : undefined,
    access_type: accessTypeParam,
    sort: sortParams.sort,
    order: sortParams.order,
  });

  const {
    data: moviesData,
    isLoading: moviesLoading,
    error: moviesError,
  } = useMovies({
    page,
    limit,
    search: search,
    genre: genreArray.length > 0 ? genreArray : undefined,
    year: yearNumbers && yearNumbers.length > 0 ? yearNumbers : undefined,
    access_type: accessTypeParam,
    sort: sortParams.sort,
    order: sortParams.order,
  });

  const {
    data: tvShowsData,
    isLoading: tvShowsLoading,
    error: tvShowsError,
  } = useTVShows({
    page,
    limit,
    search: search,
    genre: genreArray.length > 0 ? genreArray : undefined,
    year: yearNumbers && yearNumbers.length > 0 ? yearNumbers : undefined,
    access_type: accessTypeParam,
    sort: sortParams.sort,
    order: sortParams.order,
  });

  const {
    data: episodesData,
    isLoading: episodesLoading,
    error: episodesError,
  } = useEpisodes({
    page,
    limit,
    search: search,
    genre: genreArray.length > 0 ? genreArray : undefined,
    year: yearNumbers && yearNumbers.length > 0 ? yearNumbers : undefined,
    access_type: accessTypeParam,
    sort: sortParams.sort,
    order: sortParams.order,
  });

  // Determine which data to use based on type
  const isLoading =
    type === "video"
      ? videosLoading
      : type === "movie"
        ? moviesLoading
        : type === "tv-show"
          ? tvShowsLoading
          : episodesLoading;
  const error =
    type === "video"
      ? videosError
      : type === "movie"
        ? moviesError
        : type === "tv-show"
          ? tvShowsError
          : episodesError;

  // Extract pagination data based on content type
  let totalPages = 1;
  let totalItems = 0;
  let currentlyShowing = 0;
  let contentType = "items";

  if (type === "video") {
    totalPages = videosData?.totalPages ?? 1;
    totalItems = videosData?.totalItems ?? 0;
    currentlyShowing = videosData?.videos?.length ?? 0;
    contentType = "videos";
  } else if (type === "movie") {
    totalPages = moviesData?.totalPages ?? 1;
    totalItems = moviesData?.totalItems ?? 0;
    currentlyShowing = moviesData?.movies?.length ?? 0;
    contentType = "movies";
  } else if (type === "tv-show") {
    totalPages = tvShowsData?.totalPages ?? 1;
    totalItems = tvShowsData?.totalItems ?? 0;
    currentlyShowing = tvShowsData?.tv_shows?.length ?? 0;
    contentType = "TV shows";
  } else if (type === "episode") {
    totalPages = episodesData?.totalPages ?? 1;
    totalItems = episodesData?.totalItems ?? 0;
    currentlyShowing = episodesData?.episodes?.length ?? 0;
    contentType = "episodes";
  }

  const handleTypeChange = (
    newType: "video" | "movie" | "tv-show" | "episode"
  ) => {
    navigate({
      search: (prev) => ({ ...prev, type: newType, page: 1 }),
      replace: true, // Prevent history buildup
    });
  };

  const handleGenreChange = (value: string | string[]) => {
    navigate({
      search: (prev) => ({ ...prev, genre: value, page: 1 }),
      replace: true, // Prevent history buildup
    });
  };

  const handleYearChange = (value: string | string[]) => {
    navigate({
      search: (prev) => ({ ...prev, year: value, page: 1 }),
      replace: true, // Prevent history buildup
    });
  };

  const handleSortChange = (value: string) => {
    // Auto-set sort order for newest/oldest
    let newSortOrder = sort_order;
    if (value === "newest") {
      newSortOrder = "DESC";
    } else if (value === "oldest") {
      newSortOrder = "ASC";
    }
    navigate({
      search: (prev) => ({
        ...prev,
        sort: value,
        sort_order: newSortOrder,
        page: 1,
      }),
      replace: true, // Prevent history buildup
    });
  };

  const handleSortOrderChange = (value: "ASC" | "DESC") => {
    navigate({
      search: (prev) => ({ ...prev, sort_order: value, page: 1 }),
      replace: true, // Prevent history buildup
    });
  };

  const handleSearchChange = (value: string) => {
    navigate({
      search: (prev) => ({ ...prev, search: value || undefined, page: 1 }),
      replace: true, // Prevent history buildup
    });
  };

  const handleAccessTypeChange = (value: string) => {
    navigate({
      search: (prev) => ({ ...prev, access_type: value, page: 1 }),
      replace: true, // Prevent history buildup
    });
  };

  const handleLimitChange = (value: number) => {
    navigate({
      search: (prev) => ({ ...prev, limit: value, page: 1 }),
      replace: true, // Prevent history buildup
    });
  };

  const handleClearFilters = () => {
    navigate({
      search: { type, page: 1, limit: 12 },
      replace: true, // Prevent history buildup
    });
  };

  const handlePageChange = (newPage: number) => {
    navigate({
      search: (prev) => ({ ...prev, page: newPage }),
      replace: true, // Prevent history stack buildup
    });
  };

  const handleJumpToPage = () => {
    const targetPage = Number(jumpToPage);
    if (targetPage >= 1 && targetPage <= totalPages) {
      handlePageChange(targetPage);
      setJumpToPage("");
    }
  };

  // Generate pagination page numbers with ellipsis
  const getPaginationPages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7; // Show up to 7 page numbers
    const sidePages = 2; // Pages on each side of current page

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of middle section
      let start = Math.max(2, page - sidePages);
      let end = Math.min(totalPages - 1, page + sidePages);

      // Adjust if we're near the start
      if (page <= sidePages + 2) {
        end = Math.min(maxVisible - 1, totalPages - 1);
      }

      // Adjust if we're near the end
      if (page >= totalPages - sidePages - 1) {
        start = Math.max(2, totalPages - (maxVisible - 2));
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push("ellipsis-start");
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Carousel */}
      {/* {!search && <HeroCarousel />} */}

      <div className="container mx-auto py-12 px-4">
        {/* Content Type Tabs */}
        <div className="mb-6">
          <Tabs
            value={type}
            onValueChange={(value) =>
              handleTypeChange(
                value as "video" | "movie" | "tv-show" | "episode"
              )
            }
          >
            <TabsList>
              <TabsTrigger value="video">All Content</TabsTrigger>
              <TabsTrigger value="movie">Movies</TabsTrigger>
              <TabsTrigger value="tv-show">TV Shows</TabsTrigger>
              <TabsTrigger value="episode">Episodes</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Search Results Header */}
        {search && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              Search results for "{search}"
            </h2>
            <p className="text-muted-foreground">
              {totalItems}{" "}
              {type === "video"
                ? "videos"
                : type === "movie"
                  ? "movies"
                  : type === "tv-show"
                    ? "TV shows"
                    : "episodes"}{" "}
              found
            </p>
          </div>
        )}

        {/* Filter Bar */}
        <FilterBar
          contentType={type}
          search={search}
          genre={genre}
          year={year}
          sort={sort}
          sort_order={sort_order}
          access_type={access_type}
          limit={limit}
          onSearchChange={handleSearchChange}
          onGenreChange={handleGenreChange}
          onYearChange={handleYearChange}
          onSortChange={handleSortChange}
          onSortOrderChange={handleSortOrderChange}
          onAccessTypeChange={handleAccessTypeChange}
          onLimitChange={handleLimitChange}
          onClearFilters={handleClearFilters}
        />

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight">
            {search
              ? "Results"
              : type === "video"
                ? "Latest Videos"
                : type === "movie"
                  ? "Latest Movies"
                  : type === "tv-show"
                    ? "Latest TV Shows"
                    : "Latest Episodes"}
          </h2>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {error && !isLoading && (
          <div className="text-center py-20">
            <p className="text-destructive text-lg">
              Failed to load{" "}
              {type === "video"
                ? "videos"
                : type === "movie"
                  ? "movies"
                  : type === "tv-show"
                    ? "TV shows"
                    : "episodes"}
              . Please try again later.
            </p>
            {process.env.NODE_ENV === "development" && (
              <p className="text-xs text-muted-foreground mt-2">
                Error: {error instanceof Error ? error.message : String(error)}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {type === "video" &&
            videosData?.videos?.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          {type === "movie" &&
            moviesData?.movies?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          {type === "tv-show" &&
            tvShowsData?.tv_shows?.map((tvShow) => (
              <TVShowCard key={tvShow.id} tvShow={tvShow} />
            ))}
          {type === "episode" &&
            episodesData?.episodes?.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
        </div>

        {((type === "video" && videosData?.videos?.length === 0) ||
          (type === "movie" && moviesData?.movies?.length === 0) ||
          (type === "tv-show" && tvShowsData?.tv_shows?.length === 0) ||
          (type === "episode" && episodesData?.episodes?.length === 0)) &&
          !isLoading && (
            <div className="text-center text-muted-foreground mt-10">
              No{" "}
              {type === "video"
                ? "videos"
                : type === "movie"
                  ? "movies"
                  : type === "tv-show"
                    ? "TV shows"
                    : "episodes"}{" "}
              found. Try adjusting your filters.
            </div>
          )}

        {/* Pagination */}
        {totalItems > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between gap-8 flex-wrap lg:flex-nowrap">
              {/* Pagination Info - Left Side */}
              <div className="inline-flex items-center gap-6 px-6 py-4 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50 shadow-lg backdrop-blur-sm shrink-0">
                {/* Page Info */}
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
                      <span className="text-sm text-muted-foreground">/</span>
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

                {/* Items Info */}
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
                      <span className="text-sm text-muted-foreground">of</span>
                      <span className="text-lg font-semibold text-muted-foreground">
                        {totalItems}
                      </span>
                      <Badge
                        variant="secondary"
                        className="ml-2 text-xs font-medium capitalize"
                      >
                        {contentType}
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
                        onClick={() => handlePageChange(Math.max(1, page - 1))}
                        className={
                          page === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                    {getPaginationPages().map((pageNum, i) => {
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
                            onClick={() => handlePageChange(pageNum as number)}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
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
      </div>
    </div>
  );
}
