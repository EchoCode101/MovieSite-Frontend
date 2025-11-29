import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Calendar, Users, Film, Award, Languages } from 'lucide-react'
import type { TVShow } from '../types'

interface TVShowCardProps {
  tvShow: TVShow
}

export function TVShowCard({ tvShow }: TVShowCardProps) {
  const thumbnailUrl = tvShow.thumbnail_url || tvShow.poster_url || 'https://placehold.co/640x360/1f2937/9ca3af?text=No+Thumbnail'
  const releaseYear = tvShow.release_year || (tvShow.release_date ? new Date(tvShow.release_date).getFullYear() : null)

  return (
    <Link to="/tv-shows/$id" params={{ id: tvShow.id }}>
      <Card className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden transition-all hover:shadow-lg group cursor-pointer">
        <div className="aspect-[2/3] relative bg-muted">
          {/* Thumbnail/Poster */}
          <img
            src={thumbnailUrl}
            alt={tvShow.title}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/640x960/1f2937/9ca3af?text=No+Poster'
            }}
          />
          
          {/* Access Type Badge */}
          <div className="absolute top-2 right-2">
            <Badge 
              variant={tvShow.access_type === 'free' ? 'default' : tvShow.access_type === 'subscription' ? 'secondary' : 'destructive'}
              className="text-xs"
            >
              {tvShow.access_type === 'free' ? 'Free' : tvShow.access_type === 'subscription' ? 'Premium' : 'PPV'}
            </Badge>
          </div>

          {/* Rating Badge */}
          {(tvShow.rating || tvShow.imdb_rating) && (
            <div className="absolute top-2 left-2 bg-primary px-2 py-1 text-xs rounded font-bold flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              {(tvShow.rating || tvShow.imdb_rating)?.toFixed(1)}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
            {tvShow.title}
          </h3>
          
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-muted-foreground">
            {releaseYear && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{releaseYear}</span>
              </div>
            )}
            {tvShow.content_rating && (
              <div className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                <span>{tvShow.content_rating}</span>
              </div>
            )}
            {tvShow.language && (
              <div className="flex items-center gap-1">
                <Languages className="h-3 w-3" />
                <span>{tvShow.language}</span>
              </div>
            )}
            {tvShow.genres && tvShow.genres.length > 0 && (
              <div className="flex items-center gap-1">
                <Film className="h-3 w-3" />
                <span>{tvShow.genres.length} {tvShow.genres.length === 1 ? 'genre' : 'genres'}</span>
              </div>
            )}
            {tvShow.cast && tvShow.cast.length > 0 && (
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{tvShow.cast.length} {tvShow.cast.length === 1 ? 'cast' : 'cast members'}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {tvShow.description && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {tvShow.description}
            </p>
          )}
        </div>
      </Card>
    </Link>
  )
}
