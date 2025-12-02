import { useEffect, useMemo, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import type { VideoListParams } from '@/features/content/videos/types'
import { useVideo, useVideos, useBulkDeleteVideos } from '@/features/content/videos/hooks'
import { VideoFormDialog } from '@/features/content/videos/components/video-form-dialog'
import { VideoFilters } from '@/features/content/videos/components/video-filters'
import { VideosBulkActions } from '@/features/content/videos/components/videos-bulk-actions'
import { VideosTable } from '@/features/content/videos/components/videos-table'
import { DeleteVideoDialog } from '@/features/content/videos/components/delete-video-dialog'

export const Route = createFileRoute('/_authenticated/content/videos/')({
  component: VideosPage,
})

function VideosPage() {
  const [page, setPage] = useState(1)
  const [_search, setSearch] = useState('')
  const [filterState, setFilterState] = useState<
    Omit<VideoListParams, 'page' | 'limit' | 'sort' | 'order'>
  >({})
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [activeVideoId, setActiveVideoId] = useState<string | undefined>(undefined)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const params: VideoListParams = useMemo(
    () => ({
      page,
      limit: 10,
      genre: filterState.genre,
      year: filterState.year,
    }),
    [page, filterState],
  )

  const { data, isLoading } = useVideos(params)
  const videos = data?.videos ?? []
  const { data: activeVideoDetail } = useVideo(activeVideoId)
  const bulkDeleteMutation = useBulkDeleteVideos()

  // Reset selection when page changes
  useEffect(() => {
    void page
    setSelectedIds([])
  }, [page])

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const handleToggleSelectAll = () => {
    if (selectedIds.length === videos.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(videos.map((v) => v.id || v._id || ''))
    }
  }

  const handleSelectVideo = (id: string) => {
    setActiveVideoId(id)
    setFormMode('edit')
    setIsFormOpen(true)
  }

  const handleCreateVideo = () => {
    setFormMode('create')
    setActiveVideoId(undefined)
    setIsFormOpen(true)
  }

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return
    bulkDeleteMutation.mutate(selectedIds, {
      onSuccess: () => {
        setSelectedIds([])
      },
    })
  }

  const debouncedSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  return (
    <div className="space-y-6">
      <header className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">
            Videos
          </h1>
          <p className="text-sm text-slate-400">
            Manage platform videos, uploads, and access control.
          </p>
        </div>
        <Button type="button" onClick={handleCreateVideo} className="shrink-0">
          Create video
        </Button>
      </header>

      <VideoFilters
        value={filterState}
        onChange={(next) => {
          setFilterState(next)
          setPage(1)
        }}
        onSearchChange={debouncedSearchChange}
      />

      <VideosBulkActions
        selectedIds={selectedIds}
        videos={videos}
        onClearSelection={() => setSelectedIds([])}
        onBulkDelete={handleBulkDelete}
      />

      <VideosTable
        videos={videos}
        isLoading={isLoading}
        page={data?.currentPage ?? page}
        totalPages={data?.totalPages ?? page}
        onPageChange={(next) => {
          if (next < 1 || (data && next > data.totalPages)) return
          setPage(next)
        }}
        onSelectVideo={handleSelectVideo}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
      />

      <VideoFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        mode={formMode}
        video={formMode === 'edit' ? activeVideoDetail ?? null : null}
      />

      <DeleteVideoDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        video={activeVideoDetail ?? null}
      />
    </div>
  )
}
