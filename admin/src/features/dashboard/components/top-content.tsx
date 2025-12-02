import { Card } from '@/components/ui/card'
import type { TopContentItem, TopContentType } from '../types'

interface TopContentProps {
  items: TopContentItem[]
  type: TopContentType
  isLoading?: boolean
  isError?: boolean
}

const typeLabel: Record<TopContentType, string> = {
  all: 'All content',
  movie: 'Movies',
  'tv-show': 'TV shows',
  video: 'Videos',
  episode: 'Episodes',
}

export function TopContent({
  items,
  type,
  isLoading,
  isError,
}: TopContentProps) {
  return (
    <Card className="border-slate-800/50 bg-slate-900/60 p-5 shadow-lg">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-100">
            Top content
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            {typeLabel[type]} ranked by views.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[0, 1, 2, 3].map((skeletonKey) => (
            <div key={skeletonKey} className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded bg-slate-800" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-40 animate-pulse rounded bg-slate-800" />
                <div className="h-3 w-24 animate-pulse rounded bg-slate-900" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="mt-2 text-sm text-red-400">
          Failed to load top content.
        </div>
      ) : items.length === 0 ? (
        <div className="mt-2 text-sm text-slate-500">
          No content available for this filter.
        </div>
      ) : (
        <ul className="space-y-3 text-sm">
          {items.map((item, index) => (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-lg border border-slate-800/30 bg-slate-800/20 p-3 transition-all hover:border-slate-700/50 hover:bg-slate-800/30"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  index === 0
                    ? 'bg-[#517cee] text-white'
                    : index === 1
                      ? 'bg-slate-600 text-white'
                      : index === 2
                        ? 'bg-slate-700 text-white'
                        : 'bg-slate-800 text-slate-200'
                }`}
              >
                {index + 1}
              </div>
              {item.thumbnailUrl ? (
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="h-12 w-20 shrink-0 rounded object-cover"
                />
              ) : (
                <div className="h-12 w-20 shrink-0 rounded bg-slate-800" />
              )}
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-slate-100">{item.title}</div>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="inline-flex items-center rounded-full bg-slate-700/50 px-2 py-0.5 capitalize">
                    {item.type}
                  </span>
                  <span className="text-slate-400">
                    {item.views.toLocaleString()} views
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-400">
                    {item.likes.toLocaleString()} likes
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}


