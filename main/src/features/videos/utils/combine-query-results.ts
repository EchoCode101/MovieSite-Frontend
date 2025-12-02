import type { UseQueryResult } from '@tanstack/react-query'

/**
 * Generic type for paginated data
 */
interface PaginatedData<T> {
  currentPage: number
  totalPages: number
  totalItems: number
  [key: string]: unknown // Allow additional properties like videos, movies, etc.
}

/**
 * Combine multiple query results into a single paginated result
 * 
 * @param queries - Array of query results from useQueries
 * @param itemKey - Key to extract items array from each query result (e.g., 'videos', 'movies', 'tv_shows')
 * @param page - Current page number (1-indexed)
 * @param limit - Items per page
 * @param sortFn - Optional sorting function to apply to combined results
 * @returns Combined paginated data
 */
export function combineQueryResults<T extends { id: string }>(
  queries: UseQueryResult<PaginatedData<T> & { [key: string]: T[] }>[],
  itemKey: string,
  page: number = 1,
  limit: number = 12,
  sortFn?: (a: T, b: T) => number
): {
  data: (PaginatedData<T> & { [key: string]: T[] }) | undefined
  isLoading: boolean
  error: Error | null
} {
  // Check if any query is loading
  const isLoading = queries.some((query) => query.isLoading)

  // Check if any query has an error
  const error = queries.find((query) => query.error)?.error as Error | null

  // If any query is loading or has an error, return early
  if (isLoading || error) {
    return {
      data: undefined,
      isLoading,
      error,
    }
  }

  // Collect all items from all successful queries
  const allItems: T[] = []
  let totalItems = 0

  for (const query of queries) {
    if (query.data) {
      const items = query.data[itemKey] as T[]
      if (Array.isArray(items)) {
        // Deduplicate by ID - only add items that don't already exist
        for (const item of items) {
          if (!allItems.find((existing) => existing.id === item.id)) {
            allItems.push(item)
          }
        }
        // Sum up totalItems (approximate, since we're deduplicating)
        totalItems += query.data.totalItems
      }
    }
  }

  // Apply sorting if provided
  const sortedItems = sortFn ? [...allItems].sort(sortFn) : allItems

  // Apply client-side pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedItems = sortedItems.slice(startIndex, endIndex)

  // Calculate total pages based on deduplicated items
  const actualTotalItems = sortedItems.length
  const totalPages = Math.ceil(actualTotalItems / limit)

  return {
    data: {
      [itemKey]: paginatedItems,
      currentPage: page,
      totalPages,
      totalItems: actualTotalItems,
    } as PaginatedData<T> & { [key: string]: T[] },
    isLoading: false,
    error: null,
  }
}

