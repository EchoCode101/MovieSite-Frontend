import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

import type { Tax } from '@/features/monetization/taxes/types'
import { useTaxes } from '@/features/monetization/taxes/hooks'
import { TaxFormDialog } from '@/features/monetization/taxes/components/tax-form-dialog'
import { TaxesTable } from '@/features/monetization/taxes/components/taxes-table'
import { DeleteTaxDialog } from '@/features/monetization/taxes/components/delete-tax-dialog'

export const Route = createFileRoute('/_authenticated/monetization/taxes/')({
  component: TaxesPage,
})

function TaxesPage() {
  const { data: taxes = [], isLoading } = useTaxes()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [activeTax, setActiveTax] = useState<Tax | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const handleCreate = () => {
    setFormMode('create')
    setActiveTax(null)
    setIsFormOpen(true)
  }

  const handleEdit = (tax: Tax) => {
    setFormMode('edit')
    setActiveTax(tax)
    setIsFormOpen(true)
  }

  const handleDelete = (tax: Tax) => {
    setActiveTax(tax)
    setIsDeleteOpen(true)
  }

  return (
    <div className="space-y-6">
      <header className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">
            Taxes
          </h1>
          <p className="text-sm text-slate-400">
            Configure tax rates for different countries.
          </p>
        </div>
        <Button type="button" onClick={handleCreate} className="shrink-0">
          Create tax
        </Button>
      </header>

      <TaxesTable taxes={taxes} isLoading={isLoading} onEdit={handleEdit} onDelete={handleDelete} />

      <TaxFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        mode={formMode}
        tax={activeTax}
      />

      <DeleteTaxDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        tax={activeTax}
      />
    </div>
  )
}

