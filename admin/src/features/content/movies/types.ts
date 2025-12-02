import type { SortOrder } from '@/types'

/**
 * Movie stream configuration
 */
export interface MovieStream {
  label?: string
  type?: string
  url: string
}

/**
 * Movie summary for list views
 */
export interface MovieSummary {
  id?: string
  _id?: string // Backend may return either
  title: string
  slug?: string
  thumbnail_url?: string
  poster_url?: string
  banner_url?: string
  language?: string
  access_type?: 'free' | 'subscription' | 'pay_per_view'
  is_trending?: boolean
  is_featured?: boolean
  is_coming_soon?: boolean
  status?: 'draft' | 'published'
  release_date?: string
  createdAt: string
  updatedAt: string
}

/**
 * Extended movie detail with full fields
 */
export interface MovieDetail extends MovieSummary {
  description?: string
  short_description?: string
  trailer_url_type?: 'youtube' | 'vimeo' | 'mp4' | 'hls'
  trailer_url?: string
  streams?: MovieStream[]
  plan_ids?: string[]
  pay_per_view_price?: number
  purchase_type?: 'rent' | 'buy'
  access_duration_hours?: number
  imdb_rating?: number
  content_rating?: string
  duration_minutes?: number
  genres?: string[]
  cast?: string[]
  directors?: string[]
  tags?: string[]
  is_premium?: boolean
  is_downloadable?: boolean
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
}

/**
 * Parameters for fetching paginated movie list
 */
export interface MovieListParams {
  page?: number
  limit?: number
  sort?: string
  order?: SortOrder
  genre?: string
  year?: number
  access_type?: 'free' | 'subscription' | 'pay_per_view'
  is_trending?: boolean
  is_featured?: boolean
  is_coming_soon?: boolean
  search?: string
}

/**
 * Response from paginated movies endpoint
 */
export interface MovieListResponse {
  currentPage: number
  totalPages: number
  totalItems: number
  movies: MovieSummary[]
}

/**
 * Payload for creating a new movie
 */
export interface CreateMoviePayload {
  title: string
  slug?: string
  description?: string
  short_description?: string
  thumbnail_url?: string
  poster_url?: string
  banner_url?: string
  trailer_url_type?: 'youtube' | 'vimeo' | 'mp4' | 'hls'
  trailer_url?: string
  streams?: MovieStream[]
  access_type?: 'free' | 'subscription' | 'pay_per_view'
  plan_ids?: string[]
  pay_per_view_price?: number
  purchase_type?: 'rent' | 'buy'
  access_duration_hours?: number
  language?: string
  imdb_rating?: number
  content_rating?: string
  release_date?: string
  duration_minutes?: number
  genres?: string[]
  cast?: string[]
  directors?: string[]
  tags?: string[]
  is_premium?: boolean
  is_featured?: boolean
  is_trending?: boolean
  is_coming_soon?: boolean
  is_downloadable?: boolean
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
  status?: 'draft' | 'published'
}

/**
 * Payload for updating an existing movie
 */
export interface UpdateMoviePayload {
  title?: string
  slug?: string
  description?: string
  short_description?: string
  thumbnail_url?: string
  poster_url?: string
  banner_url?: string
  trailer_url_type?: 'youtube' | 'vimeo' | 'mp4' | 'hls'
  trailer_url?: string
  streams?: MovieStream[]
  access_type?: 'free' | 'subscription' | 'pay_per_view'
  plan_ids?: string[]
  pay_per_view_price?: number
  purchase_type?: 'rent' | 'buy'
  access_duration_hours?: number
  language?: string
  imdb_rating?: number
  content_rating?: string
  release_date?: string
  duration_minutes?: number
  genres?: string[]
  cast?: string[]
  directors?: string[]
  tags?: string[]
  is_premium?: boolean
  is_featured?: boolean
  is_trending?: boolean
  is_coming_soon?: boolean
  is_downloadable?: boolean
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
  status?: 'draft' | 'published'
}

