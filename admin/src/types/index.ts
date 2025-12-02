// API Response Types
export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
}

export interface AuthApiResponse<T> extends ApiResponse<T> {
  token: string
  refreshToken?: string
}

export interface PaginatedResponse<T> {
  currentPage: number
  totalPages: number
  totalItems: number
  data: T[]
}

// Common Types
export type SortOrder = 'ASC' | 'DESC'

export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: SortOrder
}

export interface FilterParams {
  search?: string
  [key: string]: string | number | boolean | undefined
}

// User Types
export interface User {
  _id: string
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

// Admin Types
export interface AdminUser extends User {
  role: 'admin'
}


