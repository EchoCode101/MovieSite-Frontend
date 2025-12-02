import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteCastCrew } from '../api/cast-crew-api'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to delete a cast/crew member
 */
export function useDeleteCastCrew() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCastCrew(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.castCrew.all })
      toast.success('Cast/Crew member deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete cast/crew member', error.message)
    },
  })
}

