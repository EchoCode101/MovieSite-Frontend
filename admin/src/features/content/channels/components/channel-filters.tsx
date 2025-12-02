import { useId } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ChannelListParams } from '../types'

interface ChannelFiltersProps {
  value: ChannelListParams
  onChange: (next: ChannelListParams) => void
  onSearchChange: (search: string) => void
}

export function ChannelFilters({
  value,
  onChange,
  onSearchChange,
}: ChannelFiltersProps) {
  const searchId = useId()
  const activeId = useId()
  const featuredId = useId()

  return (
    <div className="flex flex-wrap gap-4 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
      <div className="flex-1 min-w-[200px]">
        <Label htmlFor={searchId} className="mb-2 block text-sm">
          Search
        </Label>
        <Input
          id={searchId}
          type="text"
          placeholder="Search by name..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-slate-950"
        />
      </div>

      <div className="min-w-[150px]">
        <Label htmlFor={activeId} className="mb-2 block text-sm">
          Active Status
        </Label>
        <Select
          value={
            value.is_active === undefined
              ? 'all'
              : value.is_active
                ? 'true'
                : 'false'
          }
          onValueChange={(val) =>
            onChange({
              ...value,
              is_active: val === 'all' ? undefined : val === 'true',
            })
          }
        >
          <SelectTrigger id={activeId} className="bg-slate-950">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[150px]">
        <Label htmlFor={featuredId} className="mb-2 block text-sm">
          Featured
        </Label>
        <Select
          value={
            value.is_featured === undefined
              ? 'all'
              : value.is_featured
                ? 'true'
                : 'false'
          }
          onValueChange={(val) =>
            onChange({
              ...value,
              is_featured: val === 'all' ? undefined : val === 'true',
            })
          }
        >
          <SelectTrigger id={featuredId} className="bg-slate-950">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onChange({})
            onSearchChange('')
          }}
          className="bg-slate-950"
        >
          Clear
        </Button>
      </div>
    </div>
  )
}

