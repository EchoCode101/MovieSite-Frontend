export interface Device {
  id: string
  device_id: string
  device_type: 'web' | 'mobile' | 'tv' | 'tablet' | 'ios' | 'android'
  device_name: string
  is_active: boolean
  last_used_at: string
  createdAt?: string
  updatedAt?: string
}

export interface RegisterDeviceData {
  device_id: string
  device_type: 'web' | 'mobile' | 'tv' | 'tablet'
  device_name: string
}

export interface DeviceLimitCheck {
  canAddDevice: boolean
  currentDevices: number
  maxDevices: number
}

