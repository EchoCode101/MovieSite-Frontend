import { Link } from '@tanstack/react-router'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { SeasonSummary } from '../types'

interface SeasonsTableProps {
  seasons: SeasonSummary[]
  isLoading: boolean
}

export function SeasonsTable({ seasons, isLoading }: SeasonsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading seasons...
      </div>
    )
  }

  if (seasons.length === 0) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        No seasons found
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-800 hover:bg-slate-800/50">
            <TableHead>Season Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>TV Show ID</TableHead>
            <TableHead>Release Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {seasons.map((season) => {
            const seasonId = season.id || season._id || ''
            return (
              <TableRow
                key={seasonId}
                className="border-slate-800 hover:bg-slate-800/50"
              >
                <TableCell className="font-medium">
                  {season.season_number}
                </TableCell>
                <TableCell>{season.name || `Season ${season.season_number}`}</TableCell>
                <TableCell className="text-slate-400">{season.tv_show_id}</TableCell>
                <TableCell className="text-slate-400">
                  {season.release_date
                    ? new Date(season.release_date).toLocaleDateString()
                    : '-'}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      season.status === 'published'
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-gray-500/20 text-gray-300'
                    }`}
                  >
                    {season.status || 'draft'}
                  </span>
                </TableCell>
                <TableCell>
                  <Link
                    to="/content/seasons/$id"
                    params={{ id: seasonId }}
                    className="text-blue-400 hover:underline text-sm"
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

