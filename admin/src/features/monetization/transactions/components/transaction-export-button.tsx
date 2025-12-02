import { Button } from '@/components/ui/button'
import type { Transaction } from '../types'

interface TransactionExportButtonProps {
  transactions: Transaction[]
}

function toCsv(transactions: Transaction[]): string {
  const header = [
    'id',
    'user_id',
    'type',
    'gateway',
    'status',
    'amount',
    'currency',
    'createdAt',
  ]

  const rows = transactions.map((tx) => {
    const id = tx.id || tx._id || ''
    return [
      id,
      tx.user_id,
      tx.type,
      tx.gateway,
      tx.status,
      tx.amount.toString(),
      tx.currency,
      tx.createdAt,
    ]
  })

  const lines = [header, ...rows].map((cols) =>
    cols
      .map((value) => {
        const safe = value.replace(/"/g, '""')
        return `"${safe}"`
      })
      .join(','),
  )

  return lines.join('\n')
}

export function TransactionExportButton({
  transactions,
}: TransactionExportButtonProps) {
  const handleExport = () => {
    if (!transactions.length) return
    const csv = toCsv(transactions)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'transactions.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleExport}
      disabled={!transactions.length}
    >
      Export CSV
    </Button>
  )
}


