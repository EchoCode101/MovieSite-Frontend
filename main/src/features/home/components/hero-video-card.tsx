import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Play, Star } from 'lucide-react'
import type { Video } from '@/features/videos/types'

interface HeroVideoCardProps {
  video: Video
}

export function HeroVideoCard({ video }: HeroVideoCardProps) {
  return (
    <Card className="overflow-hidden group border-0 bg-transparent">
      <Link to="/watch/$videoId" params={{ videoId: video.id }}>
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          <img
            src={video.thumbnailUrl || '/placeholder-video.jpg'}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
              <Play className="w-8 h-8 text-primary-foreground fill-current" />
            </div>
          </div>

          {/* Access Level Badge */}
          <Badge className="absolute top-3 left-3" variant={video.accessLevel === 'Free' ? 'secondary' : 'default'}>
            {video.accessLevel}
          </Badge>

          {/* Content Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2 line-clamp-2">{video.title}</h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {video.rating?.toFixed(1) || 'N/A'}
              </span>
              <span>{video.category}</span>
              <span>{new Date(video.createdAt).getFullYear()}</span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
}
