import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Pencil, Trash2 } from 'lucide-react'

import type { Plan } from '../types'

interface PlansTableProps {
  plans: Plan[]
  isLoading: boolean
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onEdit: (plan: Plan) => void
  onDelete: (plan: Plan) => void
}

export function PlansTable({
  plans,
  isLoading,
  page,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
}: PlansTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading plans...
      </div>
    )
  }

  if (!plans.length) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        No subscription plans found.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-slate-800/50">
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Billing cycle</TableHead>
              <TableHead>Devices</TableHead>
              <TableHead>Profiles</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => {
              const id = plan.id || plan._id || ''
              return (
                <TableRow
                  key={id}
                  className="border-slate-800 hover:bg-slate-800/50"
                >
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell className="text-slate-300">
                    ${plan.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {plan.billing_cycle}
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {plan.max_devices ?? '—'}
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {plan.max_profiles ?? '—'}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {plan.is_active && (
                        <Badge variant="outline" className="border-emerald-500/60 text-emerald-300">
                          Active
                        </Badge>
                      )}
                      {plan.is_featured && (
                        <Badge variant="outline" className="border-amber-500/60 text-amber-300">
                          Featured
                        </Badge>
                      )}
                      {plan.ad_supported && (
                        <Badge variant="outline" className="border-sky-500/60 text-sky-300">
                          Ad-supported
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => onEdit(plan)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                        onClick={() => onDelete(plan)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}


