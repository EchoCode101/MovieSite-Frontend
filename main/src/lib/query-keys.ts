/**
 * Query Key Factory
 * 
 * Centralized query key management for TanStack Query.
 * Provides type safety, prevents typos, and makes refactoring easier.
 * 
 * Usage:
 *   import { queryKeys } from '@/lib/query-keys'
 *   queryClient.invalidateQueries({ queryKey: queryKeys.user.all })
 */

export const queryKeys = {
  // Auth & User
  user: {
    all: ['user'] as const,
    detail: () => ['user'] as const,
  },

  token: {
    all: ['token'] as const,
    validate: () => ['token', 'validate'] as const,
  },

  // User Videos
  userVideos: {
    all: ['userVideos'] as const,
    lists: () => ['userVideos'] as const,
    list: (params?: { page?: number; limit?: number }) => ['userVideos', params] as const,
  },

  videoUrl: {
    all: ['videoUrl'] as const,
    detail: (videoId: string) => ['videoUrl', videoId] as const,
  },

  // Profiles
  profiles: {
    all: ['profiles'] as const,
    lists: () => ['profiles'] as const,
    list: () => ['profiles'] as const,
    detail: (profileId: string) => ['profiles', profileId] as const,
  },

  // Subscriptions
  subscriptions: {
    all: ['subscriptions'] as const,
    lists: () => ['subscriptions'] as const,
    list: () => ['subscriptions'] as const,
    active: () => ['subscriptions', 'active'] as const,
    plans: {
      all: ['subscriptions', 'plans'] as const,
      lists: (params?: { page?: number; limit?: number }) => ['subscriptions', 'plans', params] as const,
      detail: (id: string) => ['subscriptions', 'plans', id] as const,
    },
  },

  // Devices
  devices: {
    all: ['devices'] as const,
    lists: () => ['devices'] as const,
    list: () => ['devices'] as const,
    limit: () => ['devices', 'limit'] as const,
  },

  // Transactions
  transactions: {
    all: ['transactions'] as const,
    lists: (params?: { type?: 'subscription' | 'pay_per_view'; status?: 'pending' | 'paid' | 'failed' | 'refunded'; limit?: number; page?: number }) => ['transactions', params] as const,
    detail: (id: string) => ['transactions', id] as const,
  },

  // Watch
  watchlist: {
    all: ['watchlist'] as const,
    lists: () => ['watchlist'] as const,
    list: (params?: { profile_id?: string; target_type?: 'movie' | 'tvshow' | 'episode'; page?: number; limit?: number }) => ['watchlist', params] as const,
  },

  watchHistory: {
    all: ['watchHistory'] as const,
    lists: () => ['watchHistory'] as const,
  },

  watch: {
    all: ['watch'] as const,
    continueWatching: (profile_id: string, limit = 20) => ['watch', 'continue-watching', profile_id, limit] as const,
    history: () => ['watch', 'history'] as const,
  },

  // Notifications
  notifications: {
    all: ['notifications'] as const,
    lists: () => ['notifications'] as const,
    list: (page?: number, limit?: number) => ['notifications', page, limit] as const,
    unreadCount: () => ['notifications', 'unreadCount'] as const,
  },

  // Pay Per View
  payPerView: {
    all: ['pay-per-view'] as const,
    purchases: () => ['pay-per-view', 'purchases'] as const,
    access: (targetType: string, targetId: string) => ['pay-per-view', 'access', targetType, targetId] as const,
  },

  // Movies
  movies: {
    all: ['movies'] as const,
    lists: () => ['movies'] as const,
    list: (params?: { page?: number; limit?: number; genre?: string; search?: string; is_trending?: boolean; is_featured?: boolean; is_coming_soon?: boolean }) => ['movies', params] as const,
    detail: (id: string) => ['movies', id] as const,
    trending: () => ['movies', 'trending'] as const,
    featured: () => ['movies', 'featured'] as const,
    comingSoon: () => ['movies', 'coming-soon'] as const,
  },

  // TV Shows
  tvShows: {
    all: ['tv-shows'] as const,
    lists: () => ['tv-shows'] as const,
    list: (params?: { page?: number; limit?: number; genre?: string; search?: string }) => ['tv-shows', params] as const,
    detail: (id: string) => ['tv-shows', id] as const,
    seasons: (id: string) => ['tv-shows', id, 'seasons'] as const,
  },

  // Seasons
  seasons: {
    all: ['seasons'] as const,
    byTvShow: (tvShowId: string) => ['seasons', 'tv-show', tvShowId] as const,
    detail: (id: string) => ['seasons', id] as const,
  },

  // Episodes
  episodes: {
    all: ['episodes'] as const,
    lists: () => ['episodes'] as const,
    list: (params?: { page?: number; limit?: number; sort?: string; order?: 'ASC' | 'DESC'; genre?: string; year?: number; access_type?: 'free' | 'subscription' | 'pay_per_view'; search?: string; tv_show_id?: string; season_id?: string }) => ['episodes', params] as const,
    bySeason: (seasonId: string) => ['episodes', 'season', seasonId] as const,
    detail: (id: string) => ['episodes', id] as const,
  },

  // Comments
  comments: {
    all: ['comments'] as const,
    lists: () => ['comments'] as const,
    byVideo: (videoId: string) => ['comments', videoId] as const,
    byTarget: (targetType: string, targetId: string) => ['comments', 'target', targetType, targetId] as const,
  },

  // Replies
  replies: {
    all: ['replies'] as const,
    lists: () => ['replies'] as const,
    byComment: (commentId: string) => ['replies', commentId] as const,
  },

  // Reviews
  reviews: {
    all: ['reviews'] as const,
    lists: () => ['reviews'] as const,
    byVideo: (videoId: string) => ['reviews', videoId] as const,
    byTarget: (targetType: string, targetId: string) => ['reviews', 'target', targetType, targetId] as const,
  },

  // Likes & Dislikes
  likeDislikeCounts: {
    all: ['likeDislikeCounts'] as const,
    detail: (targetType: string, targetId: string) => ['likeDislikeCounts', targetType, targetId] as const,
  },

  userReaction: {
    all: ['userReaction'] as const,
    detail: (targetType: string, targetId: string) => ['userReaction', targetType, targetId] as const,
  },

  // Videos (generic)
  videos: {
    all: ['videos'] as const,
    lists: () => ['videos'] as const,
    list: (params?: { page?: number; limit?: number; sort?: string; order?: string }) => ['videos', params] as const,
    categories: () => ['categories'] as const,
    related: (id: string) => ['relatedVideos', id] as const,
  },

  // Video by type and ID (used in watchlist-item-card)
  video: {
    detail: (targetType: string, targetId: string) => [targetType, targetId] as const,
  },

  // Cast & Crew
  castCrew: {
    all: ['cast-crew'] as const,
    lists: (params?: { page?: number; limit?: number; type?: string; search?: string }) => ['cast-crew', params] as const,
    detail: (id: string) => ['cast-crew', id] as const,
    cast: (displayIds: string[]) => ['cast-crew', 'cast', displayIds] as const,
    crew: (displayIds: string[], type?: string) => ['cast-crew', 'crew', displayIds, type] as const,
  },

  // Genres
  genres: {
    all: ['genres'] as const,
    lists: () => ['genres'] as const,
    list: () => ['genres'] as const,
    detail: (id: string) => ['genres', id] as const,
  },

  // Channels
  channels: {
    all: ['channels'] as const,
    lists: (params?: { page?: number; limit?: number; search?: string }) => ['channels', params] as const,
    detail: (id: string) => ['channels', id] as const,
  },

  // Banners
  banners: {
    all: ['banners'] as const,
    lists: (params?: { page?: number; limit?: number; position?: string; is_active?: boolean }) => ['banners', params] as const,
  },

  // Pages
  pages: {
    all: ['pages'] as const,
    lists: () => ['pages'] as const,
    list: () => ['pages'] as const,
    detail: (slug: string) => ['pages', slug] as const,
  },

  // Taxes
  taxes: {
    all: ['taxes'] as const,
    byCountry: (country: string) => ['taxes', 'country', country] as const,
  },

  // Payment Methods
  paymentMethods: {
    all: ['payment-methods'] as const,
    lists: () => ['payment-methods'] as const,
  },

  // Video Metrics
  videoMetrics: {
    all: ['video-metrics'] as const,
    lists: () => ['video-metrics'] as const,
  },

  // Home
  home: {
    all: ['home'] as const,
    featuredVideos: (limit?: number) => ['featured-videos', limit] as const,
    popularVideos: (limit?: number) => ['popular-videos', limit] as const,
    categoryVideos: (category: string, limit?: number) => ['category-videos', category, limit] as const,
    accessLevelVideos: (accessLevel: string, limit?: number) => ['access-level-videos', accessLevel, limit] as const,
  },
} as const

/**
 * Helper type for query key arrays
 */
export type QueryKey = readonly unknown[]

