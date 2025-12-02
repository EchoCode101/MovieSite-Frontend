import { useId } from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ReportListParams, ReportStatus, ReportTargetType, ReportReason } from '../types'

interface ReportFiltersProps {
  value: ReportListParams
  onChange: (next: ReportListParams) => void
}

export function ReportFilters({ value, onChange }: ReportFiltersProps) {
  const statusId = useId()
  const targetTypeId = useId()
  const reasonId = useId()

  return (
    <div className="flex flex-wrap gap-4 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
      <div className="min-w-[150px]">
        <Label htmlFor={statusId} className="mb-2 block text-sm">
          Status
        </Label>
        <Select
          value={value.status || 'all'}
          onValueChange={(val) =>
            onChange({
              ...value,
              status: val === 'all' ? undefined : (val as ReportStatus),
            })
          }
        >
          <SelectTrigger id={statusId} className="bg-slate-950">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Reviewed">Reviewed</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
            <SelectItem value="Dismissed">Dismissed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[150px]">
        <Label htmlFor={targetTypeId} className="mb-2 block text-sm">
          Target Type
        </Label>
        <Select
          value={value.target_type || 'all'}
          onValueChange={(val) =>
            onChange({
              ...value,
              target_type: val === 'all' ? undefined : (val as ReportTargetType),
            })
          }
        >
          <SelectTrigger id={targetTypeId} className="bg-slate-950">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="comment">Comment</SelectItem>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="comment_reply">Reply</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[180px]">
        <Label htmlFor={reasonId} className="mb-2 block text-sm">
          Reason
        </Label>
        <Select
          value={value.reason || 'all'}
          onValueChange={(val) =>
            onChange({
              ...value,
              reason: val === 'all' ? undefined : (val as ReportReason),
            })
          }
        >
          <SelectTrigger id={reasonId} className="bg-slate-950">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reasons</SelectItem>
            <SelectItem value="Spam">Spam</SelectItem>
            <SelectItem value="Harassment">Harassment</SelectItem>
            <SelectItem value="Inappropriate Content">Inappropriate Content</SelectItem>
            <SelectItem value="Hate Speech">Hate Speech</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange({})}
          className="bg-slate-950"
        >
          Clear
        </Button>
      </div>
    </div>
  )
}

