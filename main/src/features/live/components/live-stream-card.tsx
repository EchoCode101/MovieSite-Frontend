import { Link } from '@tanstack/react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, Play } from 'lucide-react'

interface LiveStreamCardProps {
  id: string
  title: string
  thumbnail: string
  isLive: boolean
  viewerCount?: number
  streamerName?: string
  streamerAvatar?: string
}

export function LiveStreamCard({
  id,
  title,
  thumbnail,
  isLive,
  viewerCount,
  streamerName,
  streamerAvatar,
}: LiveStreamCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <Link to="/watch/$videoId" params={{ videoId: id }}>
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {isLive && (
            <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-600">
              <span className="animate-pulse mr-1">●</span> LIVE
            </Badge>
          )}
          {viewerCount !== undefined && (
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {viewerCount >= 1000 ? `${(viewerCount / 1000).toFixed(1)}K` : viewerCount}
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex gap-3">
          {streamerAvatar && (
            <img
              src={streamerAvatar}
              alt={streamerName}
              className="w-10 h-10 rounded-full"
            />
          )}
          <div className="flex-1 min-w-0">
            <Link to="/watch/$videoId" params={{ videoId: id }}>
              <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">
                {title}
              </h3>
            </Link>
            {streamerName && (
              <p className="text-sm text-muted-foreground mt-1">{streamerName}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
