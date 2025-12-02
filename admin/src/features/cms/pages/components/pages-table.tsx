import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'

import type { Page } from '../types'

interface PagesTableProps {
  pages: Page[]
  isLoading: boolean
  onEdit: (page: Page) => void
  onDelete: (page: Page) => void
}

export function PagesTable({
  pages,
  isLoading,
  onEdit,
  onDelete,
}: PagesTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading pages...
      </div>
    )
  }

  if (!pages.length) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        No pages found.
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-800 hover:bg-slate-800/50">
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages.map((page) => (
            <TableRow
              key={page._id || page.slug}
              className="border-slate-800 hover:bg-slate-800/50"
            >
              <TableCell className="font-medium">
                {page.title}
              </TableCell>
              <TableCell className="font-mono text-xs text-slate-300">
                {page.slug}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    page.is_active
                      ? 'border-emerald-500/60 text-emerald-300'
                      : 'border-slate-600 text-slate-300'
                  }
                >
                  {page.is_active ? 'Published' : 'Draft'}
                </Badge>
              </TableCell>
              <TableCell className="text-slate-300">
                {page.updatedAt
                  ? new Date(page.updatedAt).toLocaleDateString()
                  : '—'}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onEdit(page)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                    onClick={() => onDelete(page)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


