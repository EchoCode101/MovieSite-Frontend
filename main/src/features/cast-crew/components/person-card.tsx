import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { CastCrew } from '../types'
import { User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PersonCardProps {
  person: CastCrew
  className?: string
}

/**
 * Card component for displaying a cast/crew member
 */
export function PersonCard({ person, className }: PersonCardProps) {
  const initials = person.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card className={cn('overflow-hidden hover:shadow-lg transition-shadow', className)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={person.image_url || undefined} alt={person.name} />
            <AvatarFallback>
              {person.image_url ? <User className="h-8 w-8" /> : initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{person.name}</h3>
            <p className="text-sm text-muted-foreground capitalize">{person.type}</p>
            {person.bio && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{person.bio}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

