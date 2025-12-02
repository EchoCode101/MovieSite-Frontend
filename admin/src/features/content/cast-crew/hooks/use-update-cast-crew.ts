import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateCastCrew } from '../api/cast-crew-api'
import type { UpdateCastCrewPayload } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to update an existing cast/crew member
 */
export function useUpdateCastCrew() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCastCrewPayload }) =>
      updateCastCrew(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.castCrew.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.castCrew.detail(variables.id) })
      toast.success('Cast/Crew member updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update cast/crew member', error.message)
    },
  })
}

