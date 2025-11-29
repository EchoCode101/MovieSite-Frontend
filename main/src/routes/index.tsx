import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "@/features/home/components/HeroCarousel";
import { MovieCarousel } from "@/features/home/components/MovieCarousel";
import { PricingSection } from "@/features/home/components/PricingSection";
import { PartnersMarquee } from "@/features/home/components/PartnersMarquee";
import { ContinueWatchingCarousel } from "@/features/watch/components/continue-watching-carousel";
import {
  useTrendingMovies,
  useFeaturedMovies,
  useComingSoonMovies,
} from "@/features/movies/hooks/useMovies";
import { useBanners } from "@/features/banners/hooks/useBanners";
import { useUser } from "@/features/auth/hooks/useAuth";
import { getActiveProfileId } from "@/features/profiles/components/profile-selector";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { data: user } = useUser();
  const activeProfileId = getActiveProfileId();
  const { data: trendingMovies, isLoading: trendingLoading } =
    useTrendingMovies();
  const { data: featuredMovies, isLoading: featuredLoading } =
    useFeaturedMovies();
  const { data: comingSoonMovies, isLoading: comingSoonLoading } =
    useComingSoonMovies();
  const { data: banners } = useBanners({ device: "web", position: "home" });

  // Transform movies for MovieCarousel component
  const transformMoviesForCarousel = (movies: typeof trendingMovies) => {
    if (!movies) return [];
    return movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      image: movie.thumbnail_url || movie.poster_url || "",
      rating: movie.rating?.toFixed(1) || "0.0",
      year: movie.release_date
        ? new Date(movie.release_date).getFullYear().toString()
        : "",
      duration: movie.duration
        ? `${Math.floor(movie.duration / 60)}h ${movie.duration % 60}m`
        : "",
      genre: movie.genres?.[0] || "Unknown",
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel - Use banners if available, otherwise use featured movies */}
      {banners && banners.length > 0 ? (
        <HeroCarousel banners={banners} />
      ) : (
        <HeroCarousel />
      )}

      <div className="container mx-auto px-4 space-y-8 pb-16">
        {/* Continue Watching Section - Only show if user is logged in and has active profile */}
        {user && activeProfileId && (
          <ContinueWatchingCarousel profileId={activeProfileId} limit={10} />
        )}

        {/* Trending Movies Carousel */}
        {trendingLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : trendingMovies && trendingMovies.length > 0 ? (
          <MovieCarousel
            title="Trending Now"
            movies={transformMoviesForCarousel(trendingMovies)}
          />
        ) : null}

        {/* Featured Movies Carousel */}
        {featuredLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : featuredMovies && featuredMovies.length > 0 ? (
          <MovieCarousel
            title="Popular Movies"
            movies={transformMoviesForCarousel(featuredMovies)}
          />
        ) : null}

        {/* Coming Soon Movies Carousel */}
        {comingSoonLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : comingSoonMovies && comingSoonMovies.length > 0 ? (
          <MovieCarousel
            title="Coming Soon"
            movies={transformMoviesForCarousel(comingSoonMovies)}
          />
        ) : null}

        {/* Partners Marquee */}
        <PartnersMarquee />

        {/* Pricing Section */}
        <PricingSection />

        {/* CTA Section */}
        <section className="py-16 bg-muted/30 rounded-xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Watching?
            </h2>
            <p className="max-w-[600px] mx-auto text-lg text-muted-foreground mb-8">
              Join thousands of users streaming high-quality content today.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-primary hover:bg-primary/90"
              >
                <Link to="/catalog">Browse Catalog</Link>
              </Button>
              {!user && (
                <Button size="lg" variant="outline" asChild>
                  <Link to="/auth/register">Sign Up Free</Link>
                </Button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
