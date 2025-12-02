import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { getSettingsByGroup } from '../api/settings-api'
import type { SettingListResponse } from '../types'
import type { SettingGroup } from '@/features/cms/types'

export function useSettingsByGroup(group: SettingGroup) {
  return useQuery<SettingListResponse>({
    queryKey: queryKeys.settings.byGroup(group),
    queryFn: () => getSettingsByGroup(group),
    enabled: Boolean(group),
    staleTime: 1000 * 60 * 5,
  })
}


