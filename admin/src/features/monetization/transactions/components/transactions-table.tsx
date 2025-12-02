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

import type { Transaction } from '../types'

interface TransactionsTableProps {
  transactions: Transaction[]
  isLoading: boolean
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  onViewDetails: (transaction: Transaction) => void
}

export function TransactionsTable({
  transactions,
  isLoading,
  page,
  pageSize,
  onPageChange,
  onViewDetails,
}: TransactionsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading transactions...
      </div>
    )
  }

  if (!transactions.length) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        No transactions found.
      </div>
    )
  }

  const startIndex = (page - 1) * pageSize
  const paginated = transactions.slice(startIndex, startIndex + pageSize)
  const totalPages = Math.max(1, Math.ceil(transactions.length / pageSize))

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-slate-800/50">
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Gateway</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((tx) => {
              const id = tx.id || tx._id || ''
              return (
                <TableRow
                  key={id}
                  className="border-slate-800 hover:bg-slate-800/50"
                >
                  <TableCell className="font-mono text-xs">
                    {id.slice(0, 8)}
                  </TableCell>
                  <TableCell className="capitalize text-slate-300">
                    {tx.type.replace('_', ' ')}
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {tx.gateway}
                  </TableCell>
                  <TableCell className="text-slate-300">
                    ${tx.amount.toFixed(2)} {tx.currency}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        tx.status === 'paid'
                          ? 'border-emerald-500/60 text-emerald-300'
                          : tx.status === 'pending'
                            ? 'border-amber-500/60 text-amber-300'
                            : tx.status === 'failed'
                              ? 'border-red-500/60 text-red-300'
                              : 'border-sky-500/60 text-sky-300'
                      }
                    >
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {new Date(tx.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-slate-200"
                      onClick={() => onViewDetails(tx)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>
          Page {page} of {totalPages}
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


