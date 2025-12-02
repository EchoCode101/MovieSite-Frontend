import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import { deleteSetting } from '../api/settings-api'
import type { SettingGroup } from '@/features/cms/types'

interface DeleteSettingVariables {
  key: string
  group?: SettingGroup
}

export function useDeleteSetting() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ key }: DeleteSettingVariables) => deleteSetting(key),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.settings.all })
      if (variables.group) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.settings.byGroup(variables.group),
        })
      }
      queryClient.invalidateQueries({
        queryKey: queryKeys.settings.byKey(variables.key),
      })
      toast.success('Setting deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete setting', error.message)
    },
  })
}


