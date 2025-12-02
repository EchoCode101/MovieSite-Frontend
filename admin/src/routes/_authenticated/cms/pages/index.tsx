import { useMemo, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { usePages } from '@/features/cms/pages/hooks'
import type { Page } from '@/features/cms/pages/types'
import { PagesTable } from '@/features/cms/pages/components/pages-table'
import { PageFormDialog } from '@/features/cms/pages/components/page-form-dialog'
import { DeletePageDialog } from '@/features/cms/pages/components/delete-page-dialog'

export const Route = createFileRoute('/_authenticated/cms/pages/')({
  component: PagesPage,
})

function PagesPage() {
  const { data: pages = [], isLoading } = usePages()

  const [search, setSearch] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [activePage, setActivePage] = useState<Page | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const filteredPages = useMemo(() => {
    if (!search.trim()) return pages
    const query = search.toLowerCase()
    return pages.filter(
      (page) =>
        page.title.toLowerCase().includes(query) ||
        page.slug.toLowerCase().includes(query),
    )
  }, [pages, search])

  const handleCreate = () => {
    setFormMode('create')
    setActivePage(null)
    setIsFormOpen(true)
  }

  const handleEdit = (page: Page) => {
    setFormMode('edit')
    setActivePage(page)
    setIsFormOpen(true)
  }

  const handleDelete = (page: Page) => {
    setActivePage(page)
    setIsDeleteOpen(true)
  }

  return (
    <div className="space-y-6">
      <header className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">
            Pages
          </h1>
          <p className="text-sm text-slate-400">
            Manage static CMS pages like About, FAQ, Terms, and Privacy.
          </p>
        </div>
        <Button type="button" onClick={handleCreate} className="shrink-0">
          Create page
        </Button>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-4">
        <div className="flex-1 min-w-[220px]">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title or slug..."
          />
        </div>
      </div>

      <PagesTable
        pages={filteredPages}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PageFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        mode={formMode}
        page={activePage}
      />

      <DeletePageDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        page={activePage}
      />
    </div>
  )
}

