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

import type { PaymentMethod } from '../types'

interface PaymentMethodsTableProps {
  methods: PaymentMethod[]
  isLoading: boolean
  onEdit: (method: PaymentMethod) => void
  onDelete: (method: PaymentMethod) => void
}

export function PaymentMethodsTable({
  methods,
  isLoading,
  onEdit,
  onDelete,
}: PaymentMethodsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading payment methods...
      </div>
    )
  }

  if (!methods.length) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        No payment methods configured.
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-800 hover:bg-slate-800/50">
            <TableHead>Name</TableHead>
            <TableHead>Display name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {methods.map((method) => {
            const id = method.id || method._id || ''
            return (
              <TableRow
                key={id}
                className="border-slate-800 hover:bg-slate-800/50"
              >
                <TableCell className="font-medium">{method.name}</TableCell>
                <TableCell className="text-slate-300">
                  {method.display_name || '—'}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className={
                        method.is_active
                          ? 'border-emerald-500/60 text-emerald-300'
                          : 'border-slate-600 text-slate-300'
                      }
                    >
                      {method.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    {method.is_default && (
                      <Badge
                        variant="outline"
                        className="border-sky-500/60 text-sky-300"
                      >
                        Default
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
                      onClick={() => onEdit(method)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                      onClick={() => onDelete(method)}
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


