import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateReportStatus } from '../api/reports-api'
import type { UpdateReportStatusPayload } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

/**
 * Hook to update report status
 */
export function useUpdateReportStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateReportStatusPayload }) =>
      updateReportStatus(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reports.all })
      toast.success('Report status updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update report status', error.message)
    },
  })
}

