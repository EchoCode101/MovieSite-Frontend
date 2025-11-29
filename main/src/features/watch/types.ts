export interface WatchlistItem {
  id: string
  user_id: string
  profile_id: string
  target_type: 'movie' | 'tvshow' | 'episode'
  target_id: string
  createdAt: string
  updatedAt: string
}

export interface WatchHistoryItem {
  id: string
  user_id: string
  profile_id: string
  target_type: 'movie' | 'episode'
  target_id: string
  watched_seconds: number
  total_seconds: number
  progress_percent: number
  last_watched_at: string
  createdAt: string
  updatedAt: string
}

export interface AddToWatchlistData {
  profile_id: string
  target_type: 'movie' | 'tvshow' | 'episode'
  target_id: string
}

export interface UpdateProgressData {
  profile_id: string
  target_type: 'movie' | 'episode'
  target_id: string
  watched_seconds: number
  total_seconds: number
}

export interface RemoveHistoryData {
  profile_id: string
  target_type: 'movie' | 'episode'
  target_id: string
}

export interface WatchlistResponse {
  items: WatchlistItem[]
  currentPage: number
  totalPages: number
  totalItems: number
}

export interface ContinueWatchingItem {
  id: string
  target_type: 'movie' | 'episode'
  target_id: string
  watched_seconds: number
  total_seconds: number
  progress_percent: number
  last_watched_at: string
  content: {
    title: string
    thumbnail_url?: string
  }
}

