import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { HeroVideoCard } from './hero-video-card'
import type { Video } from '@/features/videos/types'

interface HeroCarouselProps {
  videos: Video[]
}

export function HeroCarousel({ videos }: HeroCarouselProps) {
  if (!videos || videos.length === 0) {
    return null
  }

  return (
    <div className="relative w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold">
            <b>Best Movies</b> of this season
          </h1>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {videos.map((video) => (
              <CarouselItem key={video.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <HeroVideoCard video={video} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
    </div>
  )
}
