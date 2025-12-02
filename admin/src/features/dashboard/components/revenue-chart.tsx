import { useId } from 'react'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card } from '@/components/ui/card'
import type { DashboardPeriod, RevenuePoint } from '../types'

interface RevenueChartProps {
  data: RevenuePoint[]
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

export function RevenueChart({
  data,
  period,
  isLoading,
  isError,
}: RevenueChartProps) {
  const gradientId = useId()

  return (
    <Card className="border-slate-800/50 bg-slate-900/60 p-5 shadow-lg">
      <div className="mb-2 flex items-baseline justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">
            Revenue ({period})
          </h2>
          <p className="text-xs text-slate-500">{periodLabel[period]}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-4 h-48 animate-pulse rounded bg-slate-800" />
      ) : isError ? (
        <div className="mt-4 text-sm text-red-400">
          Failed to load revenue data.
        </div>
      ) : data.length === 0 ? (
        <div className="mt-4 text-sm text-slate-500">
          No revenue data available for this period.
        </div>
      ) : (
        <div className="mt-4 h-56 w-full" style={{ minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#517cee" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#517cee" stopOpacity={0} />
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#517cee"
                fill={`url(#${gradientId})`}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}


