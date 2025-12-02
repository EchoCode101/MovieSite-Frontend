import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import { deletePage } from '../api/pages-api'

export function useDeletePage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (slug: string) => deletePage(slug),
    onSuccess: (_, slug) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pages.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.pages.detail(slug),
      })
      toast.success('Page deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete page', error.message)
    },
  })
}


