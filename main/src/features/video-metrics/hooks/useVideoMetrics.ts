import { useQuery } from '@tanstack/react-query'
import { getVideoMetrics } from '../api/video-metrics'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch video metrics
 * 
 * @returns Query hook for video metrics
 */
export const useVideoMetrics = () => {
  return useQuery({
    queryKey: queryKeys.videoMetrics.all,
    queryFn: getVideoMetrics,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

