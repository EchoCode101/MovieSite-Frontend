import { discountTypes } from '@/features/monetization/types'
import type { DiscountType } from '@/features/monetization/types'
import type { CouponListParams } from '../types'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useId } from 'react'

interface CouponFiltersProps {
  value: CouponListParams
  onChange: (next: CouponListParams) => void
}

export function CouponFilters({ value, onChange }: CouponFiltersProps) {
  const baseId = useId()
  const activeId = `${baseId}-coupons-active`
  const discountId = `${baseId}-discount-type`
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
        <Label htmlFor={discountId} className="text-slate-300">
          Discount type
        </Label>
        <Select
          value={value.discount_type ?? ''}
          onValueChange={(next) =>
            onChange({
              ...value,
              discount_type: (next || undefined) as DiscountType | undefined,
            })
          }
        >
          <SelectTrigger id={discountId} className="min-w-[160px]">
            <SelectValue placeholder="All discount types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All discount types</SelectItem>
            {discountTypes.map((t) => (
              <SelectItem key={t} value={t}>
                {t === 'fixed' ? 'Fixed amount' : 'Percent'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}


