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
import type { ReviewListParams, ReviewTargetType } from '../types'

interface ReviewListFilterState
  extends Omit<ReviewListParams, 'page' | 'limit' | 'sort' | 'order'> {}

interface ReviewFiltersProps {
  value: ReviewListFilterState
  onChange: (next: ReviewListFilterState) => void
  onSortChange: (sort: string, order: 'ASC' | 'DESC') => void
  currentSort?: string
  currentOrder?: 'ASC' | 'DESC'
}

export function ReviewFilters({
  value,
  onChange,
  onSortChange,
  currentSort = 'createdAt',
  currentOrder = 'DESC',
}: ReviewFiltersProps) {
  const targetTypeId = useId()
  const targetIdId = useId()
  const ratingId = useId()
  const sortId = useId()
  const orderId = useId()

  return (
    <div className="flex flex-wrap gap-4 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
      <div className="min-w-[150px]">
        <Label htmlFor={targetTypeId} className="mb-2 block text-sm">
          Target Type
        </Label>
        <Select
          value={value.target_type || 'all'}
          onValueChange={(val) =>
            onChange({
              ...value,
              target_type: val === 'all' ? undefined : (val as ReviewTargetType),
            })
          }
        >
          <SelectTrigger id={targetTypeId} className="bg-slate-950">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="movie">Movie</SelectItem>
            <SelectItem value="tvshow">TV Show</SelectItem>
            <SelectItem value="episode">Episode</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[200px]">
        <Label htmlFor={targetIdId} className="mb-2 block text-sm">
          Target ID
        </Label>
        <Input
          id={targetIdId}
          type="text"
          placeholder="Filter by target ID..."
          value={value.target_id || ''}
          onChange={(e) => onChange({ ...value, target_id: e.target.value || undefined })}
          className="bg-slate-950"
        />
      </div>

      <div className="min-w-[120px]">
        <Label htmlFor={ratingId} className="mb-2 block text-sm">
          Rating
        </Label>
        <Select
          value={value.rating ? String(value.rating) : 'all'}
          onValueChange={(val) =>
            onChange({
              ...value,
              rating: val === 'all' ? undefined : Number(val),
            })
          }
        >
          <SelectTrigger id={ratingId} className="bg-slate-950">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="1">1 Star</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[150px]">
        <Label htmlFor={sortId} className="mb-2 block text-sm">
          Sort By
        </Label>
        <Select
          value={currentSort}
          onValueChange={(val) => onSortChange(val, currentOrder)}
        >
          <SelectTrigger id={sortId} className="bg-slate-950">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Created Date</SelectItem>
            <SelectItem value="updatedAt">Updated Date</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="likes">Likes</SelectItem>
            <SelectItem value="dislikes">Dislikes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[120px]">
        <Label htmlFor={orderId} className="mb-2 block text-sm">
          Order
        </Label>
        <Select
          value={currentOrder}
          onValueChange={(val) => onSortChange(currentSort, val as 'ASC' | 'DESC')}
        >
          <SelectTrigger id={orderId} className="bg-slate-950">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DESC">Descending</SelectItem>
            <SelectItem value="ASC">Ascending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onChange({})
            onSortChange('createdAt', 'DESC')
          }}
          className="bg-slate-950"
        >
          Clear
        </Button>
      </div>
    </div>
  )
}

