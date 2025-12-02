import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteSeason } from '../api/seasons-api'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to delete a season
 */
export function useDeleteSeason() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteSeason(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.seasons.all })
      toast.success('Season deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete season', error.message)
    },
  })
}

