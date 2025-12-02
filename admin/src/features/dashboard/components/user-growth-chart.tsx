import {
  Line,
  LineChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card } from '@/components/ui/card'
import type { DashboardPeriod, UserGrowthPoint } from '../types'

interface UserGrowthChartProps {
  data: UserGrowthPoint[]
  period: DashboardPeriod
  isLoading?: boolean
  isError?: boolean
}

const periodLabel: Record<DashboardPeriod, string> = {
  day: 'Last 24 hours',
  week: 'Last 7 days',
  month: 'Last 30 days',
  year: 'Last 12 months',
}

export function UserGrowthChart({
  data,
  period,
  isLoading,
  isError,
}: UserGrowthChartProps) {
  return (
    <Card className="border-slate-800/50 bg-slate-900/60 p-5 shadow-lg">
      <div className="mb-2 flex items-baseline justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">
            User growth ({period})
          </h2>
          <p className="text-xs text-slate-500">{periodLabel[period]}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-4 h-48 animate-pulse rounded bg-slate-800" />
      ) : isError ? (
        <div className="mt-4 text-sm text-red-400">
          Failed to load user growth data.
        </div>
      ) : data.length === 0 ? (
        <div className="mt-4 text-sm text-slate-500">
          No user growth data available for this period.
        </div>
      ) : (
        <div className="mt-4 h-56 w-full" style={{ minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="label" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#020617',
                  borderColor: '#1e293b',
                  borderRadius: 8,
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="newUsers"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
                name="New users"
              />
              <Line
                type="monotone"
                dataKey="activeUsers"
                stroke="#517cee"
                strokeWidth={2}
                dot={false}
                name="Active users"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}


