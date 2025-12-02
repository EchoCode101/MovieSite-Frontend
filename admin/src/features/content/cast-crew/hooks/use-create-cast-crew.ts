import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createCastCrew } from '../api/cast-crew-api'
import type { CreateCastCrewPayload } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to create a new cast/crew member
 */
export function useCreateCastCrew() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateCastCrewPayload) => createCastCrew(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.castCrew.all })
      toast.success('Cast/Crew member created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create cast/crew member', error.message)
    },
  })
}

