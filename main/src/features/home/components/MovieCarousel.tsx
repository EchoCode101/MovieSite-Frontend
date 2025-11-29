import { Play, Plus, Info } from "lucide-react"
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

type Movie = {
  id: number
  title: string
  image: string
  rating: string
  year: string
  duration: string
  genre: string
}

type MovieCarouselProps = {
  title: string
  movies: Movie[]
}

export function MovieCarousel({ title, movies }: MovieCarouselProps) {
  return (
    <div className="w-full py-8 space-y-4">
      <div className="flex items-center justify-between px-4 md:px-8">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <Button variant="link" className="text-primary" asChild>
          <Link to="/catalog">View All</Link>
        </Button>
      </div>

      <div className="relative group px-4 md:px-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {movies.map((movie) => (
              <CarouselItem key={movie.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div className="relative aspect-[2/3] group/card overflow-hidden rounded-xl cursor-pointer">
                  <ImageWithFallback
                    src={movie.image}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-110"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                    <div className="space-y-2">
                      <h3 className="font-bold text-white line-clamp-2">{movie.title}</h3>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-300">
                        <Badge variant="outline" className="text-white border-white/20 bg-white/10">
                          {movie.rating}
                        </Badge>
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span>{movie.duration}</span>
                      </div>
                      <p className="text-xs text-gray-400">{movie.genre}</p>
                    </div>

                    <div className="space-y-2">
                      <Button size="sm" className="w-full gap-2" asChild>
                        <Link to={`/watch/${movie.id}`}>
                          <Play className="h-4 w-4 fill-current" />
                          Play
                        </Link>
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button size="sm" variant="secondary" className="w-full">
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <Info className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" />
          <CarouselNext className="right-0 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" />
        </Carousel>
      </div>
    </div>
  )
}
