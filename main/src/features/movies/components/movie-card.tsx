import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Clock, Calendar, Users, Film, Award } from 'lucide-react'
import type { Movie } from '../types'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const thumbnailUrl = movie.thumbnail_url || movie.poster_url || 'https://placehold.co/640x360/1f2937/9ca3af?text=No+Thumbnail'
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : null
  const duration = movie.duration ? `${Math.floor(movie.duration / 60)}h ${movie.duration % 60}m` : null

  return (
    <Link to="/movies/$id" params={{ id: movie.id }}>
      <Card className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden transition-all hover:shadow-lg group cursor-pointer">
        <div className="aspect-[2/3] relative bg-muted">
          {/* Thumbnail/Poster */}
          <img
            src={thumbnailUrl}
            alt={movie.title}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/640x960/1f2937/9ca3af?text=No+Poster'
            }}
          />
          
          {/* Access Type Badge */}
          <div className="absolute top-2 right-2">
            <Badge 
              variant={movie.access_type === 'free' ? 'default' : movie.access_type === 'subscription' ? 'secondary' : 'destructive'}
              className="text-xs"
            >
              {movie.access_type === 'free' ? 'Free' : movie.access_type === 'subscription' ? 'Premium' : 'PPV'}
            </Badge>
          </div>

          {/* Rating Badge */}
          {movie.rating && (
            <div className="absolute top-2 left-2 bg-primary px-2 py-1 text-xs rounded font-bold flex items-center gap-1 z-10">
              <Star className="h-3 w-3 fill-current" />
              {movie.rating.toFixed(1)}
            </div>
          )}

          {/* Trending/Featured Badge - Positioned below rating or standalone */}
          {movie.is_trending && (
            <div className={`absolute ${movie.rating ? 'top-10' : 'top-2'} left-2 bg-red-500 text-white px-2 py-0.5 text-xs rounded font-semibold z-10`}>
              Trending
            </div>
          )}
          {movie.is_featured && !movie.is_trending && (
            <div className={`absolute ${movie.rating ? 'top-10' : 'top-2'} left-2 bg-blue-500 text-white px-2 py-0.5 text-xs rounded font-semibold z-10`}>
              Featured
            </div>
          )}

          {/* Duration Badge */}
          {duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-0.5 text-xs rounded flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {duration}
            </div>
          )}

          {/* Coming Soon Badge */}
          {movie.is_coming_soon && (
            <div className="absolute bottom-2 left-2 bg-yellow-500 text-black px-2 py-0.5 text-xs rounded font-semibold">
              Coming Soon
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-muted-foreground">
            {releaseYear && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{releaseYear}</span>
              </div>
            )}
            {movie.age_rating && (
              <div className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                <span>{movie.age_rating}</span>
              </div>
            )}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex items-center gap-1">
                <Film className="h-3 w-3" />
                <span>{movie.genres.length} {movie.genres.length === 1 ? 'genre' : 'genres'}</span>
              </div>
            )}
            {movie.cast && movie.cast.length > 0 && (
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{movie.cast.length} {movie.cast.length === 1 ? 'cast' : 'cast members'}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {movie.description && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {movie.description}
            </p>
          )}
        </div>
      </Card>
    </Link>
  )
}
