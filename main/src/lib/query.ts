import { QueryClient } from '@tanstack/react-query'

/**
 * Global QueryClient configuration
 * 
 * Default options for all TanStack Query hooks:
 * - staleTime: 1 minute - Data is considered fresh for 1 minute
 * - gcTime: 30 minutes - Unused cache is garbage collected after 30 minutes
 * - retry: 2 - Retry failed requests twice before giving up
 * - refetchOnWindowFocus: false - Don't refetch when window regains focus (better for streaming apps)
 * 
 * Individual hooks can override these defaults when needed.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})
