import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import type { Report } from '../types'

interface ReportDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  report: Report | null
}

function getStatusBadgeVariant(status: string): string {
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

function getReasonBadgeVariant(reason: string): string {
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

function getTargetTypeLabel(type: string): string {
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

export function ReportDetailsDialog({
  open,
  onOpenChange,
  report,
}: ReportDetailsDialogProps) {
  if (!report) return null

  const reporter = report.reporter
  const reporterName = reporter?.username || reporter?.email || 'Unknown'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Report Details</DialogTitle>
          <DialogDescription>
            View detailed information about this report.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400">Reporter</h3>
              <p className="text-slate-200">{reporterName}</p>
              {reporter?.email && (
                <p className="text-sm text-slate-400">{reporter.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400">Status</h3>
              <Badge className={getStatusBadgeVariant(report.status)}>
                {report.status}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400">Target Type</h3>
              <Badge className="bg-blue-500/20 text-blue-300">
                {getTargetTypeLabel(report.target_type)}
              </Badge>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400">Target ID</h3>
              <p className="text-slate-200 font-mono text-sm">{report.target_id}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-400">Reason</h3>
            <Badge className={getReasonBadgeVariant(report.reason)}>
              {report.reason}
            </Badge>
          </div>

          {report.description && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400">Description</h3>
              <p className="text-slate-200 whitespace-pre-wrap">{report.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400">Created</h3>
              <p className="text-slate-200">
                {new Date(report.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400">Last Updated</h3>
              <p className="text-slate-200">
                {new Date(report.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

