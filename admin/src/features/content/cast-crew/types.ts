/**
 * Cast/Crew type
 */
export type CastCrewType = 'actor' | 'director' | 'writer' | 'crew'

/**
 * Cast/Crew entity
 */
export interface CastCrew {
  id?: string
  _id?: string // Backend may return either
  name: string
  type: CastCrewType
  bio?: string
  image_url?: string
  createdAt: string
  updatedAt: string
}

/**
 * Parameters for fetching cast/crew list
 */
export interface CastCrewListParams {
  type?: CastCrewType
  search?: string
}

/**
 * Payload for creating a new cast/crew member
 */
export interface CreateCastCrewPayload {
  name: string
  type: CastCrewType
  bio?: string
  image_url?: string
}

/**
 * Payload for updating an existing cast/crew member
 */
export interface UpdateCastCrewPayload {
  name?: string
  type?: CastCrewType
  bio?: string
  image_url?: string
}

