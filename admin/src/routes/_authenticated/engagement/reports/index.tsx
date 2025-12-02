import { useMemo, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import type { ReportListParams } from '@/features/engagement/reports/types'
import { useReports } from '@/features/engagement/reports/hooks'
import { ReportsTable } from '@/features/engagement/reports/components/reports-table'
import { ReportFilters } from '@/features/engagement/reports/components/report-filters'
import { ReportDetailsDialog } from '@/features/engagement/reports/components/report-details-dialog'
import { ResolveReportDialog } from '@/features/engagement/reports/components/resolve-report-dialog'
import type { Report } from '@/features/engagement/reports/types'

export const Route = createFileRoute('/_authenticated/engagement/reports/')({
  component: ReportsPage,
})

function ReportsPage() {
  const [filterState, setFilterState] = useState<ReportListParams>({})
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [activeReport, setActiveReport] = useState<Report | null>(null)
  const [isResolveOpen, setIsResolveOpen] = useState(false)
  const [reportToResolve, setReportToResolve] = useState<Report | null>(null)

  const { data, isLoading } = useReports(filterState)
  const reports = data ?? []

  // Filter reports client-side if needed (since API may not support all filters)
  const filteredReports = useMemo(() => {
    let result = reports

    if (filterState.status) {
      result = result.filter((r) => r.status === filterState.status)
    }
    if (filterState.target_type) {
      result = result.filter((r) => r.target_type === filterState.target_type)
    }
    if (filterState.reason) {
      result = result.filter((r) => r.reason === filterState.reason)
    }

    return result
  }, [reports, filterState])

  const handleViewReport = (report: Report) => {
    setActiveReport(report)
    setIsDetailsOpen(true)
  }

  const handleResolveReport = (report: Report) => {
    setReportToResolve(report)
    setIsResolveOpen(true)
  }

  return (
    <div className="space-y-6">
      <header className="mb-2">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">Reports</h1>
        <p className="text-sm text-slate-400">
          Manage and resolve content reports from users.
        </p>
      </header>

      <ReportFilters value={filterState} onChange={setFilterState} />

      <div className="text-sm text-slate-400">
        Showing {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''}
      </div>

      <ReportsTable
        reports={filteredReports}
        isLoading={isLoading}
        onViewReport={handleViewReport}
        onResolveReport={handleResolveReport}
      />

      <ReportDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        report={activeReport}
      />

      <ResolveReportDialog
        open={isResolveOpen}
        onOpenChange={setIsResolveOpen}
        report={reportToResolve}
      />
    </div>
  )
}
