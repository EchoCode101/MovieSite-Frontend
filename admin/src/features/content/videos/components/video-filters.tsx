import { useId } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { VideoListParams } from '../types'

interface VideoListFilterState
  extends Omit<VideoListParams, 'page' | 'limit' | 'sort' | 'order'> {}

interface VideoFiltersProps {
  value: VideoListFilterState
  onChange: (next: VideoListFilterState) => void
  onSearchChange: (search: string) => void
}

export function VideoFilters({
  value,
  onChange,
  onSearchChange,
}: VideoFiltersProps) {
  const searchId = useId()
  const genreId = useId()
  const yearId = useId()

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

