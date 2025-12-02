import { useId, useMemo } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

import type { BillingCycle } from '@/features/monetization/types'
import type { PlanListParams } from '../types'

interface PlanFiltersProps {
  value: Omit<PlanListParams, 'page' | 'limit'>
  onChange: (next: Omit<PlanListParams, 'page' | 'limit'>) => void
}

const billingCycleOptions: { label: string; value: BillingCycle }[] = [
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Yearly', value: 'yearly' },
]

export function PlanFilters({ value, onChange }: PlanFiltersProps) {
  const currentCycle = value.billing_cycle
  const baseId = useId()
  const activeId = `${baseId}-plans-active`
  const featuredId = `${baseId}-plans-featured`
  const billingId = `${baseId}-billing-cycle`

  const billingCycleLabel = useMemo(() => {
    const found = billingCycleOptions.find((opt) => opt.value === currentCycle)
    return found?.label ?? 'All billing cycles'
  }, [currentCycle])

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center gap-2">
        <Switch
          id={activeId}
          checked={value.is_active ?? false}
          onCheckedChange={(checked) =>
            onChange({
              ...value,
              is_active: checked ? true : undefined,
            })
          }
        />
        <Label htmlFor={activeId} className="text-slate-300">
          Active only
        </Label>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id={featuredId}
          checked={value.is_featured ?? false}
          onCheckedChange={(checked) =>
            onChange({
              ...value,
              is_featured: checked ? true : undefined,
            })
          }
        />
        <Label htmlFor={featuredId} className="text-slate-300">
          Featured only
        </Label>
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor={billingId} className="text-slate-300">
          Billing cycle
        </Label>
        <Select
          value={currentCycle ?? ''}
          onValueChange={(next) =>
            onChange({
              ...value,
              billing_cycle: (next || undefined) as BillingCycle | undefined,
            })
          }
        >
          <SelectTrigger id={billingId} className="min-w-[160px]">
            <SelectValue placeholder={billingCycleLabel} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All billing cycles</SelectItem>
            {billingCycleOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}


