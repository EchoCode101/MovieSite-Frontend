import { redirect } from '@tanstack/react-router'
import { queryClient } from './query'

/**
 * Check if user is authenticated
 * @returns User object if authenticated, null otherwise
 */
export function getAuthenticatedUser() {
    if (typeof window === 'undefined') return null

    const token = localStorage.getItem('token')
    if (!token) return null

    // Check if user data exists in cache
    const user = queryClient.getQueryData(['user'])
    return user || null
}

/**
 * Route guard for protected routes (requires authentication)
 * Redirects to login if not authenticated
 */
export async function requireAuth() {
    const user = getAuthenticatedUser()

    if (!user) {
        // Try to fetch user if token exists
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        if (token) {
            try {
                const { getUser } = await import('@/features/auth/api/auth')
                const userData = await getUser()
                if (userData) {
                    queryClient.setQueryData(['user'], userData)
                    return userData
                }
            } catch (error) {
                // Fetch failed, clear token
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('token')
                }
            }
        }

        // Not authenticated, redirect to login
        throw redirect({
            to: '/auth/login',
            search: {
                redirect: typeof window !== 'undefined' ? window.location.pathname : '/',
            },
        })
    }

    return user
}

/**
 * Route guard for auth routes (requires NOT being authenticated)
 * Redirects to home if already authenticated
 */
export async function requireGuest() {
    const user = getAuthenticatedUser()

    if (user) {
        // Already authenticated, redirect to home
        throw redirect({
            to: '/',
        })
    }

    // Try to fetch user if token exists
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token) {
        try {
            const { getUser } = await import('@/features/auth/api/auth')
            const userData = await getUser()
            if (userData) {
                queryClient.setQueryData(['user'], userData)
                // User is authenticated, redirect to home
                throw redirect({
                    to: '/',
                })
            }
        } catch (error) {
            // If it's a redirect, re-throw it
            if (error && typeof error === 'object' && 'to' in error) {
                throw error
            }
            // Fetch failed, clear token and allow access
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token')
            }
        }
    }
}

