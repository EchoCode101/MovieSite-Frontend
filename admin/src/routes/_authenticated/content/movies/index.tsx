import { useEffect, useMemo, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import type { MovieListParams } from '@/features/content/movies/types'
import { useMovie, useMovies } from '@/features/content/movies/hooks'
import { MovieFormDialog } from '@/features/content/movies/components/movie-form-dialog'
import { MovieFilters } from '@/features/content/movies/components/movie-filters'
import { MoviesTable } from '@/features/content/movies/components/movies-table'
import { DeleteMovieDialog } from '@/features/content/movies/components/delete-movie-dialog'

export const Route = createFileRoute('/_authenticated/content/movies/')({
  component: MoviesPage,
})

function MoviesPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [filterState, setFilterState] = useState<
    Omit<MovieListParams, 'page' | 'limit' | 'sort' | 'order'>
  >({})
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [activeMovieId, setActiveMovieId] = useState<string | undefined>(undefined)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const params: MovieListParams = useMemo(
    () => ({
      page,
      limit: 10,
      search: search || undefined,
      genre: filterState.genre,
      year: filterState.year,
      access_type: filterState.access_type,
      is_trending: filterState.is_trending,
      is_featured: filterState.is_featured,
      is_coming_soon: filterState.is_coming_soon,
    }),
    [page, search, filterState],
  )

  const { data, isLoading } = useMovies(params)
  const movies = data?.movies ?? []
  const { data: activeMovieDetail } = useMovie(activeMovieId)

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
    if (selectedIds.length === movies.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(movies.map((m) => m.id || m._id || ''))
    }
  }

  const handleSelectMovie = (id: string) => {
    setActiveMovieId(id)
    setFormMode('edit')
    setIsFormOpen(true)
  }

  const handleCreateMovie = () => {
    setFormMode('create')
    setActiveMovieId(undefined)
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
            Movies
          </h1>
          <p className="text-sm text-slate-400">
            Manage platform movies, streams, and access control.
          </p>
        </div>
        <Button type="button" onClick={handleCreateMovie} className="shrink-0">
          Create movie
        </Button>
      </header>

      <MovieFilters
        value={filterState}
        onChange={(next) => {
          setFilterState(next)
          setPage(1)
        }}
        onSearchChange={debouncedSearchChange}
      />

      <MoviesTable
        movies={movies}
        isLoading={isLoading}
        page={data?.currentPage ?? page}
        totalPages={data?.totalPages ?? page}
        onPageChange={(next) => {
          if (next < 1 || (data && next > data.totalPages)) return
          setPage(next)
        }}
        onSelectMovie={handleSelectMovie}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
      />

      <MovieFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        mode={formMode}
        movie={formMode === 'edit' ? activeMovieDetail ?? null : null}
      />

      <DeleteMovieDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        movie={activeMovieDetail ?? null}
      />
    </div>
  )
}
