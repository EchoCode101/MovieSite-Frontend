export interface Banner {
  id: string
  title: string
  device: 'web' | 'mobile' | 'tv'
  position: 'home' | 'movie' | 'tv' | 'video'
  target_type?: 'movie' | 'tvshow' | 'episode' | 'channel'
  target_id?: string
  image_url: string
  link_url?: string
  is_active: boolean
  order?: number
  createdAt?: string
  updatedAt?: string
}

