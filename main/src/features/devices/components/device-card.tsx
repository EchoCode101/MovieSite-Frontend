import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RemoveDeviceDialog } from './remove-device-dialog'
import type { Device } from '../types'
import { Monitor, Smartphone, Tv, Tablet, Trash2, Clock, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DeviceCardProps {
  device: Device
  onRemove?: () => void
  className?: string
}

/**
 * Enhanced device card component
 */
export function DeviceCard({ device, onRemove, className }: DeviceCardProps) {
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)

  const getDeviceIcon = () => {
    switch (device.device_type) {
      case 'web':
        return <Monitor className="h-5 w-5" />
      case 'mobile':
        return <Smartphone className="h-5 w-5" />
      case 'tv':
        return <Tv className="h-5 w-5" />
      case 'tablet':
        return <Tablet className="h-5 w-5" />
      default:
        return <Monitor className="h-5 w-5" />
    }
  }

  const formatLastUsed = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      return 'Today'
    } else if (diffInDays === 1) {
      return 'Yesterday'
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7)
      return `${weeks} week${weeks !== 1 ? 's' : ''} ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <>
      <Card className={cn('hover:shadow-lg transition-shadow', className)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div
                className={cn(
                  'p-3 rounded-lg',
                  device.is_active
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {getDeviceIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg truncate">{device.device_name}</h3>
                  {device.is_active && (
                    <Badge variant="default" className="shrink-0">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground capitalize mb-2">
                  {device.device_type}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Last used: {formatLastUsed(device.last_used_at)}</span>
                </div>
                {device.device_id && (
                  <p className="text-xs text-muted-foreground mt-1 font-mono truncate">
                    ID: {device.device_id}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => setIsRemoveDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove Device
          </Button>
        </CardFooter>
      </Card>

      <RemoveDeviceDialog
        open={isRemoveDialogOpen}
        onOpenChange={setIsRemoveDialogOpen}
        device={device}
        onSuccess={() => {
          setIsRemoveDialogOpen(false)
          onRemove?.()
        }}
      />
    </>
  )
}

