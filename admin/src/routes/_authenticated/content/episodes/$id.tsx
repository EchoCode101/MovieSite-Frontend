import { createFileRoute, Link } from '@tanstack/react-router'

import { useEpisode } from '@/features/content/episodes/hooks'

export const Route = createFileRoute('/_authenticated/content/episodes/$id')({
  component: EpisodeDetailsPage,
})

function EpisodeDetailsPage() {
  const { id } = Route.useParams()
  const { data: episode, isLoading } = useEpisode(id)

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading episode...
      </div>
    )
  }

  if (!episode) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Episode not found
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header className="mb-2">
        <Link
          to="/content/episodes"
          className="text-sm text-slate-400 hover:text-slate-200 mb-2 block"
        >
          ← Back to Episodes
        </Link>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">
          {episode.title}
        </h1>
      </header>

      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-400 mb-1">Episode Number</h3>
            <p className="text-slate-200">{episode.episode_number}</p>
          </div>
          {episode.description && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-1">Description</h3>
              <p className="text-slate-300">{episode.description}</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-1">Duration</h3>
              <p className="text-slate-200">
                {episode.duration_minutes ? `${episode.duration_minutes} minutes` : '-'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-1">Access Type</h3>
              <p className="text-slate-200">{episode.access_type || 'free'}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-1">Status</h3>
              <p className="text-slate-200">{episode.status || 'draft'}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-1">Release Date</h3>
              <p className="text-slate-200">
                {episode.release_date
                  ? new Date(episode.release_date).toLocaleDateString()
                  : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
