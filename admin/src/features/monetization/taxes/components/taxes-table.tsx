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

import type { Tax } from '../types'

interface TaxesTableProps {
  taxes: Tax[]
  isLoading: boolean
  onEdit: (tax: Tax) => void
  onDelete: (tax: Tax) => void
}

export function TaxesTable({
  taxes,
  isLoading,
  onEdit,
  onDelete,
}: TaxesTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading taxes...
      </div>
    )
  }

  if (!taxes.length) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        No taxes configured.
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-800 hover:bg-slate-800/50">
            <TableHead>Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Rate (%)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taxes.map((tax) => {
            const id = tax.id || tax._id || ''
            return (
              <TableRow
                key={id}
                className="border-slate-800 hover:bg-slate-800/50"
              >
                <TableCell className="font-medium">{tax.name}</TableCell>
                <TableCell className="text-slate-300">
                  {tax.country || 'Any'}
                </TableCell>
                <TableCell className="text-slate-300">
                  {tax.rate_percent.toFixed(2)}%
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      tax.is_active
                        ? 'border-emerald-500/60 text-emerald-300'
                        : 'border-slate-600 text-slate-300'
                    }
                  >
                    {tax.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onEdit(tax)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                      onClick={() => onDelete(tax)}
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


