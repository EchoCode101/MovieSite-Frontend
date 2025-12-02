import { useQuery, useQueries } from '@tanstack/react-query'
import { getVideos, getVideoById, getRelatedVideos } from '../api/videos'
import { queryKeys } from '@/lib/query-keys'
import { combineQueryResults } from '../utils/combine-query-results'
import type { Video } from '../types'

interface UseVideosParams {
  page?: number
  limit?: number
  genre?: string | string[]
  year?: number | number[]
  search?: string
  access_type?: 'free' | 'subscription' | 'pay_per_view'
  sort?: string
  order?: string
}

export const useVideos = (params?: UseVideosParams) => {
  const genreArray = Array.isArray(params?.genre) ? params.genre : params?.genre ? [params.genre] : []
  const yearArray = Array.isArray(params?.year) ? params.year : params?.year ? [params.year] : []
  
  const hasMultipleGenres = genreArray.length > 1
  const hasMultipleYears = yearArray.length > 1
  const needsMultiSelect = hasMultipleGenres || hasMultipleYears
  
  // Always call useQuery (for single select case)
  const singleQuery = useQuery({
    queryKey: queryKeys.videos.list(params),
    queryFn: () => getVideos(params),
    enabled: !needsMultiSelect, // Only enable when not using multi-select
  })
  
  // Prepare query params for multi-select
  const queryParams: Array<{ genre?: string; year?: number }> = []
  
  if (hasMultipleGenres && hasMultipleYears) {
    // Cartesian product: all genre-year combinations
    for (const genre of genreArray) {
      for (const year of yearArray) {
        queryParams.push({ genre, year })
      }
    }
  } else if (hasMultipleGenres) {
    // Multiple genres, single year
    for (const genre of genreArray) {
      queryParams.push({ genre, year: yearArray.length > 0 ? yearArray[0] : undefined })
    }
  } else if (hasMultipleYears) {
    // Single genre, multiple years
    for (const year of yearArray) {
      queryParams.push({ genre: genreArray.length > 0 ? genreArray[0] : undefined, year })
    }
  }
  
  // Always call useQueries (but with empty array when not needed)
  const multiQueries = useQueries({
    queries: needsMultiSelect
      ? queryParams.map((filterParams) => ({
          queryKey: queryKeys.videos.list({
            ...params,
            genre: filterParams.genre,
            year: filterParams.year,
          }),
          queryFn: () => getVideos({
            ...params,
            genre: filterParams.genre,
            year: filterParams.year,
          }),
        }))
      : [], // Empty array when not using multi-select
  })
  
  // Return appropriate result based on whether multi-select is needed
  if (!needsMultiSelect) {
    return {
      data: singleQuery.data,
      isLoading: singleQuery.isLoading,
      error: singleQuery.error as Error | null,
    }
  }
  
  // Combine results from multi-select queries
  const combined = combineQueryResults<Video>(
    multiQueries,
    'videos',
    params?.page || 1,
    params?.limit || 12,
    // Apply sorting if provided
    params?.sort && params?.order
      ? createSortFunction(params.sort, params.order)
      : undefined
  )
  
  return {
    data: combined.data,
    isLoading: combined.isLoading,
    error: combined.error,
  }
}

/**
 * Create a sort function based on sort field and order
 */
function createSortFunction(sort: string, order: 'ASC' | 'DESC'): (a: Video, b: Video) => number {
  const multiplier = order === 'ASC' ? 1 : -1
  
  switch (sort) {
    case 'title':
      return (a, b) => (a.title.localeCompare(b.title) * multiplier)
    case 'createdAt':
      return (a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return (dateA - dateB) * multiplier
      }
    case 'views_count':
      return (a, b) => ((a.views || 0) - (b.views || 0)) * multiplier
    case 'rating':
      return (a, b) => ((a.rating || 0) - (b.rating || 0)) * multiplier
    default:
      return (a, b) => 0
  }
}

export const useVideo = (id: string) => {
  return useQuery({
    queryKey: queryKeys.video.detail('video', id),
    queryFn: () => getVideoById(id),
    enabled: !!id,
  })
}

export const useRelatedVideos = (id: string) => {
  return useQuery({
    queryKey: queryKeys.videos.related(id),
    queryFn: () => getRelatedVideos(id),
    enabled: !!id,
  })
}
