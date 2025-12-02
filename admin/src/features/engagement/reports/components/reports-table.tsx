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
import { Eye, CheckCircle2 } from 'lucide-react'
import type { Report, ReportStatus, ReportReason, ReportTargetType } from '../types'

interface ReportsTableProps {
  reports: Report[]
  isLoading: boolean
  onViewReport: (report: Report) => void
  onResolveReport: (report: Report) => void
}

function getStatusBadgeVariant(status: ReportStatus): string {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-500/20 text-yellow-300'
    case 'Reviewed':
      return 'bg-blue-500/20 text-blue-300'
    case 'Resolved':
      return 'bg-green-500/20 text-green-300'
    case 'Dismissed':
      return 'bg-gray-500/20 text-gray-300'
    default:
      return 'bg-gray-500/20 text-gray-300'
  }
}

function getReasonBadgeVariant(reason: ReportReason): string {
  switch (reason) {
    case 'Spam':
      return 'bg-red-500/20 text-red-300'
    case 'Harassment':
      return 'bg-orange-500/20 text-orange-300'
    case 'Inappropriate Content':
      return 'bg-purple-500/20 text-purple-300'
    case 'Hate Speech':
      return 'bg-red-600/20 text-red-400'
    case 'Other':
      return 'bg-gray-500/20 text-gray-300'
    default:
      return 'bg-gray-500/20 text-gray-300'
  }
}

function getTargetTypeLabel(type: ReportTargetType): string {
  switch (type) {
    case 'video':
      return 'Video'
    case 'comment':
      return 'Comment'
    case 'review':
      return 'Review'
    case 'comment_reply':
      return 'Reply'
    default:
      return 'Unknown'
  }
}

export function ReportsTable({
  reports,
  isLoading,
  onViewReport,
  onResolveReport,
}: ReportsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading reports...
      </div>
    )
  }

  if (reports.length === 0) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        No reports found
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-800 hover:bg-slate-800/50">
            <TableHead>Reporter</TableHead>
            <TableHead>Target Type</TableHead>
            <TableHead>Target ID</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => {
            const reportId = report.id || report._id || ''
            const reporter = report.reporter
            const reporterName = reporter?.username || reporter?.email || 'Unknown'

            return (
              <TableRow
                key={reportId}
                className="border-slate-800 hover:bg-slate-800/50"
              >
                <TableCell className="text-slate-300">{reporterName}</TableCell>
                <TableCell>
                  <Badge className="bg-blue-500/20 text-blue-300">
                    {getTargetTypeLabel(report.target_type)}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-400 font-mono text-xs">
                  {report.target_id.substring(0, 8)}...
                </TableCell>
                <TableCell>
                  <Badge className={getReasonBadgeVariant(report.reason)}>
                    {report.reason}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeVariant(report.status)}>
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs">
                  <p className="truncate text-sm text-slate-400">
                    {report.description || '-'}
                  </p>
                </TableCell>
                <TableCell className="text-slate-400">
                  {new Date(report.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewReport(report)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {report.status === 'Pending' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onResolveReport(report)}
                        className="h-8 w-8 p-0 text-green-400 hover:text-green-300"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    )}
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

