import { useQuery } from '@tanstack/react-query'

import { getVideos } from '../api/videos-api'
import type { VideoListParams, VideoListResponse } from '../types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch paginated list of videos
 */
export function useVideos(params: VideoListParams) {
  return useQuery<VideoListResponse>({
    queryKey: queryKeys.videos.list(params),
    queryFn: () => getVideos(params),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

