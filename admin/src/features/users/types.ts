import type { SortOrder } from '@/types'

/**
 * User summary for list views (subset of full user data)
 */
export interface AdminUserSummary {
  id: string
  _id?: string // Backend may return either
  username: string
  email: string
  first_name?: string
  last_name?: string
  profile_pic?: string
  subscription_plan: string
  role: 'user' | 'admin'
  status: 'Active' | 'Inactive'
  createdAt: string
  updatedAt: string
}

/**
 * Extended user detail with additional admin information
 */
export interface AdminUserDetail extends AdminUserSummary {
  comments?: unknown[]
  reviews?: unknown[]
  replies?: unknown[]
}

/**
 * Parameters for fetching paginated user list
 */
export interface UserListParams {
  page?: number
  limit?: number
  search?: string
  role?: 'user' | 'admin'
  status?: 'Active' | 'Inactive'
  subscription_plan?: string
  sort?: string
  order?: SortOrder
}

/**
 * Response from paginated users endpoint
 */
export interface UserListResponse {
  currentPage: number
  totalPages: number
  totalItems: number
  users: AdminUserSummary[]
}

/**
 * Payload for creating a new user (admin)
 */
export interface CreateUserPayload {
  username: string
  email: string
  password: string
  subscription_plan?: string
  role?: 'user' | 'admin'
  profile_pic?: string
  first_name?: string
  last_name?: string
  status?: 'Active' | 'Inactive'
}

/**
 * Payload for updating an existing user
 */
export interface UpdateUserPayload {
  username?: string
  email?: string
  first_name?: string
  last_name?: string
  profile_pic?: string
  subscription_plan?: string
  status?: 'Active' | 'Inactive'
}

/**
 * Payload for updating user subscription plan
 */
export interface UpdateUserSubscriptionPayload {
  userId: string
  newPlan: 'Free' | 'Basic' | 'Premium' | 'Ultimate'
}

