import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { useGenres } from '@/features/content/genres/hooks'
import { GenreFormDialog } from '@/features/content/genres/components/genre-form-dialog'
import { GenresTable } from '@/features/content/genres/components/genres-table'
import { DeleteGenreDialog } from '@/features/content/genres/components/delete-genre-dialog'
import type { Genre } from '@/features/content/genres/types'

export const Route = createFileRoute('/_authenticated/content/genres/')({
  component: GenresPage,
})

function GenresPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [activeGenre, setActiveGenre] = useState<Genre | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [genreToDelete, setGenreToDelete] = useState<Genre | null>(null)

  const { data: genres = [], isLoading } = useGenres()

  const handleCreateGenre = () => {
    setFormMode('create')
    setActiveGenre(null)
    setIsFormOpen(true)
  }

  const handleEditGenre = (genre: Genre) => {
    setFormMode('edit')
    setActiveGenre(genre)
    setIsFormOpen(true)
  }

  const handleDeleteGenre = (genre: Genre) => {
    setGenreToDelete(genre)
    setIsDeleteOpen(true)
  }

  return (
    <div className="space-y-6">
      <header className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">Genres</h1>
          <p className="text-sm text-slate-400">Manage content genres.</p>
        </div>
        <Button type="button" onClick={handleCreateGenre} className="shrink-0">
          Create Genre
        </Button>
      </header>

      <GenresTable
        genres={genres}
        isLoading={isLoading}
        onEdit={handleEditGenre}
        onDelete={handleDeleteGenre}
      />

      <GenreFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        mode={formMode}
        genre={formMode === 'edit' ? activeGenre : null}
      />

      <DeleteGenreDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        genre={genreToDelete}
      />
    </div>
  )
}
