import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type {
  CreateOrUpdateSettingPayload,
  Setting,
  SettingListResponse,
  UpdateSettingPayload,
} from '../types'
import type { SettingGroup } from '@/features/cms/types'

const SETTINGS_BASE_PATH = '/settings'

export async function getAllSettings(): Promise<SettingListResponse> {
  try {
    const response = (await apiClient.get<ApiResponse<SettingListResponse>>(
      SETTINGS_BASE_PATH,
    )) as unknown as ApiResponse<SettingListResponse>

    return extractData(response)
  } catch (error) {
    logger.error('getAllSettings failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('settings'))
  }
}

export async function getSettingsByGroup(
  group: SettingGroup,
): Promise<SettingListResponse> {
  try {
    const response = (await apiClient.get<ApiResponse<SettingListResponse>>(
      `${SETTINGS_BASE_PATH}/group/${group}`,
    )) as unknown as ApiResponse<SettingListResponse>

    return extractData(response)
  } catch (error) {
    logger.error('getSettingsByGroup failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('settings'))
  }
}

export async function getSettingByKey(key: string): Promise<Setting> {
  try {
    const response = (await apiClient.get<ApiResponse<Setting>>(
      `${SETTINGS_BASE_PATH}/${key}`,
    )) as unknown as ApiResponse<Setting>

    return extractData(response)
  } catch (error) {
    logger.error('getSettingByKey failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('setting'))
  }
}

export async function createOrUpdateSetting(
  payload: CreateOrUpdateSettingPayload,
): Promise<Setting> {
  try {
    const response = (await apiClient.post<ApiResponse<Setting>>(
      SETTINGS_BASE_PATH,
      payload,
    )) as unknown as ApiResponse<Setting>

    return extractData(response)
  } catch (error) {
    logger.error('createOrUpdateSetting failed', error)
    throw new Error(API_ERRORS.UPDATE_FAILED('setting'))
  }
}

export async function updateSetting(
  key: string,
  payload: UpdateSettingPayload,
): Promise<Setting> {
  try {
    const response = (await apiClient.put<ApiResponse<Setting>>(
      `${SETTINGS_BASE_PATH}/${key}`,
      payload,
    )) as unknown as ApiResponse<Setting>

    return extractData(response)
  } catch (error) {
    logger.error('updateSetting failed', error)
    throw new Error(API_ERRORS.UPDATE_FAILED('setting'))
  }
}

export async function deleteSetting(key: string): Promise<void> {
  try {
    await apiClient.delete<ApiResponse<null>>(
      `${SETTINGS_BASE_PATH}/${key}`,
    )
  } catch (error) {
    logger.error('deleteSetting failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('setting'))
  }
}


