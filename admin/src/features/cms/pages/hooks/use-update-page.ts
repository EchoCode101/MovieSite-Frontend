import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import { updatePage } from '../api/pages-api'
import type { UpdatePagePayload } from '../types'

interface UpdatePageVariables {
  slug: string
  payload: UpdatePagePayload
}

export function useUpdatePage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ slug, payload }: UpdatePageVariables) =>
      updatePage(slug, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pages.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.pages.detail(variables.slug),
      })
      toast.success('Page updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update page', error.message)
    },
  })
}


