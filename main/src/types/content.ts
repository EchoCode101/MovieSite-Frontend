/**
 * Shared content types
 * 
 * Common types used across Movies, TV Shows, Episodes, and Seasons
 */

export interface ContentBase {
  id: string
  title: string
  slug: string
  description?: string
  thumbnail_url?: string
  poster_url?: string
  trailer_url?: string
  rating?: number
  age_rating?: string
  access_type: 'free' | 'subscription' | 'pay_per_view'
  plan_ids?: string[]
  genres?: string[]
  cast?: string[]
  directors?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface Movie extends ContentBase {
  video_url?: string
  duration?: number
  release_date?: string
  is_trending?: boolean
  is_featured?: boolean
  is_coming_soon?: boolean
}

export interface TVShow extends ContentBase {
  release_date?: string
}

export interface Season {
  id: string
  tv_show_id: string
  season_number: number
  name: string
  description?: string
  poster_url?: string
  air_date?: string
  episode_count?: number
  createdAt?: string
  updatedAt?: string
}

export interface Episode extends ContentBase {
  tv_show_id: string
  season_id: string
  episode_number: number
  video_url?: string
  duration?: number
  air_date?: string
}

