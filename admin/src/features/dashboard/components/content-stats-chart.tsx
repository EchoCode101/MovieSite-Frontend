import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card } from '@/components/ui/card'
import type { ContentStats } from '../types'

interface ContentStatsChartProps {
  data: ContentStats
  isLoading?: boolean
  isError?: boolean
}

export function ContentStatsChart({
  data,
  isLoading,
  isError,
}: ContentStatsChartProps) {
  const chartData = data.items

  return (
    <Card className="border-slate-800/50 bg-slate-900/60 p-5 shadow-lg">
      <div className="mb-2 flex items-baseline justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">
            Content distribution
          </h2>
          <p className="text-xs text-slate-500">
            Breakdown of videos, movies, TV shows, and episodes.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-4 h-48 animate-pulse rounded bg-slate-800" />
      ) : isError ? (
        <div className="mt-4 text-sm text-red-400">
          Failed to load content statistics.
        </div>
      ) : chartData.length === 0 ? (
        <div className="mt-4 text-sm text-slate-500">
          No content statistics available.
        </div>
      ) : (
        <div className="mt-4 h-56 w-full" style={{ minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="label" stroke="#6b7280" />
              <YAxis allowDecimals={false} stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#020617',
                  borderColor: '#1e293b',
                  borderRadius: 8,
                }}
              />
              <Bar dataKey="count" fill="#517cee" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}


