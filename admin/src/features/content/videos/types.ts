import type { SortOrder } from '@/types'

/**
 * Video metrics
 */
export interface VideoMetrics {
  views_count: number
  shares_count: number
  favorites_count: number
  reports_count: number
}

/**
 * Video summary for list views
 */
export interface VideoSummary {
  id?: string
  _id?: string // Backend may return either
  title: string
  description?: string
  video_url?: string
  thumbnail_url?: string
  duration?: number
  resolution?: string
  file_size?: number
  category?: string
  language?: string
  age_restriction?: boolean
  published?: boolean
  seo_title?: string
  seo_description?: string
  license_type?: string
  access_level?: string
  video_format?: string
  tags?: string[]
  gallery?: string[]
  metrics?: VideoMetrics
  likes_count?: number
  dislikes_count?: number
  average_rating?: number
  createdAt: string
  updatedAt: string
}

/**
 * Extended video detail with full fields
 */
export interface VideoDetail extends VideoSummary {
  metrics: VideoMetrics
  likes_count: number
  dislikes_count: number
  average_rating: number
}

/**
 * Parameters for fetching paginated video list
 */
export interface VideoListParams {
  page?: number
  limit?: number
  sort?: string
  order?: SortOrder
  genre?: string
  year?: number
}

/**
 * Response from paginated videos endpoint
 */
export interface VideoListResponse {
  currentPage: number
  totalPages: number
  totalItems: number
  videos: VideoSummary[]
}

/**
 * Payload for creating a new video
 */
export interface CreateVideoPayload {
  title: string
  description?: string
  video_url?: string
  thumbnail_url?: string
  duration?: number
  resolution?: string
  file_size?: number
  category?: string
  language?: string
  age_restriction?: boolean
  published?: boolean
  seo_title?: string
  seo_description?: string
  license_type?: string
  access_level?: string
  video_format?: string
  tags?: string[]
  gallery?: string[]
}

/**
 * Payload for updating an existing video
 */
export interface UpdateVideoPayload {
  title?: string
  description?: string
  video_url?: string
  thumbnail_url?: string
  duration?: number
  resolution?: string
  file_size?: number
  category?: string
  language?: string
  age_restriction?: boolean
  published?: boolean
  seo_title?: string
  seo_description?: string
  license_type?: string
  access_level?: string
  video_format?: string
  tags?: string[]
  gallery?: string[]
}

/**
 * Cloudinary upload result
 */
export interface UploadResult {
  secure_url: string
  public_id: string
  width?: number
  height?: number
  duration?: number
  format?: string
  bytes?: number
}

