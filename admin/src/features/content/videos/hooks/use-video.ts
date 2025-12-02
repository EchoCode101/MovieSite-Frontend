import { useQuery } from '@tanstack/react-query'

import { getVideoById } from '../api/videos-api'
import type { VideoDetail } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch a single video by ID
 */
export function useVideo(id: string | undefined) {
  return useQuery<VideoDetail>({
    queryKey: queryKeys.videos.detail(id || ''),
    queryFn: () => {
      if (!id) throw new Error('Video ID is required')
      return getVideoById(id)
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

