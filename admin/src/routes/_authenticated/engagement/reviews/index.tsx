import { useEffect, useMemo, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import type { ReviewListParams } from '@/features/engagement/reviews/types'
import { useReviews } from '@/features/engagement/reviews/hooks'
import { ReviewsTable } from '@/features/engagement/reviews/components/reviews-table'
import { ReviewFilters } from '@/features/engagement/reviews/components/review-filters'
import { ReviewDetailsDialog } from '@/features/engagement/reviews/components/review-details-dialog'
import { DeleteReviewDialog } from '@/features/engagement/reviews/components/delete-review-dialog'
import { ReviewsBulkActions } from '@/features/engagement/reviews/components/reviews-bulk-actions'
import { BulkDeleteReviewsDialog } from '@/features/engagement/reviews/components/bulk-delete-reviews-dialog'
import type { Review } from '@/features/engagement/reviews/types'

export const Route = createFileRoute('/_authenticated/engagement/reviews/')({
  component: ReviewsPage,
})

function ReviewsPage() {
  const [page, setPage] = useState(1)
  const [filterState, setFilterState] = useState<
    Omit<ReviewListParams, 'page' | 'limit' | 'sort' | 'order'>
  >({})
  const [sort, setSort] = useState('createdAt')
  const [order, setOrder] = useState<'ASC' | 'DESC'>('DESC')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [activeReview, setActiveReview] = useState<Review | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null)
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false)

  const params: ReviewListParams = useMemo(
    () => ({
      page,
      limit: 10,
      sort,
      order,
      target_type: filterState.target_type,
      target_id: filterState.target_id,
      rating: filterState.rating,
    }),
    [page, sort, order, filterState],
  )

  const { data, isLoading } = useReviews(params)
  const reviews = data?.reviews ?? []

  // Reset selection when page changes
  useEffect(() => {
    void page
    setSelectedIds([])
  }, [page])

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const handleToggleSelectAll = () => {
    if (selectedIds.length === reviews.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(reviews.map((r) => r.id || r._id || ''))
    }
  }

  const handleViewReview = (review: Review) => {
    setActiveReview(review)
    setIsDetailsOpen(true)
  }

  const handleDeleteReview = (review: Review) => {
    setReviewToDelete(review)
    setIsDeleteOpen(true)
  }

  const handleBulkDelete = () => {
    setIsBulkDeleteOpen(true)
  }

  const handleSortChange = (newSort: string, newOrder: 'ASC' | 'DESC') => {
    setSort(newSort)
    setOrder(newOrder)
    setPage(1)
  }

  return (
    <div className="space-y-6">
      <header className="mb-2">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">Reviews</h1>
        <p className="text-sm text-slate-400">Moderate and manage user reviews.</p>
      </header>

      <ReviewFilters
        value={filterState}
        onChange={(next) => {
          setFilterState(next)
          setPage(1)
        }}
        onSortChange={handleSortChange}
        currentSort={sort}
        currentOrder={order}
      />

      {selectedIds.length > 0 && (
        <ReviewsBulkActions
          selectedIds={selectedIds}
          onClearSelection={() => setSelectedIds([])}
          onBulkDelete={handleBulkDelete}
        />
      )}

      <ReviewsTable
        reviews={reviews}
        isLoading={isLoading}
        page={data?.currentPage ?? page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={(next) => {
          if (next < 1 || (data && next > data.totalPages)) return
          setPage(next)
        }}
        onViewReview={handleViewReview}
        onDeleteReview={handleDeleteReview}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
      />

      <ReviewDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        review={activeReview}
      />

      <DeleteReviewDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        review={reviewToDelete}
      />

      <BulkDeleteReviewsDialog
        open={isBulkDeleteOpen}
        onOpenChange={setIsBulkDeleteOpen}
        reviewIds={selectedIds}
        onSuccess={() => setSelectedIds([])}
      />
    </div>
  )
}
