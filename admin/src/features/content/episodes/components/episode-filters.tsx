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
import type { EpisodeListParams } from '../types'
import { useAllTvShows } from '@/features/content/tv-shows/hooks'
import { useSeasonsByTvShow } from '@/features/content/seasons/hooks'
import { useState } from 'react'

interface EpisodeListFilterState
  extends Omit<EpisodeListParams, 'page' | 'limit' | 'sort' | 'order'> {}

interface EpisodeFiltersProps {
  value: EpisodeListFilterState
  onChange: (next: EpisodeListFilterState) => void
  onSearchChange: (search: string) => void
}

export function EpisodeFilters({
  value,
  onChange,
  onSearchChange,
}: EpisodeFiltersProps) {
  const searchId = useId()
  const tvShowId = useId()
  const seasonId = useId()
  const accessTypeId = useId()
  const [selectedTvShowId, setSelectedTvShowId] = useState<string | undefined>(value.tv_show_id)
  const { data: tvShows = [] } = useAllTvShows()
  const { data: seasons = [] } = useSeasonsByTvShow(selectedTvShowId)

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
        <Label htmlFor={tvShowId} className="mb-2 block text-sm">
          TV Show
        </Label>
        <Select
          value={value.tv_show_id || 'all'}
          onValueChange={(val) => {
            const tvShowIdValue = val === 'all' ? undefined : val
            setSelectedTvShowId(tvShowIdValue)
            onChange({
              ...value,
              tv_show_id: tvShowIdValue,
              season_id: undefined, // Reset season when TV show changes
            })
          }}
        >
          <SelectTrigger id={tvShowId} className="bg-slate-950">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All TV Shows</SelectItem>
            {tvShows.map((tvShow) => {
              const showId = tvShow.id || tvShow._id || ''
              return (
                <SelectItem key={showId} value={showId}>
                  {tvShow.title}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>

      {selectedTvShowId && (
        <div className="min-w-[150px]">
          <Label htmlFor={seasonId} className="mb-2 block text-sm">
            Season
          </Label>
          <Select
            value={value.season_id || 'all'}
            onValueChange={(val) =>
              onChange({
                ...value,
                season_id: val === 'all' ? undefined : val,
              })
            }
          >
            <SelectTrigger id={seasonId} className="bg-slate-950">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Seasons</SelectItem>
              {seasons.map((season) => {
                const sId = season.id || season._id || ''
                return (
                  <SelectItem key={sId} value={sId}>
                    {season.name || `Season ${season.season_number}`}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      )}

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
            setSelectedTvShowId(undefined)
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

