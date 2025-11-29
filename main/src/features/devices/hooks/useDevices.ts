import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getDevices, registerDevice, removeDevice, checkDeviceLimit } from '../api/devices'
import type { RegisterDeviceData, Device } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from 'sonner'

/**
 * Hook to fetch user's devices
 * 
 * @returns Query hook for devices
 */
export const useDevices = () => {
  return useQuery({
    queryKey: queryKeys.devices.list(),
    queryFn: getDevices,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Hook to register/update device
 * 
 * @returns Mutation hook for device registration
 */
export const useRegisterDevice = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RegisterDeviceData) => registerDevice(data),
    onMutate: async (newDevice) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.devices.all })

      // Snapshot previous value
      const previousDevices = queryClient.getQueryData<Device[]>(queryKeys.devices.list())

      // Optimistically update cache
      if (previousDevices) {
        const optimisticDevice: Device = {
          id: `temp-${Date.now()}`,
          device_id: newDevice.device_id,
          device_type: newDevice.device_type,
          device_name: newDevice.device_name,
          is_active: true,
          last_used_at: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        queryClient.setQueryData<Device[]>(queryKeys.devices.list(), [...previousDevices, optimisticDevice])
      }

      return { previousDevices }
    },
    onSuccess: (newDevice) => {
      // Update cache with server response
      queryClient.setQueryData<Device[]>(queryKeys.devices.list(), (old) => {
        if (!old) return [newDevice]
        return old.map((d) => (d.id.startsWith('temp-') ? newDevice : d))
      })
      // Invalidate for consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.devices.all, refetchType: 'none' })
      toast.success('Device registered successfully!')
    },
    onError: (error, _, context) => {
      // Rollback on error
      if (context?.previousDevices) {
        queryClient.setQueryData(queryKeys.devices.list(), context.previousDevices)
      }
      toast.error(error.message || 'Failed to register device')
    },
  })
}

/**
 * Hook to remove device
 * 
 * @returns Mutation hook for device removal
 */
export const useRemoveDevice = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => removeDevice(id),
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.devices.all })

      // Snapshot previous value
      const previousDevices = queryClient.getQueryData<Device[]>(queryKeys.devices.list())

      // Optimistically update cache
      if (previousDevices) {
        queryClient.setQueryData<Device[]>(queryKeys.devices.list(), (old) => {
          if (!old) return old
          return old.filter((d) => d.id !== id)
        })
      }

      return { previousDevices }
    },
    onSuccess: () => {
      // Invalidate for consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.devices.all, refetchType: 'none' })
      toast.success('Device removed successfully!')
    },
    onError: (error, _, context) => {
      // Rollback on error
      if (context?.previousDevices) {
        queryClient.setQueryData(queryKeys.devices.list(), context.previousDevices)
      }
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove device'
      toast.error(errorMessage)
    },
  })
}

/**
 * Hook to check device limit
 * 
 * @returns Query hook for device limit check
 */
export const useDeviceLimit = () => {
  return useQuery({
    queryKey: queryKeys.devices.limit(),
    queryFn: checkDeviceLimit,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

