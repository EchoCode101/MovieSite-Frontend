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
import { Eye, Trash2 } from 'lucide-react'
import type { Comment } from '../types'

interface CommentsTableProps {
  comments: Comment[]
  isLoading: boolean
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onViewComment: (comment: Comment) => void
  onDeleteComment: (comment: Comment) => void
  selectedIds: string[]
  onToggleSelect: (id: string) => void
  onToggleSelectAll: () => void
}

function getTargetDisplayName(comment: Comment): string {
  const target = comment.target || comment.video
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

export function CommentsTable({
  comments,
  isLoading,
  page,
  totalPages,
  onPageChange,
  onViewComment,
  onDeleteComment,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
}: CommentsTableProps) {
  const allSelected = comments.length > 0 && selectedIds.length === comments.length

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading comments...
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        No comments found
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
            {comments.map((comment) => {
              const commentId = comment.id || comment._id || ''
              const isSelected = selectedIds.includes(commentId)
              const author = comment.member
              const authorName = author
                ? `${author.first_name || ''} ${author.last_name || ''}`.trim() ||
                  author.username ||
                  'Unknown'
                : 'Unknown'

              return (
                <TableRow
                  key={commentId}
                  className="border-slate-800 hover:bg-slate-800/50"
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => onToggleSelect(commentId)}
                      aria-label={`Select comment ${commentId}`}
                    />
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate text-sm">{comment.content}</p>
                  </TableCell>
                  <TableCell className="text-slate-300">{authorName}</TableCell>
                  <TableCell className="text-slate-400">
                    {getTargetDisplayName(comment)}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-blue-500/20 text-blue-300">
                      {getTargetTypeLabel(comment.target_type)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {comment.likesCount || 0}
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {comment.dislikesCount || 0}
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewComment(comment)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteComment(comment)}
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

