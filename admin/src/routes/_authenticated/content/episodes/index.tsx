import { useEffect, useMemo, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import type { EpisodeListParams } from '@/features/content/episodes/types'
import { useEpisode, useEpisodes } from '@/features/content/episodes/hooks'
import { EpisodeFormDialog } from '@/features/content/episodes/components/episode-form-dialog'
import { EpisodeFilters } from '@/features/content/episodes/components/episode-filters'
import { EpisodesTable } from '@/features/content/episodes/components/episodes-table'
import { DeleteEpisodeDialog } from '@/features/content/episodes/components/delete-episode-dialog'

export const Route = createFileRoute('/_authenticated/content/episodes/')({
  component: EpisodesPage,
})

function EpisodesPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [filterState, setFilterState] = useState<
    Omit<EpisodeListParams, 'page' | 'limit' | 'sort' | 'order'>
  >({})
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [activeEpisodeId, setActiveEpisodeId] = useState<string | undefined>(undefined)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const params: EpisodeListParams = useMemo(
    () => ({
      page,
      limit: 10,
      search: search || undefined,
      tv_show_id: filterState.tv_show_id,
      season_id: filterState.season_id,
      access_type: filterState.access_type,
    }),
    [page, search, filterState],
  )

  const { data, isLoading } = useEpisodes(params)
  const episodes = data?.episodes ?? []
  const { data: activeEpisodeDetail } = useEpisode(activeEpisodeId)

  // Reset selection when page changes
  useEffect(() => {
    setSelectedIds([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const handleToggleSelectAll = () => {
    if (selectedIds.length === episodes.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(episodes.map((e) => e.id || e._id || ''))
    }
  }

  const handleSelectEpisode = (id: string) => {
    setActiveEpisodeId(id)
    setFormMode('edit')
    setIsFormOpen(true)
  }

  const handleCreateEpisode = () => {
    setFormMode('create')
    setActiveEpisodeId(undefined)
    setIsFormOpen(true)
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
            Episodes
          </h1>
          <p className="text-sm text-slate-400">
            Manage platform episodes with streams and subtitles.
          </p>
        </div>
        <Button type="button" onClick={handleCreateEpisode} className="shrink-0">
          Create episode
        </Button>
      </header>

      <EpisodeFilters
        value={filterState}
        onChange={(next) => {
          setFilterState(next)
          setPage(1)
        }}
        onSearchChange={debouncedSearchChange}
      />

      <EpisodesTable
        episodes={episodes}
        isLoading={isLoading}
        page={data?.currentPage ?? page}
        totalPages={data?.totalPages ?? page}
        onPageChange={(next) => {
          if (next < 1 || (data && next > data.totalPages)) return
          setPage(next)
        }}
        onSelectEpisode={handleSelectEpisode}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
      />

      <EpisodeFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        mode={formMode}
        episode={formMode === 'edit' ? activeEpisodeDetail ?? null : null}
      />

      <DeleteEpisodeDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        episode={activeEpisodeDetail ?? null}
      />
    </div>
  )
}
