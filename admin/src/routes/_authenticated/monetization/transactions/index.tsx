import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

import type {
  Transaction,
  TransactionListParams,
} from '@/features/monetization/transactions/types'
import { useTransactions } from '@/features/monetization/transactions/hooks'
import { TransactionsFilters } from '@/features/monetization/transactions/components/transactions-filters'
import { TransactionsTable } from '@/features/monetization/transactions/components/transactions-table'
import { TransactionDetailsDialog } from '@/features/monetization/transactions/components/transaction-details-dialog'
import { TransactionExportButton } from '@/features/monetization/transactions/components/transaction-export-button'

export const Route = createFileRoute('/_authenticated/monetization/transactions/')(
  {
    component: TransactionsPage,
  },
)

function TransactionsPage() {
  const [filters, setFilters] = useState<TransactionListParams>({})
  const [page, setPage] = useState(1)
  const pageSize = 10

  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const { data: transactions = [], isLoading } = useTransactions(filters)

  const handleViewDetails = (tx: Transaction) => {
    setSelectedTx(tx)
    setIsDetailsOpen(true)
  }

  return (
    <div className="space-y-6">
      <header className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">
            Transactions
          </h1>
          <p className="text-sm text-slate-400">
            View and analyze subscription and pay-per-view payments.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <TransactionExportButton transactions={transactions} />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setFilters({})
              setPage(1)
            }}
          >
            Reset filters
          </Button>
        </div>
      </header>

      <TransactionsFilters
        value={filters}
        onChange={(next) => {
          setFilters(next)
          setPage(1)
        }}
      />

      <TransactionsTable
        transactions={transactions}
        isLoading={isLoading}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onViewDetails={handleViewDetails}
      />

      <TransactionDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        transaction={selectedTx}
      />
    </div>
  )
}

