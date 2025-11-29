import { queryClient } from './query'
import { validateToken } from '@/features/auth/api/auth'
import { logger } from './logger'
import type { User } from '@/features/auth/types'
import { queryKeys } from './query-keys'

/**
 * Initialize authentication state on app load
 * Validates existing token and sets user data in query cache
 */
export async function initializeAuth(): Promise<void> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  
  if (!token) {
    // No token, clear all query cache to ensure no stale data
    queryClient.clear()
    return
  }

  try {
    // Validate token with backend
    const validationResult = await validateToken()
    
    if (validationResult.isValid && validationResult.user) {
      // Token is valid, set user data in query cache
      const user: User = {
        id: validationResult.user.id,
        email: validationResult.user.email,
        username: validationResult.user.username,
        role: validationResult.user.role,
        first_name: validationResult.user.first_name,
        last_name: validationResult.user.last_name,
        status: validationResult.user.status,
      }
      queryClient.setQueryData(queryKeys.user.all, user)
      
      // Invalidate all user-specific queries to fetch fresh data
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.profiles.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.devices.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.watchlist.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.watchHistory.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.userVideos.all }),
      ])
    } else {
      // Token is invalid, clear everything
      localStorage.removeItem('token')
      queryClient.clear()
    }
  } catch (error) {
    // Validation failed, clear everything
    logger.error('Auth initialization failed', error instanceof Error ? error : new Error('Unknown error'))
    localStorage.removeItem('token')
    queryClient.clear()
  }
}

