import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Calendar, Play } from 'lucide-react'
import type { Episode } from '../types'

interface EpisodeCardProps {
  episode: Episode
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const thumbnailUrl = episode.thumbnail_url || 'https://placehold.co/640x360/1f2937/9ca3af?text=No+Thumbnail'
  const releaseDate = episode.release_date ? new Date(episode.release_date).toLocaleDateString() : null
  const duration = episode.duration_minutes 
    ? `${Math.floor(episode.duration_minutes / 60)}h ${episode.duration_minutes % 60}m`
    : null

  return (
    <Link to="/episodes/$id" params={{ id: episode.id }}>
      <Card className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden transition-all hover:shadow-lg group cursor-pointer">
        <div className="aspect-video relative bg-muted">
          {/* Thumbnail */}
          <img
            src={thumbnailUrl}
            alt={episode.title}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/640x360/1f2937/9ca3af?text=No+Thumbnail'
            }}
          />
          
          {/* Access Type Badge */}
          <div className="absolute top-2 right-2">
            <Badge 
              variant={episode.access_type === 'free' ? 'default' : episode.access_type === 'subscription' ? 'secondary' : 'destructive'}
              className="text-xs"
            >
              {episode.access_type === 'free' ? 'Free' : episode.access_type === 'subscription' ? 'Premium' : 'PPV'}
            </Badge>
          </div>

          {/* Episode Number Badge */}
          <div className="absolute top-2 left-2 bg-primary  px-2 py-1 text-xs rounded font-bold flex items-center gap-1">
            <Play className="h-3 w-3" />
            E{episode.episode_number}
          </div>

          {/* Duration Badge */}
          {duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-0.5 text-xs rounded flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {duration}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
            {episode.title}
          </h3>
          
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-muted-foreground">
            {episode.episode_number && (
              <div className="flex items-center gap-1">
                <span>Episode {episode.episode_number}</span>
              </div>
            )}
            {releaseDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{releaseDate}</span>
              </div>
            )}
            {episode.duration_minutes && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{episode.duration_minutes} min</span>
              </div>
            )}
          </div>

          {/* Description */}
          {episode.description && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {episode.description}
            </p>
          )}
        </div>
      </Card>
    </Link>
  )
}
