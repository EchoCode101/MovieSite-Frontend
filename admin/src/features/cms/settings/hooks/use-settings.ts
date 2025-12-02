import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { getAllSettings } from '../api/settings-api'
import type { SettingListResponse } from '../types'

export function useSettings() {
  return useQuery<SettingListResponse>({
    queryKey: queryKeys.settings.all,
    queryFn: getAllSettings,
    staleTime: 1000 * 60 * 5,
  })
}


