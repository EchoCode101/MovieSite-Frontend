import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

interface GenreBadgeProps {
  genre: string | { id: string; name: string }
  variant?: 'default' | 'secondary' | 'outline'
  className?: string
  linkTo?: boolean
}

/**
 * Badge component for displaying genres
 */
export function GenreBadge({ genre, variant = 'secondary', className, linkTo = false }: GenreBadgeProps) {
  const genreName = typeof genre === 'string' ? genre : genre.name
  const genreId = typeof genre === 'string' ? undefined : genre.id

  const badge = (
    <Badge variant={variant} className={cn('capitalize', className)}>
      {genreName}
    </Badge>
  )

  if (linkTo && genreId) {
    return (
      <Link to={`/category/${genreId}`}>
        {badge}
      </Link>
    )
  }

  return badge
}

