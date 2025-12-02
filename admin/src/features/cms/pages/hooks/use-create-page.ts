import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import { createPage } from '../api/pages-api'
import type { CreatePagePayload, Page } from '../types'

export function useCreatePage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreatePagePayload) => createPage(payload),
    onSuccess: (page: Page) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pages.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.pages.detail(page.slug),
      })
      toast.success('Page created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create page', error.message)
    },
  })
}


