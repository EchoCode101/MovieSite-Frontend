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
import type { MovieListParams } from '../types'

interface MovieListFilterState
  extends Omit<MovieListParams, 'page' | 'limit' | 'sort' | 'order'> {}

interface MovieFiltersProps {
  value: MovieListFilterState
  onChange: (next: MovieListFilterState) => void
  onSearchChange: (search: string) => void
}

export function MovieFilters({
  value,
  onChange,
  onSearchChange,
}: MovieFiltersProps) {
  const searchId = useId()
  const genreId = useId()
  const yearId = useId()
  const accessTypeId = useId()
  const trendingId = useId()
  const featuredId = useId()
  const comingSoonId = useId()

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

      <div className="min-w-[120px]">
        <Label htmlFor={trendingId} className="mb-2 block text-sm">
          Trending
        </Label>
        <Select
          value={value.is_trending === undefined ? 'all' : value.is_trending ? 'true' : 'false'}
          onValueChange={(val) =>
            onChange({
              ...value,
              is_trending: val === 'all' ? undefined : val === 'true',
            })
          }
        >
          <SelectTrigger id={trendingId} className="bg-slate-950">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[120px]">
        <Label htmlFor={featuredId} className="mb-2 block text-sm">
          Featured
        </Label>
        <Select
          value={value.is_featured === undefined ? 'all' : value.is_featured ? 'true' : 'false'}
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

      <div className="min-w-[120px]">
        <Label htmlFor={comingSoonId} className="mb-2 block text-sm">
          Coming Soon
        </Label>
        <Select
          value={value.is_coming_soon === undefined ? 'all' : value.is_coming_soon ? 'true' : 'false'}
          onValueChange={(val) =>
            onChange({
              ...value,
              is_coming_soon: val === 'all' ? undefined : val === 'true',
            })
          }
        >
          <SelectTrigger id={comingSoonId} className="bg-slate-950">
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

