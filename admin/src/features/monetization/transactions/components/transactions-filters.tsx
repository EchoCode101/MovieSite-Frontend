import type { TransactionListParams, TransactionType } from '../types'
import type { PaymentStatus } from '@/features/monetization/types'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface TransactionsFiltersProps {
  value: TransactionListParams
  onChange: (next: TransactionListParams) => void
}

const typeOptions: { label: string; value: TransactionType }[] = [
  { label: 'Subscription', value: 'subscription' },
  { label: 'Pay-per-view', value: 'pay_per_view' },
]

const statusOptions: { label: string; value: PaymentStatus }[] = [
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
  { label: 'Failed', value: 'failed' },
  { label: 'Refunded', value: 'refunded' },
]

export function TransactionsFilters({
  value,
  onChange,
}: TransactionsFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="tx-type" className="text-slate-300">
          Type
        </Label>
        <Select
          value={value.type ?? ''}
          onValueChange={(next) =>
            onChange({
              ...value,
              type: (next || undefined) as TransactionType | undefined,
            })
          }
        >
          <SelectTrigger id="tx-type" className="min-w-[160px]">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All types</SelectItem>
            {typeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="tx-status" className="text-slate-300">
          Status
        </Label>
        <Select
          value={value.status ?? ''}
          onValueChange={(next) =>
            onChange({
              ...value,
              status: (next || undefined) as PaymentStatus | undefined,
            })
          }
        >
          <SelectTrigger id="tx-status" className="min-w-[160px]">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All statuses</SelectItem>
            {statusOptions.map((opt) => (
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


