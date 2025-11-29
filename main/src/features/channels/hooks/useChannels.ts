import { useQuery } from '@tanstack/react-query'
import { getChannels, getChannelById } from '../api/channels'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch channels with optional filters
 * 
 * @param params - Optional filters (category, country, language)
 * @returns Query hook for channels
 */
export const useChannels = (params?: {
  category?: string
  country?: string
  language?: string
}) => {
  return useQuery({
    queryKey: queryKeys.channels.lists(params),
    queryFn: () => getChannels(params),
    staleTime: 1000 * 60 * 5,
  })
}

/**
 * Hook to fetch a single channel by ID
 * 
 * @param id - Channel ID
 * @returns Query hook for channel
 */
export const useChannel = (id: string) => {
  return useQuery({
    queryKey: queryKeys.channels.detail(id),
    queryFn: () => getChannelById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
}

