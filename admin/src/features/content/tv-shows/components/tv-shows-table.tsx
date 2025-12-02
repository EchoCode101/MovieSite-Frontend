import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { TvShowSummary } from '../types'

interface TvShowsTableProps {
  tvShows: TvShowSummary[]
  isLoading: boolean
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onSelectTvShow: (id: string) => void
  selectedIds: string[]
  onToggleSelect: (id: string) => void
  onToggleSelectAll: () => void
}

export function TvShowsTable({
  tvShows,
  isLoading,
  page,
  totalPages,
  onPageChange,
  onSelectTvShow,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
}: TvShowsTableProps) {
  const allSelected = tvShows.length > 0 && selectedIds.length === tvShows.length

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading TV shows...
      </div>
    )
  }

  if (tvShows.length === 0) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        No TV shows found
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-slate-800/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={onToggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Release Year</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Access Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tvShows.map((tvShow) => {
              const tvShowId = tvShow.id || tvShow._id || ''
              const isSelected = selectedIds.includes(tvShowId)
              return (
                <TableRow
                  key={tvShowId}
                  className="border-slate-800 hover:bg-slate-800/50 cursor-pointer"
                  onClick={() => onSelectTvShow(tvShowId)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => onToggleSelect(tvShowId)}
                      aria-label={`Select ${tvShow.title}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{tvShow.title}</TableCell>
                  <TableCell className="text-slate-400">
                    {tvShow.release_year || '-'}
                  </TableCell>
                  <TableCell>{tvShow.language || '-'}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        tvShow.access_type === 'free'
                          ? 'bg-green-500/20 text-green-300'
                          : tvShow.access_type === 'subscription'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-purple-500/20 text-purple-300'
                      }`}
                    >
                      {tvShow.access_type || 'free'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        tvShow.status === 'published'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-gray-500/20 text-gray-300'
                      }`}
                    >
                      {tvShow.status || 'draft'}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {new Date(tvShow.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-400">
          Page {page} of {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1 text-sm text-slate-100 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1 text-sm text-slate-100 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

