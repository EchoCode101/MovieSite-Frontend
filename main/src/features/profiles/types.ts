export interface Profile {
  id: string
  name: string
  avatar_url?: string | null
  is_kid: boolean
  language: string
  autoplay_next?: boolean
  autoplay_trailers?: boolean
  pin?: string | null
  has_pin?: boolean // Indicates if profile has PIN protection (from backend)
  createdAt?: string
  updatedAt?: string
}

export interface CreateProfileData {
  name: string
  avatar_url?: string
  is_kid?: boolean
  language?: string
  pin?: string
}

export interface UpdateProfileData {
  name?: string
  avatar_url?: string
  is_kid?: boolean
  language?: string
  pin?: string
  autoplay_next?: boolean
  autoplay_trailers?: boolean
}

