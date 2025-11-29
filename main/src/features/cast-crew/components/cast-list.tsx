import { useQuery } from '@tanstack/react-query'
import { getCastCrewById } from '../api/cast-crew'
import { PersonCard } from './person-card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { queryKeys } from '@/lib/query-keys'

interface CastListProps {
  castIds: string[]
  className?: string
  limit?: number
}

/**
 * Component to display a list of cast members
 */
export function CastList({ castIds, className, limit }: CastListProps) {
  const displayIds = limit ? castIds.slice(0, limit) : castIds

  const { data: castMembers, isLoading } = useQuery({
    queryKey: queryKeys.castCrew.cast(displayIds),
    queryFn: async () => {
      const members = await Promise.all(
        displayIds.map((id) => getCastCrewById(id).catch(() => null))
      )
      return members.filter((m): m is NonNullable<typeof m> => m !== null)
    },
    enabled: displayIds.length > 0,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  if (isLoading) {
    return (
      <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4', className)}>
        {Array.from({ length: displayIds.length || 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    )
  }

  if (!castMembers || castMembers.length === 0) {
    return null
  }

  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4', className)}>
      {castMembers.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  )
}

