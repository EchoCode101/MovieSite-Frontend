import { Card } from '@/components/ui/card'
import type { RecentActivityItem } from '../types'

interface RecentActivityProps {
  items: RecentActivityItem[]
  isLoading?: boolean
  isError?: boolean
}

function formatType(type: RecentActivityItem['type']): string {
  return type.replace(/-/g, ' ')
}

export function RecentActivity({
  items,
  isLoading,
  isError,
}: RecentActivityProps) {
  return (
    <Card className="border-slate-800/50 bg-slate-900/60 p-5 shadow-lg">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-100">
            Recent activity
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Latest actions performed by users across the platform.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[0, 1, 2, 3].map((skeletonKey) => (
            <div key={skeletonKey} className="space-y-2">
              <div className="h-4 w-64 animate-pulse rounded bg-slate-800" />
              <div className="h-3 w-40 animate-pulse rounded bg-slate-900" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="mt-2 text-sm text-red-400">
          Failed to load recent activity.
        </div>
      ) : items.length === 0 ? (
        <div className="mt-2 text-sm text-slate-500">
          No recent activity to display.
        </div>
      ) : (
        <ul className="space-y-3 text-sm">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-slate-800/30 bg-slate-800/20 p-3 transition-all hover:border-slate-700/50 hover:bg-slate-800/30"
            >
              <div className="flex-1">
                <div className="font-medium text-slate-100">{item.description}</div>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="inline-flex items-center rounded-full bg-slate-700/50 px-2 py-0.5 capitalize">
                    {formatType(item.type)}
                  </span>
                  {item.user ? (
                    <span className="text-slate-400">
                      {item.user.name ?? item.user.email ?? 'Unknown user'}
                    </span>
                  ) : null}
                  {item.target ? (
                    <>
                      <span className="text-slate-400">·</span>
                      <span className="capitalize text-slate-400">{item.target.type}</span>
                      <span className="text-slate-300">{item.target.title}</span>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="whitespace-nowrap text-xs text-slate-500">
                {new Date(item.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}


