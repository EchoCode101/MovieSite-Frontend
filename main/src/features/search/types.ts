import { Video } from '@/features/videos/types'
import { User } from '@/features/auth/types'

export interface SearchParams {
  q: string
  type?: 'all' | 'video' | 'user'
  page?: number
  limit?: number
}

export interface SearchResults {
  query: string
  type: string
  results: {
    videos: Video[]
    users: User[]
  }
}

export interface SearchResponse {
  success: boolean
  message: string
  data: SearchResults
}
