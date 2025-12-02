import type { SettingGroup } from '@/features/cms/types'

export interface Setting {
  id?: string
  _id?: string
  key: string
  value: unknown
  group: SettingGroup
  createdAt?: string
  updatedAt?: string
}

export type SettingListResponse = Setting[]

export interface CreateOrUpdateSettingPayload {
  key: string
  value: unknown
  group: SettingGroup
}

export interface UpdateSettingPayload {
  value?: unknown
  group?: SettingGroup
}


