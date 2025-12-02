import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Eye, Trash2, Star } from 'lucide-react'
import type { Review } from '../types'

interface ReviewsTableProps {
  reviews: Review[]
  isLoading: boolean
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onViewReview: (review: Review) => void
  onDeleteReview: (review: Review) => void
  selectedIds: string[]
  onToggleSelect: (id: string) => void
  onToggleSelectAll: () => void
}

function getTargetDisplayName(review: Review): string {
  const target = review.target || review.video
  if (target?.title) return target.title
  if (target?.name) return target.name
  return 'Unknown'
}

function getTargetTypeLabel(type?: string): string {
  switch (type) {
    case 'video':
      return 'Video'
    case 'movie':
      return 'Movie'
    case 'tvshow':
      return 'TV Show'
    case 'episode':
      return 'Episode'
    default:
      return 'Unknown'
  }
}

function renderStars(rating: number) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-slate-600'
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-slate-400">({rating})</span>
    </div>
  )
}

export function ReviewsTable({
  reviews,
  isLoading,
  page,
  totalPages,
  onPageChange,
  onViewReview,
  onDeleteReview,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
}: ReviewsTableProps) {
  const allSelected = reviews.length > 0 && selectedIds.length === reviews.length

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading reviews...
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        No reviews found
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-slate-800/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={onToggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>Dislikes</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => {
              const reviewId = review.id || review._id || ''
              const isSelected = selectedIds.includes(reviewId)
              const author = review.member
              const authorName = author
                ? `${author.first_name || ''} ${author.last_name || ''}`.trim() ||
                  author.username ||
                  'Unknown'
                : 'Unknown'

              return (
                <TableRow
                  key={reviewId}
                  className="border-slate-800 hover:bg-slate-800/50"
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => onToggleSelect(reviewId)}
                      aria-label={`Select review ${reviewId}`}
                    />
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate text-sm">{review.review_content}</p>
                  </TableCell>
                  <TableCell>{renderStars(review.rating)}</TableCell>
                  <TableCell className="text-slate-300">{authorName}</TableCell>
                  <TableCell className="text-slate-400">
                    {getTargetDisplayName(review)}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-blue-500/20 text-blue-300">
                      {getTargetTypeLabel(review.target_type)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {review.likesCount || 0}
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {review.dislikesCount || 0}
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewReview(review)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteReview(review)}
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-400">
            Page {page} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

