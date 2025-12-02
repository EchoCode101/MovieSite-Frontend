import { Card } from '@/components/ui/card'
import type { DashboardStats } from '../types'

interface StatsCardsProps {
  stats: DashboardStats
  isLoading?: boolean
}

interface StatItem {
  label: string
  value: number
  helper?: string
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  // Map backend response to frontend display format
  // Backend returns: uniqueViews, itemsAdded, moviesCount, tvShowsCount, episodesCount, 
  // channelsCount, newComments, newReviews, activeSubscriptions, totalTransactions, 
  // totalRevenue, activeUsers, totalUsers
  const items: StatItem[] = [
    {
      label: 'Total users',
      value: stats.totalUsers ?? 0,
      helper: 'All registered users',
    },
    {
      label: 'Active users',
      value: stats.activeUsers ?? 0,
      helper: 'Logged in recently',
    },
    {
      label: 'Unique views (this month)',
      value: 0,
      helper: 'Current month',
    },
    {
      label: 'Total content items',
      value:
        (stats.totalVideos ?? 0) +
        (stats.totalMovies ?? 0) +
        (stats.totalTvShows ?? 0) +
        (stats.totalEpisodes ?? 0),
      helper: 'Videos, movies, TV & episodes',
    },
    {
      label: 'Total revenue (this month)',
      value: stats.revenueThisMonth ?? 0,
      helper: 'Current month',
    },
    {
      label: 'Active subscriptions',
      value: stats.activeSubscriptions ?? 0,
      helper: 'Currently active',
    },
    {
      label: 'Total comments',
      value: stats.totalComments ?? 0,
      helper: 'Across the platform',
    },
    {
      label: 'Total reviews',
      value: stats.totalReviews ?? 0,
      helper: 'Across the platform',
    },
  ]

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((skeletonKey) => (
          <Card
            key={skeletonKey}
            className="border-slate-800 bg-slate-900/60 p-4"
          >
            <div className="h-4 w-24 animate-pulse rounded bg-slate-800" />
            <div className="mt-4 h-8 w-16 animate-pulse rounded bg-slate-700" />
            <div className="mt-2 h-3 w-32 animate-pulse rounded bg-slate-800" />
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card
          key={item.label}
          className="border-slate-800/50 bg-slate-900/60 p-5 shadow-lg transition-all hover:shadow-xl hover:border-slate-700/50"
        >
          <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {item.label}
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-50">
            {(item.value ?? 0).toLocaleString()}
          </div>
          {item.helper ? (
            <div className="mt-1.5 text-xs text-slate-500">{item.helper}</div>
          ) : null}
        </Card>
      ))}
    </div>
  )
}


