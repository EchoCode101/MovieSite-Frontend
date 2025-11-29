import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { Device, RegisterDeviceData, DeviceLimitCheck } from '../types'

/**
 * Get user's devices
 * 
 * @returns Promise resolving to devices array
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Device[]
 * }
 */
export const getDevices = async (): Promise<Device[]> => {
  try {
    // Interceptor returns response.data, so 'data' here is already the ApiResponse
    const data = await apiClient.get<ApiResponse<Device[]>>('/devices')

    // Check if data is undefined or null
    if (!data) {
      throw new Error('Invalid response: response data is undefined')
    }

    // Check if response is already unwrapped (has devices directly) - shouldn't happen but handle it
    if (Array.isArray(data) && !('success' in data)) {
      // Response is already unwrapped - return directly
      return data
    }

    // Expect ApiResponse format: { success, message, data }
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch devices')
    }
    // Validate shape
    if (!data.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (!Array.isArray(data.data)) {
      throw new Error('Invalid response: data is not an array')
    }
    return data.data
  } catch (err) {
    logger.error('Error fetching devices', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Register or update device
 * 
 * @param data - Device registration data
 * @returns Promise resolving to registered device
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Device
 * }
 */
export const registerDevice = async (data: RegisterDeviceData): Promise<Device> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.post<ApiResponse<Device>>('/devices', data) as unknown as ApiResponse<Device>
    if (!response) {
      throw new Error('Invalid response: response is undefined')
    }
    if (!response.success) {
      throw new Error(response.message || 'Failed to register device')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Remove device
 * 
 * @param id - Device ID
 * @returns Promise resolving when removal is complete
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string
 * }
 */
export const removeDevice = async (id: string): Promise<void> => {
  try {
    // Interceptor returns response.data, so 'data' here is already the ApiResponse
    const data = await apiClient.delete<ApiResponse<null>>(`/devices/${id}`)

    // Check if data is undefined or null
    if (!data) {
      throw new Error('Invalid response: response data is undefined')
    }

    // Expect ApiResponse format: { success, message }
    if (!data.success) {
      throw new Error(data.message || 'Failed to remove device')
    }
    // For delete operations, we don't need to check data.data since it's null
  } catch (err) {
    logger.error('Error removing device', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Check device limit
 * 
 * @returns Promise resolving to device limit check
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: DeviceLimitCheck
 * }
 */
export const checkDeviceLimit = async (): Promise<DeviceLimitCheck> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<DeviceLimitCheck>>('/devices/check-limit') as unknown as ApiResponse<DeviceLimitCheck>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to check device limit')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (typeof response.data.canAddDevice !== 'boolean') {
      throw new Error('Invalid response: canAddDevice must be boolean')
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

