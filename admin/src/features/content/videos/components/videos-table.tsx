import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { VideoSummary } from '../types'

interface VideosTableProps {
  videos: VideoSummary[]
  isLoading: boolean
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onSelectVideo: (id: string) => void
  selectedIds: string[]
  onToggleSelect: (id: string) => void
  onToggleSelectAll: () => void
}

export function VideosTable({
  videos,
  isLoading,
  page,
  totalPages,
  onPageChange,
  onSelectVideo,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
}: VideosTableProps) {
  const allSelected = videos.length > 0 && selectedIds.length === videos.length

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading videos...
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        No videos found
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
              <TableHead>Category</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Access Level</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((video) => {
              const videoId = video.id || video._id || ''
              const isSelected = selectedIds.includes(videoId)
              return (
                <TableRow
                  key={videoId}
                  className="border-slate-800 hover:bg-slate-800/50 cursor-pointer"
                  onClick={() => onSelectVideo(videoId)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => onToggleSelect(videoId)}
                      aria-label={`Select ${video.title}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{video.title}</TableCell>
                  <TableCell>{video.category || '-'}</TableCell>
                  <TableCell>{video.language || '-'}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        video.access_level === 'Free'
                          ? 'bg-green-500/20 text-green-300'
                          : video.access_level === 'Subscription'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-purple-500/20 text-purple-300'
                      }`}
                    >
                      {video.access_level || 'Free'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        video.published
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-gray-500/20 text-gray-300'
                      }`}
                    >
                      {video.published ? 'Yes' : 'No'}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {video.metrics?.views_count || video.likes_count || 0}
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {new Date(video.createdAt).toLocaleDateString()}
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

