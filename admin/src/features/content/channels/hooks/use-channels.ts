import { useQuery } from '@tanstack/react-query'

import { getChannels } from '../api/channels-api'
import type { ChannelListParams } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch all channels
 */
export function useChannels(params?: ChannelListParams) {
  return useQuery({
    queryKey: queryKeys.channels.all,
    queryFn: () => getChannels(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

