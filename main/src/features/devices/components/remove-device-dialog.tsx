import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useRemoveDevice } from '../hooks/useDevices'
import type { Device } from '../types'
import { Loader2 } from 'lucide-react'

interface RemoveDeviceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  device: Device
  onSuccess?: () => void
}

/**
 * Dialog component for confirming device removal
 */
export function RemoveDeviceDialog({
  open,
  onOpenChange,
  device,
  onSuccess,
}: RemoveDeviceDialogProps) {
  const removeDevice = useRemoveDevice()

  const handleRemove = async () => {
    try {
      await removeDevice.mutateAsync(device.id)
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      // Error is handled by the hook's toast
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Device</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove <strong>{device.device_name}</strong> from your
            devices?
            <br />
            <br />
            This device will be logged out and you'll need to register it again to use it. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={removeDevice.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRemove}
            disabled={removeDevice.isPending}
            className="bg-destructive hover:bg-destructive/90"
          >
            {removeDevice.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Remove Device
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

