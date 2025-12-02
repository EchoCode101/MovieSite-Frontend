import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { ContentStatsChart } from '@/features/dashboard/components/content-stats-chart'
import { RecentActivity } from '@/features/dashboard/components/recent-activity'
import { RevenueChart } from '@/features/dashboard/components/revenue-chart'
import { StatsCards } from '@/features/dashboard/components/stats-cards'
import { TopContent } from '@/features/dashboard/components/top-content'
import { UserGrowthChart } from '@/features/dashboard/components/user-growth-chart'
import {
  useContentStats,
  useDashboardStats,
  useRecentActivity,
  useRevenueData,
  useTopContent,
  useUserGrowth,
} from '@/features/dashboard/hooks/use-dashboard-data'
import type { DashboardPeriod, TopContentType } from '@/features/dashboard/types'

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: DashboardPage,
})

function DashboardPage() {
  const [period, setPeriod] = useState<DashboardPeriod>('month')
  const [topType, setTopType] = useState<TopContentType>('all')

  const {
    data: stats,
    isLoading: isStatsLoading,
  } = useDashboardStats()
  const {
    data: revenueData = [],
    isLoading: isRevenueLoading,
    isError: isRevenueError,
  } = useRevenueData(period)
  const {
    data: userGrowthData = [],
    isLoading: isUserGrowthLoading,
    isError: isUserGrowthError,
  } = useUserGrowth(period)
  const {
    data: contentStats,
    isLoading: isContentStatsLoading,
    isError: isContentStatsError,
  } = useContentStats()
  const {
    data: recentActivityItems = [],
    isLoading: isRecentActivityLoading,
    isError: isRecentActivityError,
  } = useRecentActivity(10)
  const {
    data: topContentItems = [],
    isLoading: isTopContentLoading,
    isError: isTopContentError,
  } = useTopContent(topType, 5)

  const periodOptions: DashboardPeriod[] = ['day', 'week', 'month', 'year']

  const topTypeOptions: TopContentType[] = [
    'all',
    'movie',
    'tv-show',
    'video',
    'episode',
  ]

  return (
    <div className="space-y-6">
      <header className="mb-2">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">
          Dashboard
        </h1>
        <p className="text-sm text-slate-400">
          Key metrics and analytics for the Vidstie platform.
        </p>
      </header>

      {stats ? (
        <StatsCards stats={stats} isLoading={isStatsLoading} />
      ) : null}

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-200">
              Revenue overview
            </h2>
            <div className="flex gap-2">
              {periodOptions.map((option) => (
                <Button
                  key={option}
                  type="button"
                  size="sm"
                  variant={option === period ? 'default' : 'outline'}
                  onClick={() => setPeriod(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
          <RevenueChart
            data={revenueData}
            period={period}
            isLoading={isRevenueLoading}
            isError={isRevenueError}
          />
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-200">
              User growth
            </h2>
            <div className="flex gap-2">
              {periodOptions.map((option) => (
                <Button
                  key={option}
                  type="button"
                  size="sm"
                  variant={option === period ? 'default' : 'outline'}
                  onClick={() => setPeriod(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
          <UserGrowthChart
            data={userGrowthData}
            period={period}
            isLoading={isUserGrowthLoading}
            isError={isUserGrowthError}
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ContentStatsChart
          data={contentStats ?? { items: [] }}
          isLoading={isContentStatsLoading}
          isError={isContentStatsError}
        />

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-200">
              Top content
            </h2>
            <div className="flex flex-wrap gap-2">
              {topTypeOptions.map((option) => (
                <Button
                  key={option}
                  type="button"
                  size="sm"
                  variant={option === topType ? 'default' : 'outline'}
                  onClick={() => setTopType(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
          <TopContent
            items={topContentItems}
            type={topType}
            isLoading={isTopContentLoading}
            isError={isTopContentError}
          />
        </div>
      </section>

      <section>
        <RecentActivity
          items={recentActivityItems}
          isLoading={isRecentActivityLoading}
          isError={isRecentActivityError}
        />
      </section>
    </div>
  )
}
