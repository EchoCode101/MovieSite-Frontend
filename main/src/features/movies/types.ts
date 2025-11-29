export interface Movie {
  id: string
  title: string
  slug: string
  description?: string
  thumbnail_url?: string
  poster_url?: string
  video_url?: string
  trailer_url?: string
  duration?: number
  release_date?: string
  rating?: number
  age_rating?: string
  access_type: 'free' | 'subscription' | 'pay_per_view'
  plan_ids?: string[]
  genres?: string[]
  cast?: string[]
  directors?: string[]
  is_trending?: boolean
  is_featured?: boolean
  is_coming_soon?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface PaginatedMoviesData {
  movies: Movie[]
  currentPage: number
  totalPages: number
  totalItems: number
}

/**
 * Backend movie object structure (before transformation)
 * This represents the raw data structure returned from the backend API
 */
export interface BackendMovie {
  _id?: string
  id?: string
  title: string
  slug: string
  description?: string
  thumbnail_url?: string
  poster_url?: string
  streams?: Array<{ url: string }>
  trailer_url?: string
  duration_minutes?: number
  release_date?: string
  imdb_rating?: number
  content_rating?: string
  access_type: 'free' | 'subscription' | 'pay_per_view'
  plan_ids?: string[]
  genres?: string[]
  cast?: string[]
  directors?: string[]
  is_trending?: boolean
  is_featured?: boolean
  is_coming_soon?: boolean
  createdAt?: string
  updatedAt?: string
}

