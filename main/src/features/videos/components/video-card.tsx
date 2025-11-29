import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Eye, Calendar, Tag } from 'lucide-react'
import type { Video } from '../types'

interface VideoCardProps {
  video: Video
}

function formatDuration(seconds?: number): string {
  if (!seconds) return ''
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m ${secs}s`
}

export function VideoCard({ video }: VideoCardProps) {
  const duration = formatDuration(video.duration)
  const formattedDate = video.createdAt ? new Date(video.createdAt).toLocaleDateString() : null

  return (
    <Link to="/watch/$videoId" params={{ videoId: video.id }}>
      <Card className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden transition-all hover:shadow-lg group cursor-pointer">
        <div className="aspect-video relative bg-muted">
          {/* Thumbnail */}
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/640x360/1f2937/9ca3af?text=No+Thumbnail'
            }}
          />
          
          {/* Access Level Badge */}
          <div className="absolute top-2 right-2">
            <Badge 
              variant={video.accessLevel === 'Free' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {video.accessLevel}
            </Badge>
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
            {video.title}
          </h3>
          
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-muted-foreground">
            {video.views > 0 && (
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{video.views.toLocaleString()} views</span>
              </div>
            )}
            {video.category && (
              <div className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                <span>{video.category}</span>
              </div>
            )}
            {formattedDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formattedDate}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {video.description && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {video.description}
            </p>
          )}
        </div>
      </Card>
    </Link>
  )
}
