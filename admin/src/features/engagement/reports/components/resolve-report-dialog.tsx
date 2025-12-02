import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Report, ReportStatus } from '../types'
import { useUpdateReportStatus } from '../hooks'
import { useEffect, useId, useState } from 'react'

interface ResolveReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  report: Report | null
}

export function ResolveReportDialog({
  open,
  onOpenChange,
  report,
}: ResolveReportDialogProps) {
  const baseId = useId()
  const statusId = `${baseId}-status`

  const [status, setStatus] = useState<ReportStatus>('Reviewed')
  const updateMutation = useUpdateReportStatus()

  const handleUpdate = () => {
    if (!report) return
    const reportId = report.id || report._id || ''
    updateMutation.mutate(
      { id: reportId, payload: { status } },
      {
        onSuccess: () => {
          onOpenChange(false)
          setStatus('Reviewed') // Reset for next use
        },
      },
    )
  }

  // Update status when report changes
  useEffect(() => {
    if (report) {
      setStatus(report.status === 'Pending' ? 'Reviewed' : report.status)
    }
  }, [report])

  if (!report) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Report Status</DialogTitle>
          <DialogDescription>
            Change the status of this report to track its resolution.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor={statusId}>Status</Label>
            <Select value={status} onValueChange={(val) => setStatus(val as ReportStatus)}>
              <SelectTrigger id={statusId} className="bg-slate-950">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Reviewed">Reviewed</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Dismissed">Dismissed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-slate-400">
            Current status: <span className="font-semibold">{report.status}</span>
          </p>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={updateMutation.isPending || status === report.status}
          >
            {updateMutation.isPending ? 'Updating...' : 'Update Status'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

