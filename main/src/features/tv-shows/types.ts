export interface TVShow {
  id: string
  title: string
  slug: string
  description?: string
  thumbnail_url?: string
  poster_url?: string
  banner_url?: string
  trailer_url?: string
  release_date?: string
  release_year?: number
  rating?: number
  imdb_rating?: number
  age_rating?: string
  content_rating?: string
  language?: string
  access_type: 'free' | 'subscription' | 'pay_per_view'
  plan_ids?: string[]
  genres?: string[]
  cast?: string[]
  directors?: string[]
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
  status?: string
  createdAt?: string
  updatedAt?: string
}

export interface PaginatedTVShowsData {
  tv_shows: TVShow[]
  currentPage: number
  totalPages: number
  totalItems: number
}

/**
 * Backend TV show object structure (before transformation)
 * This represents the raw data structure returned from the backend API
 */
export interface BackendTVShow {
  _id?: string
  id?: string
  title: string
  slug: string
  description?: string
  thumbnail_url?: string
  poster_url?: string
  banner_url?: string
  trailer_url?: string
  release_year?: number
  imdb_rating?: number
  content_rating?: string
  language?: string
  access_type: 'free' | 'subscription' | 'pay_per_view'
  plan_ids?: string[]
  genres?: string[]
  cast?: string[]
  directors?: string[]
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
  status?: string
  createdAt?: string
  updatedAt?: string
}

