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
import { Pencil, Trash2 } from 'lucide-react'
import type { CastCrew } from '../types'

interface CastCrewTableProps {
  castCrew: CastCrew[]
  isLoading: boolean
  onEdit: (castCrew: CastCrew) => void
  onDelete: (castCrew: CastCrew) => void
}

const typeColors: Record<string, string> = {
  actor: 'bg-blue-500/20 text-blue-300',
  director: 'bg-purple-500/20 text-purple-300',
  writer: 'bg-green-500/20 text-green-300',
  crew: 'bg-yellow-500/20 text-yellow-300',
}

export function CastCrewTable({
  castCrew,
  isLoading,
  onEdit,
  onDelete,
}: CastCrewTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading cast/crew...
      </div>
    )
  }

  if (castCrew.length === 0) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        No cast/crew members found
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-800 hover:bg-slate-800/50">
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Bio</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {castCrew.map((member) => {
            const memberId = member.id || member._id || ''
            return (
              <TableRow
                key={memberId}
                className="border-slate-800 hover:bg-slate-800/50"
              >
                <TableCell>
                  {member.image_url ? (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded bg-slate-800 flex items-center justify-center text-slate-500">
                      No Image
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>
                  <Badge className={typeColors[member.type] || 'bg-slate-500/20 text-slate-300'}>
                    {member.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-400 max-w-xs truncate">
                  {member.bio || '-'}
                </TableCell>
                <TableCell className="text-slate-400">
                  {new Date(member.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(member)}
                      className="h-8 w-8 p-0"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(member)}
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
  )
}

