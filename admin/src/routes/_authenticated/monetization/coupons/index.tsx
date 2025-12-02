import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

import type { Coupon, CouponListParams } from '@/features/monetization/coupons/types'
import { useCoupons } from '@/features/monetization/coupons/hooks'
import { CouponFilters } from '@/features/monetization/coupons/components/coupon-filters'
import { CouponsTable } from '@/features/monetization/coupons/components/coupons-table'
import { CouponUsageStats } from '@/features/monetization/coupons/components/coupon-usage-stats'
import { CouponFormDialog } from '@/features/monetization/coupons/components/coupon-form-dialog'
import { DeleteCouponDialog } from '@/features/monetization/coupons/components/delete-coupon-dialog'

export const Route = createFileRoute('/_authenticated/monetization/coupons/')({
  component: CouponsPage,
})

function CouponsPage() {
  const [filterState, setFilterState] = useState<CouponListParams>({})
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { data: coupons = [], isLoading } = useCoupons(filterState)

  const handleCreate = () => {
    setFormMode('create')
    setActiveCoupon(null)
    setIsFormOpen(true)
  }

  const handleEdit = (coupon: Coupon) => {
    setFormMode('edit')
    setActiveCoupon(coupon)
    setIsFormOpen(true)
  }

  const handleDelete = (coupon: Coupon) => {
    setActiveCoupon(coupon)
    setIsDeleteOpen(true)
  }

  return (
    <div className="space-y-6">
      <header className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">
            Coupons
          </h1>
          <p className="text-sm text-slate-400">
            Manage discount coupons and promotion codes.
          </p>
        </div>
        <Button type="button" onClick={handleCreate} className="shrink-0">
          Create coupon
        </Button>
      </header>

      <CouponFilters
        value={filterState}
        onChange={(next) => {
          setFilterState(next)
        }}
      />

      <CouponUsageStats coupons={coupons} />

      <CouponsTable
        coupons={coupons}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CouponFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        mode={formMode}
        coupon={activeCoupon}
      />

      <DeleteCouponDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        coupon={activeCoupon}
      />
    </div>
  )
}

