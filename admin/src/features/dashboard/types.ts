export type DashboardPeriod = 'day' | 'week' | 'month' | 'year'

export interface DashboardStats {
  // Users
  totalUsers: number
  activeUsers: number
  newUsersToday: number
  newUsersThisWeek: number
  newUsersThisMonth: number

  // Content
  totalVideos: number
  totalMovies: number
  totalTvShows: number
  totalEpisodes: number

  // Revenue & subscriptions
  revenueToday: number
  revenueThisWeek: number
  revenueThisMonth: number
  revenueThisYear: number
  activeSubscriptions: number
  cancelledSubscriptions: number
  expiredSubscriptions: number

  // Engagement
  totalComments: number
  totalReviews: number
  totalLikes: number

  // Infrastructure metrics
  storageUsedGb: number
  bandwidthUsedTb: number
}

export interface RevenuePoint {
  label: string
  amount: number
  currency: string
}

export interface UserGrowthPoint {
  label: string
  newUsers: number
  activeUsers: number
}

export interface ContentStatsItem {
  type: 'videos' | 'movies' | 'tvShows' | 'episodes'
  label: string
  count: number
}

export interface ContentStats {
  items: ContentStatsItem[]
}

export type RecentActivityType =
  | 'user-created'
  | 'subscription-started'
  | 'subscription-cancelled'
  | 'content-played'
  | 'comment-created'
  | 'review-created'

export interface RecentActivityItem {
  id: string
  type: RecentActivityType
  description: string
  createdAt: string
  user?: {
    id: string
    name?: string
    email?: string
  }
  target?: {
    id: string
    type: 'video' | 'movie' | 'tv-show' | 'episode'
    title: string
  }
}

export type TopContentType = 'video' | 'movie' | 'tv-show' | 'episode' | 'all'

export interface TopContentItem {
  id: string
  type: TopContentType
  title: string
  views: number
  likes: number
  thumbnailUrl?: string
}


