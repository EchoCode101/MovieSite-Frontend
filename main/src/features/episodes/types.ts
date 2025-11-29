export interface Episode {
  id: string
  tv_show_id: string
  season_id: string
  episode_number: number
  title: string
  description?: string
  thumbnail_url?: string
  streams?: Array<{ label?: string; type?: string; url: string }>
  enable_subtitle?: boolean
  subtitles?: Array<{ language: string; is_default: boolean; url: string }>
  duration_minutes?: number
  release_date?: string
  access_type: 'free' | 'subscription' | 'pay_per_view'
  plan_ids?: string[]
  pay_per_view_price?: number
  seo_title?: string
  seo_description?: string
  status?: string
  createdAt?: string
  updatedAt?: string
}

