/**
 * Genre entity
 */
export interface Genre {
  id?: string
  _id?: string // Backend may return either
  name: string
  slug: string
  createdAt: string
  updatedAt: string
}

/**
 * Parameters for fetching genre list (optional search)
 */
export interface GenreListParams {
  search?: string
}

/**
 * Payload for creating a new genre
 */
export interface CreateGenrePayload {
  name: string
  slug?: string
}

/**
 * Payload for updating an existing genre
 */
export interface UpdateGenrePayload {
  name?: string
  slug?: string
}

