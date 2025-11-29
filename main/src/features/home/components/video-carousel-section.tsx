import { Link } from '@tanstack/react-router'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { VideoCard } from '@/features/videos/components/video-card'
import type { Video } from '@/features/videos/types'

interface VideoCarouselSectionProps {
  title: string
  videos: Video[]
  viewAllLink?: string
}

export function VideoCarouselSection({ title, videos, viewAllLink }: VideoCarouselSectionProps) {
  if (!videos || videos.length === 0) {
    return null
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">
            {viewAllLink ? (
              <Link to={viewAllLink} className="hover:text-primary transition-colors">
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {videos.map((video) => (
              <CarouselItem key={video.id} className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/6">
                <VideoCard video={video} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
    </section>
  )
}
