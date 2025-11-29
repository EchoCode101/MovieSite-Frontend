export interface CastCrew {
  id: string
  name: string
  type: 'actor' | 'director' | 'writer' | 'crew'
  bio?: string
  image_url?: string | null
  createdAt?: string
  updatedAt?: string
}

