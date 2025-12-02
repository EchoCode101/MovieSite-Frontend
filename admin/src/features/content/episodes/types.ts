import type { SortOrder } from '@/types'

/**
 * Episode subtitle structure
 */
export interface EpisodeSubtitle {
  language: string
  is_default: boolean
  url: string
}

/**
 * Episode stream structure (reuse from movies)
 */
export interface EpisodeStream {
  label?: string
  type?: string
  url: string
}

/**
 * Episode summary for list views
 */
export interface EpisodeSummary {
  id?: string
  _id?: string // Backend may return either
  tv_show_id: string
  season_id: string
  episode_number: number
  title: string
  thumbnail_url?: string
  access_type?: 'free' | 'subscription' | 'pay_per_view'
  status?: 'draft' | 'published'
  duration_minutes?: number
  release_date?: string
  createdAt: string
  updatedAt: string
}

/**
 * Extended episode detail with full fields
 */
export interface EpisodeDetail extends EpisodeSummary {
  description?: string
  streams?: EpisodeStream[]
  enable_subtitle?: boolean
  subtitles?: EpisodeSubtitle[]
  plan_ids?: string[]
  pay_per_view_price?: number
  seo_title?: string
  seo_description?: string
}

/**
 * Parameters for fetching paginated episode list
 */
export interface EpisodeListParams {
  page?: number
  limit?: number
  sort?: string
  order?: SortOrder
  tv_show_id?: string
  season_id?: string
  access_type?: 'free' | 'subscription' | 'pay_per_view'
  search?: string
}

/**
 * Response from paginated episodes endpoint
 */
export interface EpisodeListResponse {
  currentPage: number
  totalPages: number
  totalItems: number
  episodes: EpisodeSummary[]
}

/**
 * Payload for creating a new episode
 */
export interface CreateEpisodePayload {
  tv_show_id: string
  season_id: string
  episode_number: number
  title: string
  description?: string
  thumbnail_url?: string
  streams?: EpisodeStream[]
  enable_subtitle?: boolean
  subtitles?: EpisodeSubtitle[]
  duration_minutes?: number
  release_date?: string
  access_type?: 'free' | 'subscription' | 'pay_per_view'
  plan_ids?: string[]
  pay_per_view_price?: number
  seo_title?: string
  seo_description?: string
  status?: 'draft' | 'published'
}

/**
 * Payload for updating an existing episode
 */
export interface UpdateEpisodePayload {
  title?: string
  description?: string
  thumbnail_url?: string
  streams?: EpisodeStream[]
  enable_subtitle?: boolean
  subtitles?: EpisodeSubtitle[]
  duration_minutes?: number
  release_date?: string
  access_type?: 'free' | 'subscription' | 'pay_per_view'
  plan_ids?: string[]
  pay_per_view_price?: number
  seo_title?: string
  seo_description?: string
  status?: 'draft' | 'published'
}

