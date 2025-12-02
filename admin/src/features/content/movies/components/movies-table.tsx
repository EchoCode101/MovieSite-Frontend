import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { MovieSummary } from '../types'

interface MoviesTableProps {
  movies: MovieSummary[]
  isLoading: boolean
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onSelectMovie: (id: string) => void
  selectedIds: string[]
  onToggleSelect: (id: string) => void
  onToggleSelectAll: () => void
}

export function MoviesTable({
  movies,
  isLoading,
  page,
  totalPages,
  onPageChange,
  onSelectMovie,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
}: MoviesTableProps) {
  const allSelected = movies.length > 0 && selectedIds.length === movies.length

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading movies...
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        No movies found
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
              <TableHead>Title</TableHead>
              <TableHead>Release Date</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Access Type</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Trending</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movies.map((movie) => {
              const movieId = movie.id || movie._id || ''
              const isSelected = selectedIds.includes(movieId)
              return (
                <TableRow
                  key={movieId}
                  className="border-slate-800 hover:bg-slate-800/50 cursor-pointer"
                  onClick={() => onSelectMovie(movieId)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => onToggleSelect(movieId)}
                      aria-label={`Select ${movie.title}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{movie.title}</TableCell>
                  <TableCell className="text-slate-400">
                    {movie.release_date
                      ? new Date(movie.release_date).toLocaleDateString()
                      : '-'}
                  </TableCell>
                  <TableCell>{movie.language || '-'}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        movie.access_type === 'free'
                          ? 'bg-green-500/20 text-green-300'
                          : movie.access_type === 'subscription'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-purple-500/20 text-purple-300'
                      }`}
                    >
                      {movie.access_type || 'free'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {movie.is_featured ? (
                      <span className="inline-flex rounded-full px-2 py-1 text-xs font-medium bg-yellow-500/20 text-yellow-300">
                        Yes
                      </span>
                    ) : (
                      <span className="text-slate-400">No</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {movie.is_trending ? (
                      <span className="inline-flex rounded-full px-2 py-1 text-xs font-medium bg-orange-500/20 text-orange-300">
                        Yes
                      </span>
                    ) : (
                      <span className="text-slate-400">No</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        movie.status === 'published'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-gray-500/20 text-gray-300'
                      }`}
                    >
                      {movie.status || 'draft'}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {new Date(movie.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-400">
          Page {page} of {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1 text-sm text-slate-100 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1 text-sm text-slate-100 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

