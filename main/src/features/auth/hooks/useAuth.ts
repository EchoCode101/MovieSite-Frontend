import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { login, register, logout, getUser, validateToken } from '../api/auth'
import type { LoginCredentials, RegisterCredentials } from '../types'
import { toast } from 'sonner'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook for user login
 * 
 * @returns Mutation hook for login
 */
export const useLogin = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: async (data) => {
      localStorage.setItem('token', data.token)
      if (data.refreshToken) {
        // Refresh token is handled via HTTP-only cookie, but we can store access token
      }

      // Fetch complete user profile immediately and set it in cache
      // This ensures navbar and other components have user data right away
      let fullUserData
      try {
        const { getUser } = await import('../api/auth')
        fullUserData = await getUser()
      } catch (error) {
        // Import logger dynamically to avoid circular dependencies
        const { logger } = await import('@/lib/logger')
        logger.error('Failed to fetch user profile after login', error instanceof Error ? error : new Error('Unknown error'))
        // If fetch fails, use partial data from login response
        fullUserData = data.data
      }

      // Set user data in cache FIRST - this will trigger navbar to update immediately
      // The query will automatically re-render components that use useUser()
      queryClient.setQueryData(queryKeys.user.all, fullUserData)

      // Force the user query to be marked as successful and trigger re-renders
      // This ensures all components using useUser() will update immediately
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all, refetchType: 'none' })

      // Then remove all other user-specific queries from cache
      // This prevents showing old user's data for other features
      queryClient.removeQueries({ queryKey: queryKeys.profiles.all })
      queryClient.removeQueries({ queryKey: queryKeys.subscriptions.all })
      queryClient.removeQueries({ queryKey: queryKeys.transactions.all })
      queryClient.removeQueries({ queryKey: queryKeys.devices.all })
      queryClient.removeQueries({ queryKey: queryKeys.watchlist.all })
      queryClient.removeQueries({ queryKey: queryKeys.watchHistory.all })
      queryClient.removeQueries({ queryKey: queryKeys.notifications.all })
      queryClient.removeQueries({ queryKey: queryKeys.userVideos.all })

      // Invalidate and refetch all user-specific queries to get fresh data for the new user
      // This ensures we fetch complete data for all features
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.profiles.all, refetchType: 'active' }),
        queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions.all, refetchType: 'active' }),
        queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all, refetchType: 'active' }),
        queryClient.invalidateQueries({ queryKey: queryKeys.devices.all, refetchType: 'active' }),
        queryClient.invalidateQueries({ queryKey: queryKeys.watchlist.all, refetchType: 'active' }),
        queryClient.invalidateQueries({ queryKey: queryKeys.watchHistory.all, refetchType: 'active' }),
        queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all, refetchType: 'active' }),
        queryClient.invalidateQueries({ queryKey: queryKeys.userVideos.all, refetchType: 'active' }),
      ])

      toast.success('Login successful!')
      navigate({ to: '/' })
    },
    onError: (error) => {
      toast.error(error.message || 'Login failed. Please check your credentials.')
    },
  })
}

/**
 * Hook for user registration
 * 
 * @returns Mutation hook for registration
 */
export const useRegister = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => register(credentials),
    onSuccess: () => {
      toast.success('Registration successful! Please log in.')
      // Backend doesn't return token on register, so redirect to login
      navigate({ to: '/auth/login' })
    },
    onError: (error) => {
      toast.error(error.message || 'Registration failed. Please try again.')
    },
  })
}

/**
 * Hook to get current user
 * 
 * @returns Query hook for current user
 */
export const useUser = () => {
  const queryClient = useQueryClient()
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  return useQuery({
    queryKey: queryKeys.user.all,
    queryFn: async () => {
      try {
        return await getUser()
      } catch (error) {
        // If 401 or Unauthorized, clear token and query data
        const errorMessage = error instanceof Error ? error.message : String(error)
        if (errorMessage.includes('401') || errorMessage.includes('Unauthorized') || errorMessage.includes('Failed to fetch user profile')) {
          localStorage.removeItem('token')
          queryClient.setQueryData(queryKeys.user.all, null)
        }
        throw error
      }
    },
    enabled: !!token, // Only fetch if token exists
    retry: false,
    staleTime: 0, // Always consider data stale to allow immediate updates after login
    refetchOnMount: true, // Refetch when component mounts to get fresh data
    refetchOnWindowFocus: false, // Don't refetch on window focus
  })
}

/**
 * Hook for user logout
 * 
 * @returns Function to call logout
 */
export const useLogout = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate: logoutApi } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success('Logged out successfully')
    },
    onSettled: () => {
      localStorage.removeItem('token')
      // Clear PIN validations on logout
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('validatedProfiles')
        sessionStorage.clear() // Clear all session storage
      }

      // Clear ALL query cache to remove all user-specific data
      queryClient.clear()

      navigate({ to: '/auth/login' })
    },
    onError: () => {
      // Even if logout fails, clear local state
      localStorage.removeItem('token')
      // Clear PIN validations on logout
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('validatedProfiles')
        sessionStorage.clear() // Clear all session storage
      }

      // Clear ALL query cache to remove all user-specific data
      queryClient.clear()

      navigate({ to: '/auth/login' })
    },
  })

  return () => logoutApi()
}

/**
 * Hook to validate access token
 * 
 * @returns Query hook for token validation
 */
export const useValidateToken = () => {
  return useQuery({
    queryKey: queryKeys.token.validate(),
    queryFn: validateToken,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
