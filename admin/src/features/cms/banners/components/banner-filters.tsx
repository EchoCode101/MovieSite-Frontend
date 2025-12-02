import { useId } from 'react'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

import { bannerDevices, bannerPositions } from '@/features/cms/types'
import type { BannerDevice, BannerPosition } from '@/features/cms/types'
import type { BannerListParams } from '../types'

interface BannerFiltersProps {
  value: BannerListParams
  onChange: (next: BannerListParams) => void
}

export function BannerFilters({ value, onChange }: BannerFiltersProps) {
  const baseId = useId()
  const deviceId = `${baseId}-device`
  const positionId = `${baseId}-position`
  const activeId = `${baseId}-active`

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center gap-2">
        <Label htmlFor={deviceId} className="text-slate-300">
          Device
        </Label>
        <Select
          value={value.device ?? ''}
          onValueChange={(next) =>
            onChange({
              ...value,
              device: (next || undefined) as BannerDevice | undefined,
            })
          }
        >
          <SelectTrigger id={deviceId} className="min-w-[140px]">
            <SelectValue placeholder="All devices" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All devices</SelectItem>
            {bannerDevices.map((device) => (
              <SelectItem key={device} value={device}>
                {device.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor={positionId} className="text-slate-300">
          Position
        </Label>
        <Select
          value={value.position ?? ''}
          onValueChange={(next) =>
            onChange({
              ...value,
              position: (next || undefined) as BannerPosition | undefined,
            })
          }
        >
          <SelectTrigger id={positionId} className="min-w-[160px]">
            <SelectValue placeholder="All positions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All positions</SelectItem>
            {bannerPositions.map((position) => (
              <SelectItem key={position} value={position}>
                {position}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id={activeId}
          checked={value.is_active ?? false}
          onCheckedChange={(checked) =>
            onChange({
              ...value,
              is_active: checked ? true : undefined,
            })
          }
        />
        <Label htmlFor={activeId} className="text-slate-300">
          Active only
        </Label>
      </div>
    </div>
  )
}


