import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { useSeasons } from '@/features/content/seasons/hooks'
import { SeasonsTable } from '@/features/content/seasons/components/seasons-table'
import { SeasonFormDialog } from '@/features/content/seasons/components/season-form-dialog'

export const Route = createFileRoute('/_authenticated/content/seasons/')({
  component: SeasonsPage,
})

function SeasonsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { data: seasons = [], isLoading } = useSeasons()

  const handleCreateSeason = () => {
    setIsFormOpen(true)
  }

  return (
    <div className="space-y-6">
      <header className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">
            Seasons
          </h1>
          <p className="text-sm text-slate-400">
            Manage all seasons across TV shows.
          </p>
        </div>
        <Button type="button" onClick={handleCreateSeason} className="shrink-0">
          Create season
        </Button>
      </header>

      <SeasonsTable seasons={seasons} isLoading={isLoading} />

      <SeasonFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        mode="create"
      />
    </div>
  )
}
