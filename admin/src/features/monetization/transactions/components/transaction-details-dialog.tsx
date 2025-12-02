import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import type { Transaction } from '../types'

interface TransactionDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction?: Transaction | null
}

export function TransactionDetailsDialog({
  open,
  onOpenChange,
  transaction,
}: TransactionDetailsDialogProps) {
  const id = transaction?.id || transaction?._id || ''

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction details</DialogTitle>
          <DialogDescription>
            View information about this payment transaction.
          </DialogDescription>
        </DialogHeader>

        {transaction ? (
          <div className="space-y-3 text-sm text-slate-200">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                ID
              </p>
              <p className="font-mono break-all text-slate-100">{id}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Type
                </p>
                <p className="capitalize">
                  {transaction.type.replace('_', ' ')}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Status
                </p>
                <p>{transaction.status}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Amount
                </p>
                <p>
                  ${transaction.amount.toFixed(2)} {transaction.currency}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Gateway
                </p>
                <p>{transaction.gateway}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Created at
                </p>
                <p>{new Date(transaction.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Updated at
                </p>
                <p>{new Date(transaction.updatedAt).toLocaleString()}</p>
              </div>
            </div>
            {transaction.gateway_transaction_id && (
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Gateway transaction ID
                </p>
                <p className="font-mono break-all text-slate-100">
                  {transaction.gateway_transaction_id}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-slate-400">
            No transaction selected.
          </p>
        )}

        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


