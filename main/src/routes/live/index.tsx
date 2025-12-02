import { createFileRoute, Link } from '@tanstack/react-router'
import { useChannels } from '@/features/channels/hooks/useChannels'
// import { HeroCarousel } from '@/features/home/components/HeroCarousel'
import { Loader2 } from 'lucide-react'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'

export const Route = createFileRoute('/live/')({
  component: LivePage,
})

function LivePage() {
  const { data: channels, isLoading, error } = useChannels()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Carousel */}
      {/* <HeroCarousel /> */}

      <div className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Live TV Channels</h1>
            <p className="text-muted-foreground text-lg">
              Watch live TV channels from around the world
            </p>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <div className="text-center py-20 text-destructive">
              Error loading channels: {error.message}
            </div>
          )}

          {channels && channels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {channels.map((channel) => (
                <Link key={channel.id} to={`/live/${channel.id}`}>
                  <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative aspect-video">
                      <ImageWithFallback
                        src={channel.logo_url || ''}
                        alt={channel.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="destructive">LIVE</Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{channel.name}</h3>
                      {channel.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {channel.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {channel.category && (
                          <Badge variant="outline">{channel.category}</Badge>
                        )}
                        {channel.country && <span>{channel.country}</span>}
                        {channel.language && <span>• {channel.language}</span>}
                      </div>
                      <Button className="w-full mt-4" size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Watch Now
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            !isLoading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No live channels available at the moment. Check back later!
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
