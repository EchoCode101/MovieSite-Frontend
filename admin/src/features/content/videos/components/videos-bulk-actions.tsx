import { Button } from '@/components/ui/button'
import type { VideoSummary } from '../types'

interface VideosBulkActionsProps {
  selectedIds: string[]
  videos: VideoSummary[]
  onClearSelection: () => void
  onBulkDelete: () => void
}

function exportVideosToCsv(videos: VideoSummary[]) {
  if (videos.length === 0) return

  const headers = [
    'id',
    'title',
    'category',
    'language',
    'access_level',
    'published',
    'views_count',
    'createdAt',
  ]

  const rows = videos.map((video) => [
    video.id || video._id || '',
    video.title,
    video.category || '',
    video.language || '',
    video.access_level || 'Free',
    video.published ? 'Yes' : 'No',
    String(video.metrics?.views_count || video.likes_count || 0),
    video.createdAt,
  ])

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'videos-export.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function VideosBulkActions({
  selectedIds,
  videos,
  onClearSelection,
  onBulkDelete,
}: VideosBulkActionsProps) {
  if (selectedIds.length === 0) {
    return null
  }

  const selectedVideos = videos.filter((video) =>
    selectedIds.includes(video.id || video._id || ''),
  )

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-3">
      <div className="text-sm text-slate-200">
        {selectedIds.length} video{selectedIds.length > 1 ? 's' : ''} selected
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => exportVideosToCsv(selectedVideos)}
        >
          Export CSV
        </Button>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={onBulkDelete}
        >
          Delete selected
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
        >
          Clear
        </Button>
      </div>
    </div>
  )
}

