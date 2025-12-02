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
import type { CastCrewListParams, CastCrewType } from '../types'

interface CastCrewFiltersProps {
  value: CastCrewListParams
  onChange: (next: CastCrewListParams) => void
  onSearchChange: (search: string) => void
}

export function CastCrewFilters({
  value,
  onChange,
  onSearchChange,
}: CastCrewFiltersProps) {
  const searchId = useId()
  const typeId = useId()

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
        <Label htmlFor={typeId} className="mb-2 block text-sm">
          Type
        </Label>
        <Select
          value={value.type || 'all'}
          onValueChange={(val) =>
            onChange({
              ...value,
              type: val === 'all' ? undefined : (val as CastCrewType),
            })
          }
        >
          <SelectTrigger id={typeId} className="bg-slate-950">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="actor">Actor</SelectItem>
            <SelectItem value="director">Director</SelectItem>
            <SelectItem value="writer">Writer</SelectItem>
            <SelectItem value="crew">Crew</SelectItem>
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

