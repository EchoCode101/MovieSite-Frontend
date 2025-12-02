import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

import type { PaymentMethod } from '@/features/monetization/payment-methods/types'
import { usePaymentMethods } from '@/features/monetization/payment-methods/hooks'
import { PaymentMethodsTable } from '@/features/monetization/payment-methods/components/payment-methods-table'
import { PaymentMethodFormDialog } from '@/features/monetization/payment-methods/components/payment-method-form-dialog'
import { DeletePaymentMethodDialog } from '@/features/monetization/payment-methods/components/delete-payment-method-dialog'

export const Route = createFileRoute(
  '/_authenticated/monetization/payment-methods/',
)({
  component: PaymentMethodsPage,
})

function PaymentMethodsPage() {
  const { data: methods = [], isLoading } = usePaymentMethods()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [activeMethod, setActiveMethod] = useState<PaymentMethod | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const handleCreate = () => {
    setFormMode('create')
    setActiveMethod(null)
    setIsFormOpen(true)
  }

  const handleEdit = (method: PaymentMethod) => {
    setFormMode('edit')
    setActiveMethod(method)
    setIsFormOpen(true)
  }

  const handleDelete = (method: PaymentMethod) => {
    setActiveMethod(method)
    setIsDeleteOpen(true)
  }

  return (
    <div className="space-y-6">
      <header className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">
            Payment methods
          </h1>
          <p className="text-sm text-slate-400">
            Configure available payment gateways for subscriptions and PPV.
          </p>
        </div>
        <Button type="button" onClick={handleCreate} className="shrink-0">
          Create payment method
        </Button>
      </header>

      <PaymentMethodsTable
        methods={methods}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PaymentMethodFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        mode={formMode}
        method={activeMethod}
      />

      <DeletePaymentMethodDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        method={activeMethod}
      />
    </div>
  )
}

