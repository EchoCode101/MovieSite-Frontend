import { useQuery } from '@tanstack/react-query'
import { fetchFeaturedVideos, fetchPopularVideos, fetchVideosByCategory, fetchVideosByAccessLevel } from '../api/home'
import { queryKeys } from '@/lib/query-keys'

export const useFeaturedVideos = (limit: number = 8) => {
  return useQuery({
    queryKey: queryKeys.home.featuredVideos(limit),
    queryFn: () => fetchFeaturedVideos(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const usePopularVideos = (limit: number = 12) => {
  return useQuery({
    queryKey: queryKeys.home.popularVideos(limit),
    queryFn: () => fetchPopularVideos(limit),
    staleTime: 5 * 60 * 1000,
  })
}

export const useCategoryVideos = (category: string, limit: number = 12) => {
  return useQuery({
    queryKey: queryKeys.home.categoryVideos(category, limit),
    queryFn: () => fetchVideosByCategory(category, limit),
    staleTime: 5 * 60 * 1000,
    enabled: !!category,
  })
}

export const useAccessLevelVideos = (accessLevel: string, limit: number = 20) => {
  return useQuery({
    queryKey: queryKeys.home.accessLevelVideos(accessLevel, limit),
    queryFn: () => fetchVideosByAccessLevel(accessLevel, limit),
    staleTime: 5 * 60 * 1000,
    enabled: !!accessLevel,
  })
}
