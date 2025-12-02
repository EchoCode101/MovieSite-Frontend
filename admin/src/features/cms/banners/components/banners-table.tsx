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

import type { Banner } from '../types'

interface BannersTableProps {
  banners: Banner[]
  isLoading: boolean
  onEdit: (banner: Banner) => void
  onDelete: (banner: Banner) => void
}

export function BannersTable({
  banners,
  isLoading,
  onEdit,
  onDelete,
}: BannersTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading banners...
      </div>
    )
  }

  if (!banners.length) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        No banners found.
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-800 hover:bg-slate-800/50">
            <TableHead>Title</TableHead>
            <TableHead>Device</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Target</TableHead>
            <TableHead>Sort</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {banners.map((banner) => {
            const id = banner.id || banner._id || ''
            return (
              <TableRow
                key={id}
                className="border-slate-800 hover:bg-slate-800/50"
              >
                <TableCell className="font-medium">
                  {banner.title || 'Untitled banner'}
                </TableCell>
                <TableCell className="text-slate-300">
                  {banner.device || 'Any'}
                </TableCell>
                <TableCell className="text-slate-300">
                  {banner.position || 'Any'}
                </TableCell>
                <TableCell className="text-slate-300">
                  {banner.target_type}:{' '}
                  <span className="font-mono text-xs">{banner.target_id}</span>
                </TableCell>
                <TableCell className="text-slate-300">
                  {banner.sort_order ?? '—'}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      banner.is_active
                        ? 'border-emerald-500/60 text-emerald-300'
                        : 'border-slate-600 text-slate-300'
                    }
                  >
                    {banner.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onEdit(banner)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                      onClick={() => onDelete(banner)}
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
  )
}


