/**
 * Centralized query key factory for TanStack Query
 *
 * Benefits:
 * - Type safety
 * - Prevents typos
 * - Easy refactoring
 * - Parameterized keys
 */

export const queryKeys = {
  // Auth
  auth: {
    me: () => ['auth', 'me'] as const,
  },

  // Dashboard
  dashboard: {
    stats: () => ['dashboard', 'stats'] as const,
    revenue: (period?: string) => ['dashboard', 'revenue', period] as const,
    userGrowth: (period?: string) => ['dashboard', 'user-growth', period] as const,
    contentStats: () => ['dashboard', 'content-stats'] as const,
    recentActivity: (limit?: number) => ['dashboard', 'recent-activity', limit] as const,
    topContent: (type?: string, limit?: number) => ['dashboard', 'top-content', type, limit] as const,
  },

  // Users
  users: {
    all: ['users'] as const,
    list: (params?: unknown) => ['users', params] as const,
    detail: (id: string) => ['users', id] as const,
  },

  // Videos
  videos: {
    all: ['videos'] as const,
    list: (params?: unknown) => ['videos', params] as const,
    detail: (id: string) => ['videos', id] as const,
  },

  // Movies
  movies: {
    all: ['movies'] as const,
    list: (params?: unknown) => ['movies', params] as const,
    detail: (id: string) => ['movies', id] as const,
    trending: () => ['movies', 'trending'] as const,
    featured: () => ['movies', 'featured'] as const,
    comingSoon: () => ['movies', 'coming-soon'] as const,
  },

  // TV Shows
  tvShows: {
    all: ['tv-shows'] as const,
    list: (params?: unknown) => ['tv-shows', params] as const,
    detail: (id: string) => ['tv-shows', id] as const,
    seasons: (id: string) => ['tv-shows', id, 'seasons'] as const,
  },

  // Seasons
  seasons: {
    all: ['seasons'] as const,
    list: (params?: unknown) => ['seasons', params] as const,
    detail: (id: string) => ['seasons', id] as const,
  },

  // Episodes
  episodes: {
    all: ['episodes'] as const,
    list: (params?: unknown) => ['episodes', params] as const,
    bySeason: (seasonId: string) => ['episodes', 'season', seasonId] as const,
    detail: (id: string) => ['episodes', id] as const,
  },

  // Genres
  genres: {
    all: ['genres'] as const,
    detail: (id: string) => ['genres', id] as const,
  },

  // Cast & Crew
  castCrew: {
    all: ['cast-crew'] as const,
    list: (params?: unknown) => ['cast-crew', params] as const,
    detail: (id: string) => ['cast-crew', id] as const,
  },

  // Channels
  channels: {
    all: ['channels'] as const,
    detail: (id: string) => ['channels', id] as const,
  },

  // Comments
  comments: {
    all: ['comments'] as const,
    list: (params?: unknown) => ['comments', params] as const,
    detail: (id: string) => ['comments', id] as const,
  },

  // Reviews
  reviews: {
    all: ['reviews'] as const,
    list: (params?: unknown) => ['reviews', params] as const,
    detail: (id: string) => ['reviews', id] as const,
  },

  // Reports
  reports: {
    all: ['reports'] as const,
    list: (params?: unknown) => ['reports', params] as const,
    detail: (id: string) => ['reports', id] as const,
  },

  // Subscription Plans
  plans: {
    all: ['plans'] as const,
    list: (params?: unknown) => ['plans', params] as const,
    detail: (id: string) => ['plans', id] as const,
  },

  // Coupons
  coupons: {
    all: ['coupons'] as const,
    detail: (id: string) => ['coupons', id] as const,
  },

  // Transactions
  transactions: {
    all: ['transactions'] as const,
    list: (params?: unknown) => ['transactions', params] as const,
    detail: (id: string) => ['transactions', id] as const,
  },

  // Taxes
  taxes: {
    all: ['taxes'] as const,
    detail: (id: string) => ['taxes', id] as const,
  },

  // Payment Methods
  paymentMethods: {
    all: ['payment-methods'] as const,
    detail: (id: string) => ['payment-methods', id] as const,
  },

  // Banners
  banners: {
    all: ['banners'] as const,
    detail: (id: string) => ['banners', id] as const,
  },

  // Settings
  settings: {
    all: ['settings'] as const,
    byGroup: (group: string) => ['settings', 'group', group] as const,
    byKey: (key: string) => ['settings', 'key', key] as const,
  },

  // Pages
  pages: {
    all: ['pages'] as const,
    detail: (id: string) => ['pages', id] as const,
  },

  // Profiles
  profiles: {
    all: ['profiles'] as const,
    list: (params?: unknown) => ['profiles', params] as const,
    detail: (id: string) => ['profiles', id] as const,
  },
} as const


