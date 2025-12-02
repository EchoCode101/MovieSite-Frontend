import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

import { useBanners } from '@/features/cms/banners/hooks'
import type { Banner, BannerListParams } from '@/features/cms/banners/types'
import { BannerFilters } from '@/features/cms/banners/components/banner-filters'
import { BannersTable } from '@/features/cms/banners/components/banners-table'
import { BannerFormDialog } from '@/features/cms/banners/components/banner-form-dialog'
import { DeleteBannerDialog } from '@/features/cms/banners/components/delete-banner-dialog'

export const Route = createFileRoute('/_authenticated/cms/banners/')({
  component: BannersPage,
})

function BannersPage() {
  const [filters, setFilters] = useState<BannerListParams>({})
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [activeBanner, setActiveBanner] = useState<Banner | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { data: banners = [], isLoading } = useBanners(filters)

  const handleCreate = () => {
    setFormMode('create')
    setActiveBanner(null)
    setIsFormOpen(true)
  }

  const handleEdit = (banner: Banner) => {
    setFormMode('edit')
    setActiveBanner(banner)
    setIsFormOpen(true)
  }

  const handleDelete = (banner: Banner) => {
    setActiveBanner(banner)
    setIsDeleteOpen(true)
  }

  return (
    <div className="space-y-6">
      <header className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">
            Banners
          </h1>
          <p className="text-sm text-slate-400">
            Manage promotional banners across web, mobile, and TV experiences.
          </p>
        </div>
        <Button type="button" onClick={handleCreate} className="shrink-0">
          Create banner
        </Button>
      </header>

      <BannerFilters
        value={filters}
        onChange={(next) => {
          setFilters(next)
        }}
      />

      <BannersTable
        banners={banners}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <BannerFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        mode={formMode}
        banner={activeBanner}
      />

      <DeleteBannerDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        banner={activeBanner}
      />
    </div>
  )
}

