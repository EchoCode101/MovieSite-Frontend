import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { EpisodeSummary } from '../types'

interface EpisodesTableProps {
  episodes: EpisodeSummary[]
  isLoading: boolean
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onSelectEpisode: (id: string) => void
  selectedIds: string[]
  onToggleSelect: (id: string) => void
  onToggleSelectAll: () => void
}

export function EpisodesTable({
  episodes,
  isLoading,
  page,
  totalPages,
  onPageChange,
  onSelectEpisode,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
}: EpisodesTableProps) {
  const allSelected = episodes.length > 0 && selectedIds.length === episodes.length

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading episodes...
      </div>
    )
  }

  if (episodes.length === 0) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        No episodes found
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
              <TableHead>Episode #</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Access Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {episodes.map((episode) => {
              const episodeId = episode.id || episode._id || ''
              const isSelected = selectedIds.includes(episodeId)
              return (
                <TableRow
                  key={episodeId}
                  className="border-slate-800 hover:bg-slate-800/50 cursor-pointer"
                  onClick={() => onSelectEpisode(episodeId)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => onToggleSelect(episodeId)}
                      aria-label={`Select ${episode.title}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {episode.episode_number}
                  </TableCell>
                  <TableCell className="font-medium">{episode.title}</TableCell>
                  <TableCell className="text-slate-400">
                    {episode.duration_minutes ? `${episode.duration_minutes} min` : '-'}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        episode.access_type === 'free'
                          ? 'bg-green-500/20 text-green-300'
                          : episode.access_type === 'subscription'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-purple-500/20 text-purple-300'
                      }`}
                    >
                      {episode.access_type || 'free'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        episode.status === 'published'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-gray-500/20 text-gray-300'
                      }`}
                    >
                      {episode.status || 'draft'}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {new Date(episode.createdAt).toLocaleDateString()}
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

