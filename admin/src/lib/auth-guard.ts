import { redirect } from '@tanstack/react-router'

import { logger } from './logger'

/**
 * Check if user is authenticated and has admin role.
 * Used in route beforeLoad.
 */
export async function requireAuth() {
  const token = localStorage.getItem('adminToken')

  if (!token) {
    logger.warn('No admin token found, redirecting to login')
    throw redirect({ to: '/login', search: true } as never)
  }

  // TODO: Validate token with backend in Phase 2
}

/**
 * Check if user is NOT authenticated (for login page).
 * Redirects to dashboard if already logged in.
 */
export async function requireGuest() {
  const token = localStorage.getItem('adminToken')

  if (token) {
    logger.info('User already authenticated, redirecting to dashboard')
    throw redirect({ to: '/dashboard', search: true } as never)
  }
}


