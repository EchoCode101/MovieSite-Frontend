import { useQuery } from '@tanstack/react-query'

import { getChannelById } from '../api/channels-api'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch a single channel by ID
 */
export function useChannel(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.channels.detail(id || ''),
    queryFn: () => {
      if (!id) throw new Error('Channel ID is required')
      return getChannelById(id)
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

