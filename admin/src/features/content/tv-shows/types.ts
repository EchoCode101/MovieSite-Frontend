import type { SortOrder } from '@/types'

/**
 * TV show summary for list views
 */
export interface TvShowSummary {
  id?: string
  _id?: string // Backend may return either
  title: string
  slug?: string
  thumbnail_url?: string
  poster_url?: string
  banner_url?: string
  language?: string
  access_type?: 'free' | 'subscription' | 'pay_per_view'
  status?: 'draft' | 'published'
  release_year?: number
  createdAt: string
  updatedAt: string
}

/**
 * Extended TV show detail with full fields
 */
export interface TvShowDetail extends TvShowSummary {
  description?: string
  imdb_rating?: number
  content_rating?: string
  genres?: string[]
  cast?: string[]
  directors?: string[]
  plan_ids?: string[]
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
}

/**
 * Parameters for fetching paginated TV show list
 */
export interface TvShowListParams {
  page?: number
  limit?: number
  sort?: string
  order?: SortOrder
  genre?: string
  year?: number
  access_type?: 'free' | 'subscription' | 'pay_per_view'
  search?: string
}

/**
 * Response from paginated TV shows endpoint
 */
export interface TvShowListResponse {
  currentPage: number
  totalPages: number
  totalItems: number
  tvShows: TvShowSummary[]
}

/**
 * Payload for creating a new TV show
 */
export interface CreateTvShowPayload {
  title: string
  slug?: string
  description?: string
  thumbnail_url?: string
  poster_url?: string
  banner_url?: string
  language?: string
  imdb_rating?: number
  content_rating?: string
  release_year?: number
  genres?: string[]
  cast?: string[]
  directors?: string[]
  access_type?: 'free' | 'subscription' | 'pay_per_view'
  plan_ids?: string[]
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
  status?: 'draft' | 'published'
}

/**
 * Payload for updating an existing TV show
 */
export interface UpdateTvShowPayload {
  title?: string
  slug?: string
  description?: string
  thumbnail_url?: string
  poster_url?: string
  banner_url?: string
  language?: string
  imdb_rating?: number
  content_rating?: string
  release_year?: number
  genres?: string[]
  cast?: string[]
  directors?: string[]
  access_type?: 'free' | 'subscription' | 'pay_per_view'
  plan_ids?: string[]
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
  status?: 'draft' | 'published'
}

