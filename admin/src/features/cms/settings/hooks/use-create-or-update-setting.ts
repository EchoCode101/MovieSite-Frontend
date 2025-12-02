import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import {
  createOrUpdateSetting,
  updateSetting,
} from '../api/settings-api'
import type {
  CreateOrUpdateSettingPayload,
  UpdateSettingPayload,
} from '../types'
import type { SettingGroup } from '@/features/cms/types'

interface CreateOrUpdateVariables extends CreateOrUpdateSettingPayload { }

interface UpdateVariables {
  key: string
  payload: UpdateSettingPayload
  group?: SettingGroup
}

export function useCreateOrUpdateSetting() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: CreateOrUpdateVariables) =>
      createOrUpdateSetting(variables),
    onSuccess: (setting) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.settings.all })
      if (setting.group) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.settings.byGroup(setting.group),
        })
      }
      queryClient.invalidateQueries({
        queryKey: queryKeys.settings.byKey(setting.key),
      })
      toast.success('Setting saved successfully')
    },
    onError: (error) => {
      toast.error('Failed to save setting', error.message)
    },
  })
}

export function useUpdateSetting() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: UpdateVariables) =>
      updateSetting(variables.key, variables.payload),
    onSuccess: (_setting, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.settings.all })
      if (variables.group) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.settings.byGroup(variables.group),
        })
      }
      queryClient.invalidateQueries({
        queryKey: queryKeys.settings.byKey(variables.key),
      })
      toast.success('Setting updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update setting', error.message)
    },
  })
}


