import { useQuery } from '@tanstack/react-query'
import { getCastCrewById } from '../api/cast-crew'
import { PersonCard } from './person-card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { queryKeys } from '@/lib/query-keys'

interface CrewListProps {
  crewIds: string[]
  className?: string
  limit?: number
  type?: 'director' | 'writer' | 'crew'
}

/**
 * Component to display a list of crew members
 */
export function CrewList({ crewIds, className, limit, type }: CrewListProps) {
  const displayIds = limit ? crewIds.slice(0, limit) : crewIds

  const { data: crewMembers, isLoading } = useQuery({
    queryKey: queryKeys.castCrew.crew(displayIds, type),
    queryFn: async () => {
      const members = await Promise.all(
        displayIds.map((id) => getCastCrewById(id).catch(() => null))
      )
      return members
        .filter((m): m is NonNullable<typeof m> => m !== null)
        .filter((m) => !type || m.type === type)
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

  if (!crewMembers || crewMembers.length === 0) {
    return null
  }

  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4', className)}>
      {crewMembers.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  )
}

