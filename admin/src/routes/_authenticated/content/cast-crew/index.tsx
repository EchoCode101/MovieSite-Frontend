import { useMemo, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { useCastCrew } from '@/features/content/cast-crew/hooks'
import { CastCrewFilters } from '@/features/content/cast-crew/components/cast-crew-filters'
import { CastCrewTable } from '@/features/content/cast-crew/components/cast-crew-table'
import { CastCrewFormDialog } from '@/features/content/cast-crew/components/cast-crew-form-dialog'
import { DeleteCastCrewDialog } from '@/features/content/cast-crew/components/delete-cast-crew-dialog'
import type { CastCrew, CastCrewListParams } from '@/features/content/cast-crew/types'

export const Route = createFileRoute('/_authenticated/content/cast-crew/')({
  component: CastCrewPage,
})

function CastCrewPage() {
  const [search, setSearch] = useState('')
  const [filterState, setFilterState] = useState<Omit<CastCrewListParams, 'search'>>({})
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [activeCastCrew, setActiveCastCrew] = useState<CastCrew | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [castCrewToDelete, setCastCrewToDelete] = useState<CastCrew | null>(null)

  const params: CastCrewListParams = useMemo(
    () => ({
      search: search || undefined,
      type: filterState.type,
    }),
    [search, filterState],
  )

  const { data: castCrew = [], isLoading } = useCastCrew(params)

  const handleCreateCastCrew = () => {
    setFormMode('create')
    setActiveCastCrew(null)
    setIsFormOpen(true)
  }

  const handleEditCastCrew = (member: CastCrew) => {
    setFormMode('edit')
    setActiveCastCrew(member)
    setIsFormOpen(true)
  }

  const handleDeleteCastCrew = (member: CastCrew) => {
    setCastCrewToDelete(member)
    setIsDeleteOpen(true)
  }

  return (
    <div className="space-y-6">
      <header className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">Cast & Crew</h1>
          <p className="text-sm text-slate-400">Manage cast and crew members.</p>
        </div>
        <Button type="button" onClick={handleCreateCastCrew} className="shrink-0">
          Create Member
        </Button>
      </header>

      <CastCrewFilters
        value={filterState}
        onChange={(next) => setFilterState(next)}
        onSearchChange={setSearch}
      />

      <CastCrewTable
        castCrew={castCrew}
        isLoading={isLoading}
        onEdit={handleEditCastCrew}
        onDelete={handleDeleteCastCrew}
      />

      <CastCrewFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        mode={formMode}
        castCrew={formMode === 'edit' ? activeCastCrew : null}
      />

      <DeleteCastCrewDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        castCrew={castCrewToDelete}
      />
    </div>
  )
}
