import type { SortOrder } from '@/types'

/**
 * Comment target type
 */
export type CommentTargetType = 'video' | 'movie' | 'tvshow' | 'episode'

/**
 * User/member information in comment
 */
export interface CommentUser {
  _id: string
  first_name?: string
  last_name?: string
  username?: string
  email?: string
  avatar_url?: string
  profile_pic?: string
}

/**
 * Target content information in comment
 */
export interface CommentTarget {
  _id: string
  title?: string
  name?: string
  description?: string
  thumbnail_url?: string
  poster_url?: string
}

/**
 * Comment summary for list views
 */
export interface Comment {
  id?: string
  _id?: string // Backend may return either
  content: string
  target_type?: CommentTargetType
  target_id?: string
  member?: CommentUser
  member_id?: string
  video?: CommentTarget
  target?: CommentTarget
  likesCount?: number
  dislikesCount?: number
  createdAt: string
  updatedAt: string
}

/**
 * Extended comment detail with full populated data
 */
export interface CommentDetail extends Comment {
  member: CommentUser
  target: CommentTarget
  likesCount: number
  dislikesCount: number
}

/**
 * Parameters for fetching paginated comment list
 */
export interface CommentListParams {
  page?: number
  limit?: number
  sort?: string
  order?: SortOrder
  target_type?: CommentTargetType
  target_id?: string
}

/**
 * Response from paginated comments endpoint
 */
export interface CommentListResponse {
  currentPage: number
  totalPages: number
  totalItems: number
  comments: Comment[]
}

