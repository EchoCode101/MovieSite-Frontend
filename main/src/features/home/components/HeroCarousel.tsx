import { Play, Plus, Clock, Star, Calendar, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import { Link } from "@tanstack/react-router"
import type { Banner } from "@/features/banners/types"

const HERO_SLIDES = [
  {
    id: 1,
    title: "The Last Kingdom",
    image: "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?q=80&w=1974&auto=format&fit=crop",
    rating: "4.8",
    year: "2023",
    language: "English, Punjabi",
    description: "As Alfred the Great defends his kingdom from Norse invaders, Uhtred, born a Saxon but raised by Vikings, seeks to claim his ancestral birthright.",
  },
  {
    id: 2,
    title: "Cyberpunk: Edgerunners",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
    rating: "4.9",
    year: "2024",
    language: "Japanese, English",
    description: "In a dystopia riddled with corruption and cybernetic implants, a talented but reckless street kid strives to become a mercenary outlaw — an edgerunner.",
  },
  {
    id: 3,
    title: "Dune: Part Two",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop",
    rating: "4.7",
    year: "2024",
    language: "English",
    description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
  },
]

interface HeroCarouselProps {
  banners?: Banner[]
}

export function HeroCarousel({ banners }: HeroCarouselProps = {}) {
  // Use banners if provided, otherwise use static slides
  const slides = banners && banners.length > 0
    ? banners.map((banner) => ({
        id: banner.id,
        title: banner.title,
        image: banner.image_url,
        rating: "",
        year: "",
        language: "",
        description: "",
        linkUrl: banner.link_url,
        targetType: banner.target_type,
        targetId: banner.target_id,
      }))
    : HERO_SLIDES
  return (
    <div className="w-full relative group">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {HERO_SLIDES.map((slide) => (
            <CarouselItem key={slide.id} className="relative h-[600px] w-full">
              <div className="absolute inset-0">
                <ImageWithFallback
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 w-full md:pl-50  p-8 md:p-16 flex flex-col justify-end h-full max-w-3xl space-y-6">
                {slide.rating && (
                  <div className="flex items-center space-x-4 text-sm font-medium text-muted-foreground">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      {slide.rating}
                    </Badge>
                    {slide.year && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {slide.year}
                      </div>
                    )}
                    {slide.language && (
                      <div className="flex items-center gap-1">
                        <Languages className="h-4 w-4" />
                        {slide.language}
                      </div>
                    )}
                  </div>
                )}

                <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
                  {slide.title}
                </h1>

                {slide.description && (
                  <p className="text-lg text-muted-foreground line-clamp-3 md:line-clamp-2 max-w-2xl">
                    {slide.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  {slide.linkUrl ? (
                    <Button size="lg" className="gap-2 text-base px-8" asChild>
                      <a href={slide.linkUrl}>
                        <Play className="h-5 w-5 fill-current" />
                        Watch Now
                      </a>
                    </Button>
                  ) : (
                    <Button size="lg" className="gap-2 text-base px-8" asChild>
                      <Link to={`/watch/${slide.id}`}>
                        <Play className="h-5 w-5 fill-current" />
                        Watch Now
                      </Link>
                    </Button>
                  )}
                  <Button size="lg" variant="secondary" className="gap-2">
                    <Plus className="h-5 w-5" />
                    Wishlist
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Clock className="h-5 w-5" />
                    Watch Later
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Carousel>
    </div>
  );
}
