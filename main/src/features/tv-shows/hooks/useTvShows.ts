import { useQuery, useQueries } from '@tanstack/react-query'
import { getTVShows, getTVShowById, getTVShowSeasons } from '../api/tv-shows'
import { queryKeys } from '@/lib/query-keys'
import { combineQueryResults } from '@/features/videos/utils/combine-query-results'
import type { TVShow } from '../types'

interface UseTVShowsParams {
  page?: number
  limit?: number
  genre?: string | string[]
  year?: number | number[]
  search?: string
  access_type?: 'free' | 'subscription' | 'pay_per_view'
  sort?: string
  order?: string
}

export const useTVShows = (params?: UseTVShowsParams) => {
  const genreArray = Array.isArray(params?.genre) ? params.genre : params?.genre ? [params.genre] : []
  const yearArray = Array.isArray(params?.year) ? params.year : params?.year ? [params.year] : []
  
  const hasMultipleGenres = genreArray.length > 1
  const hasMultipleYears = yearArray.length > 1
  const needsMultiSelect = hasMultipleGenres || hasMultipleYears
  
  // Always call useQuery (for single select case)
  const singleQuery = useQuery({
    queryKey: queryKeys.tvShows.list(params),
    queryFn: () => getTVShows(params),
    enabled: !needsMultiSelect, // Only enable when not using multi-select
    staleTime: 1000 * 60 * 5,
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
          queryKey: queryKeys.tvShows.list({
            ...params,
            genre: filterParams.genre,
            year: filterParams.year,
          }),
          queryFn: () => getTVShows({
            ...params,
            genre: filterParams.genre,
            year: filterParams.year,
          }),
          staleTime: 1000 * 60 * 5,
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
  const combined = combineQueryResults<TVShow>(
    multiQueries,
    'tv_shows',
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
function createSortFunction(sort: string, order: 'ASC' | 'DESC'): (a: TVShow, b: TVShow) => number {
  const multiplier = order === 'ASC' ? 1 : -1
  
  switch (sort) {
    case 'title':
      return (a, b) => ((a.title || '').localeCompare(b.title || '')) * multiplier
    case 'createdAt':
      return (a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return (dateA - dateB) * multiplier
      }
    case 'updatedAt':
      return (a, b) => {
        const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0
        const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0
        return (dateA - dateB) * multiplier
      }
    case 'imdb_rating':
    case 'rating':
      return (a, b) => ((a.rating || 0) - (b.rating || 0)) * multiplier
    case 'release_year':
      return (a, b) => ((a.release_year || 0) - (b.release_year || 0)) * multiplier
    case 'release_date':
      return (a, b) => {
        const dateA = a.release_date ? new Date(a.release_date).getTime() : 0
        const dateB = b.release_date ? new Date(b.release_date).getTime() : 0
        return (dateA - dateB) * multiplier
      }
    default:
      return (a, b) => 0
  }
}

export const useTVShow = (id: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: queryKeys.tvShows.detail(id),
    queryFn: () => getTVShowById(id),
    enabled: options?.enabled !== false && !!id,
    staleTime: 1000 * 60 * 5,
    retry: false, // Don't retry on 403 errors
  })
}

export const useTVShowSeasons = (id: string) => {
  return useQuery({
    queryKey: queryKeys.tvShows.seasons(id),
    queryFn: () => getTVShowSeasons(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
}

