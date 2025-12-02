import type { SortOrder } from '@/types'

/**
 * Season summary for list views
 */
export interface SeasonSummary {
  id?: string
  _id?: string // Backend may return either
  tv_show_id: string
  season_number: number
  name?: string
  poster_url?: string
  release_date?: string
  status?: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

/**
 * Extended season detail with full fields
 */
export interface SeasonDetail extends SeasonSummary {
  description?: string
  seo_title?: string
  seo_description?: string
}

/**
 * Parameters for fetching season list
 */
export interface SeasonListParams {
  tv_show_id?: string
  page?: number
  limit?: number
  sort?: string
  order?: SortOrder
}

/**
 * Payload for creating a new season
 */
export interface CreateSeasonPayload {
  tv_show_id: string
  season_number: number
  name?: string
  description?: string
  poster_url?: string
  release_date?: string
  seo_title?: string
  seo_description?: string
  status?: 'draft' | 'published'
}

/**
 * Payload for updating an existing season
 */
export interface UpdateSeasonPayload {
  name?: string
  description?: string
  poster_url?: string
  release_date?: string
  seo_title?: string
  seo_description?: string
  status?: 'draft' | 'published'
}

