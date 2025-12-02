import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'

import type { Coupon } from '../types'

interface CouponsTableProps {
  coupons: Coupon[]
  isLoading: boolean
  onEdit: (coupon: Coupon) => void
  onDelete: (coupon: Coupon) => void
}

export function CouponsTable({
  coupons,
  isLoading,
  onEdit,
  onDelete,
}: CouponsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading coupons...
      </div>
    )
  }

  if (!coupons.length) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        No coupons found.
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-800 hover:bg-slate-800/50">
            <TableHead>Code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Validity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons.map((coupon) => {
            const id = coupon.id || coupon._id || ''
            const isPercent = coupon.discount_type === 'percent'
            return (
              <TableRow
                key={id}
                className="border-slate-800 hover:bg-slate-800/50"
              >
                <TableCell className="font-mono font-semibold">
                  {coupon.code}
                </TableCell>
                <TableCell className="text-slate-300 max-w-xs truncate">
                  {coupon.description || '—'}
                </TableCell>
                <TableCell className="text-slate-300">
                  {isPercent
                    ? `${coupon.discount_value}%`
                    : `$${coupon.discount_value.toFixed(2)}`}
                </TableCell>
                <TableCell className="text-slate-400">
                  {coupon.valid_from
                    ? `${new Date(coupon.valid_from).toLocaleDateString()}`
                    : '—'}{' '}
                  –{' '}
                  {coupon.valid_until
                    ? new Date(coupon.valid_until).toLocaleDateString()
                    : '—'}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      coupon.is_active
                        ? 'border-emerald-500/60 text-emerald-300'
                        : 'border-slate-600 text-slate-300'
                    }
                  >
                    {coupon.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onEdit(coupon)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                      onClick={() => onDelete(coupon)}
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
  )
}


