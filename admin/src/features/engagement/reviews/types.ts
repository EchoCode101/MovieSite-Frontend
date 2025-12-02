import type { SortOrder } from '@/types'

/**
 * Review target type
 */
export type ReviewTargetType = 'video' | 'movie' | 'tvshow' | 'episode'

/**
 * User/member information in review
 */
export interface ReviewUser {
  _id: string
  first_name?: string
  last_name?: string
  username?: string
  email?: string
  avatar_url?: string
  profile_pic?: string
}

/**
 * Target content information in review
 */
export interface ReviewTarget {
  _id: string
  title?: string
  name?: string
  description?: string
  thumbnail_url?: string
  poster_url?: string
}

/**
 * Review summary for list views
 */
export interface Review {
  id?: string
  _id?: string // Backend may return either
  review_content: string
  rating: number // 1-5
  target_type?: ReviewTargetType
  target_id?: string
  member?: ReviewUser
  member_id?: string
  video?: ReviewTarget
  target?: ReviewTarget
  likesCount?: number
  dislikesCount?: number
  createdAt: string
  updatedAt: string
}

/**
 * Extended review detail with full populated data
 */
export interface ReviewDetail extends Review {
  member: ReviewUser
  target: ReviewTarget
  likesCount: number
  dislikesCount: number
}

/**
 * Parameters for fetching paginated review list
 */
export interface ReviewListParams {
  page?: number
  limit?: number
  sort?: string
  order?: SortOrder
  target_type?: ReviewTargetType
  target_id?: string
  rating?: number
}

/**
 * Response from paginated reviews endpoint
 */
export interface ReviewListResponse {
  currentPage: number
  totalPages: number
  totalItems: number
  reviews: Review[]
}

