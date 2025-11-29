import { useQuery, useQueries } from '@tanstack/react-query'
import { getEpisodesBySeason, getEpisodeById, getPaginatedEpisodes, type PaginatedEpisodesParams } from '../api/episodes'
import { queryKeys } from '@/lib/query-keys'
import { combineQueryResults } from '@/features/videos/utils/combine-query-results'
import type { Episode } from '../types'

export const useEpisodesBySeason = (seasonId: string) => {
  return useQuery({
    queryKey: queryKeys.episodes.bySeason(seasonId),
    queryFn: () => getEpisodesBySeason(seasonId),
    enabled: !!seasonId,
    staleTime: 1000 * 60 * 5,
  })
}

export const useEpisode = (id: string) => {
  return useQuery({
    queryKey: queryKeys.episodes.detail(id),
    queryFn: () => getEpisodeById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
}

export const useEpisodes = (params: PaginatedEpisodesParams) => {
  const genreArray = Array.isArray(params.genre) ? params.genre : params.genre ? [params.genre] : []
  const yearArray = Array.isArray(params.year) ? params.year : params.year ? [params.year] : []
  
  const hasMultipleGenres = genreArray.length > 1
  const hasMultipleYears = yearArray.length > 1
  const needsMultiSelect = hasMultipleGenres || hasMultipleYears
  
  // Always call useQuery (for single select case)
  const singleQuery = useQuery({
    queryKey: queryKeys.episodes.list(params),
    queryFn: () => getPaginatedEpisodes(params),
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
          queryKey: queryKeys.episodes.list({
            ...params,
            genre: filterParams.genre,
            year: filterParams.year,
          }),
          queryFn: () => getPaginatedEpisodes({
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
  const combined = combineQueryResults<Episode>(
    multiQueries,
    'episodes',
    params.page || 1,
    params.limit || 12,
    // Apply sorting if provided
    params.sort && params.order
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
function createSortFunction(sort: string, order: 'ASC' | 'DESC'): (a: Episode, b: Episode) => number {
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
    case 'episode_number':
      return (a, b) => ((a.episode_number || 0) - (b.episode_number || 0)) * multiplier
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

