export interface Channel {
  id: string
  name: string
  slug: string
  description?: string
  logo_url?: string
  stream_url: string
  stream_type: 'hls' | 'dash' | 'rtmp'
  category?: string
  country?: string
  language?: string
  is_active: boolean
  createdAt?: string
  updatedAt?: string
}

