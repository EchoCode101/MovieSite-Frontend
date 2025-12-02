import { useEffect, useMemo, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import type { CommentListParams } from '@/features/engagement/comments/types'
import { useComments } from '@/features/engagement/comments/hooks'
import { CommentsTable } from '@/features/engagement/comments/components/comments-table'
import { CommentFilters } from '@/features/engagement/comments/components/comment-filters'
import { CommentDetailsDialog } from '@/features/engagement/comments/components/comment-details-dialog'
import { DeleteCommentDialog } from '@/features/engagement/comments/components/delete-comment-dialog'
import { CommentsBulkActions } from '@/features/engagement/comments/components/comments-bulk-actions'
import { BulkDeleteCommentsDialog } from '@/features/engagement/comments/components/bulk-delete-comments-dialog'
import type { Comment } from '@/features/engagement/comments/types'

export const Route = createFileRoute('/_authenticated/engagement/comments/')({
  component: CommentsPage,
})

function CommentsPage() {
  const [page, setPage] = useState(1)
  const [filterState, setFilterState] = useState<
    Omit<CommentListParams, 'page' | 'limit' | 'sort' | 'order'>
  >({})
  const [sort, setSort] = useState('createdAt')
  const [order, setOrder] = useState<'ASC' | 'DESC'>('DESC')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [activeComment, setActiveComment] = useState<Comment | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null)
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false)

  const params: CommentListParams = useMemo(
    () => ({
      page,
      limit: 10,
      sort,
      order,
      target_type: filterState.target_type,
      target_id: filterState.target_id,
    }),
    [page, sort, order, filterState],
  )

  const { data, isLoading } = useComments(params)
  const comments = data?.comments ?? []

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
    if (selectedIds.length === comments.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(comments.map((c) => c.id || c._id || ''))
    }
  }

  const handleViewComment = (comment: Comment) => {
    setActiveComment(comment)
    setIsDetailsOpen(true)
  }

  const handleDeleteComment = (comment: Comment) => {
    setCommentToDelete(comment)
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
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">Comments</h1>
        <p className="text-sm text-slate-400">Moderate and manage user comments.</p>
      </header>

      <CommentFilters
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
        <CommentsBulkActions
          selectedIds={selectedIds}
          onClearSelection={() => setSelectedIds([])}
          onBulkDelete={handleBulkDelete}
        />
      )}

      <CommentsTable
        comments={comments}
        isLoading={isLoading}
        page={data?.currentPage ?? page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={(next) => {
          if (next < 1 || (data && next > data.totalPages)) return
          setPage(next)
        }}
        onViewComment={handleViewComment}
        onDeleteComment={handleDeleteComment}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
      />

      <CommentDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        comment={activeComment}
      />

      <DeleteCommentDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        comment={commentToDelete}
      />

      <BulkDeleteCommentsDialog
        open={isBulkDeleteOpen}
        onOpenChange={setIsBulkDeleteOpen}
        commentIds={selectedIds}
        onSuccess={() => setSelectedIds([])}
      />
    </div>
  )
}
