import { useEffect, useMemo, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import type { TvShowListParams } from '@/features/content/tv-shows/types'
import { useTvShow, useTvShows } from '@/features/content/tv-shows/hooks'
import { TvShowFormDialog } from '@/features/content/tv-shows/components/tv-show-form-dialog'
import { TvShowFilters } from '@/features/content/tv-shows/components/tv-show-filters'
import { TvShowsTable } from '@/features/content/tv-shows/components/tv-shows-table'
import { DeleteTvShowDialog } from '@/features/content/tv-shows/components/delete-tv-show-dialog'

export const Route = createFileRoute('/_authenticated/content/tv-shows/')({
  component: TvShowsPage,
})

function TvShowsPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [filterState, setFilterState] = useState<
    Omit<TvShowListParams, 'page' | 'limit' | 'sort' | 'order'>
  >({})
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [activeTvShowId, setActiveTvShowId] = useState<string | undefined>(undefined)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const params: TvShowListParams = useMemo(
    () => ({
      page,
      limit: 10,
      search: search || undefined,
      genre: filterState.genre,
      year: filterState.year,
      access_type: filterState.access_type,
    }),
    [page, search, filterState],
  )

  const { data, isLoading } = useTvShows(params)
  const tvShows = data?.tvShows ?? []
  const { data: activeTvShowDetail } = useTvShow(activeTvShowId)

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
    if (selectedIds.length === tvShows.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(tvShows.map((t) => t.id || t._id || ''))
    }
  }

  const handleSelectTvShow = (id: string) => {
    setActiveTvShowId(id)
    setFormMode('edit')
    setIsFormOpen(true)
  }

  const handleCreateTvShow = () => {
    setFormMode('create')
    setActiveTvShowId(undefined)
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
            TV Shows
          </h1>
          <p className="text-sm text-slate-400">
            Manage platform TV shows and their seasons.
          </p>
        </div>
        <Button type="button" onClick={handleCreateTvShow} className="shrink-0">
          Create TV show
        </Button>
      </header>

      <TvShowFilters
        value={filterState}
        onChange={(next) => {
          setFilterState(next)
          setPage(1)
        }}
        onSearchChange={debouncedSearchChange}
      />

      <TvShowsTable
        tvShows={tvShows}
        isLoading={isLoading}
        page={data?.currentPage ?? page}
        totalPages={data?.totalPages ?? page}
        onPageChange={(next) => {
          if (next < 1 || (data && next > data.totalPages)) return
          setPage(next)
        }}
        onSelectTvShow={handleSelectTvShow}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
      />

      <TvShowFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        mode={formMode}
        tvShow={formMode === 'edit' ? activeTvShowDetail ?? null : null}
      />

      <DeleteTvShowDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        tvShow={activeTvShowDetail ?? null}
      />
    </div>
  )
}
