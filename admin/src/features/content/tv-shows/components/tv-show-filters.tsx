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
import type { TvShowListParams } from '../types'

interface TvShowListFilterState
  extends Omit<TvShowListParams, 'page' | 'limit' | 'sort' | 'order'> {}

interface TvShowFiltersProps {
  value: TvShowListFilterState
  onChange: (next: TvShowListFilterState) => void
  onSearchChange: (search: string) => void
}

export function TvShowFilters({
  value,
  onChange,
  onSearchChange,
}: TvShowFiltersProps) {
  const searchId = useId()
  const genreId = useId()
  const yearId = useId()
  const accessTypeId = useId()

  return (
    <div className="flex flex-wrap gap-4 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
      <div className="flex-1 min-w-[200px]">
        <Label htmlFor={searchId} className="mb-2 block text-sm">
          Search
        </Label>
        <Input
          id={searchId}
          type="text"
          placeholder="Search by title..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-slate-950"
        />
      </div>

      <div className="min-w-[150px]">
        <Label htmlFor={genreId} className="mb-2 block text-sm">
          Genre
        </Label>
        <Input
          id={genreId}
          type="text"
          placeholder="Genre"
          value={value.genre || ''}
          onChange={(e) => onChange({ ...value, genre: e.target.value || undefined })}
          className="bg-slate-950"
        />
      </div>

      <div className="min-w-[120px]">
        <Label htmlFor={yearId} className="mb-2 block text-sm">
          Year
        </Label>
        <Input
          id={yearId}
          type="number"
          placeholder="Year"
          value={value.year || ''}
          onChange={(e) =>
            onChange({
              ...value,
              year: e.target.value ? Number.parseInt(e.target.value, 10) : undefined,
            })
          }
          className="bg-slate-950"
        />
      </div>

      <div className="min-w-[150px]">
        <Label htmlFor={accessTypeId} className="mb-2 block text-sm">
          Access Type
        </Label>
        <Select
          value={value.access_type || 'all'}
          onValueChange={(val) =>
            onChange({
              ...value,
              access_type: val === 'all' ? undefined : (val as 'free' | 'subscription' | 'pay_per_view'),
            })
          }
        >
          <SelectTrigger id={accessTypeId} className="bg-slate-950">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Access</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="subscription">Subscription</SelectItem>
            <SelectItem value="pay_per_view">Pay Per View</SelectItem>
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

