import { createFileRoute } from '@tanstack/react-router'

import { useMovie } from '@/features/content/movies/hooks'
import { MovieDetails } from '@/features/content/movies/components/movie-details'

export const Route = createFileRoute('/_authenticated/content/movies/$id')({
  component: MovieDetailPage,
})

function MovieDetailPage() {
  const { id } = Route.useParams()
  const { data: movie, isLoading } = useMovie(id)

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading movie...
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Movie not found
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header className="mb-2">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">
          Movie Details
        </h1>
      </header>
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
        <MovieDetails movie={movie} />
      </div>
    </div>
  )
}
