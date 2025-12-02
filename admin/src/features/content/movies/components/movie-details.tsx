import type { MovieDetail } from '../types'

interface MovieDetailsProps {
  movie: MovieDetail
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-50">{movie.title}</h2>
        {movie.slug && (
          <p className="text-sm text-slate-400 mt-1">Slug: {movie.slug}</p>
        )}
      </div>

      {movie.description && (
        <div>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Description</h3>
          <p className="text-slate-300">{movie.description}</p>
        </div>
      )}

      {movie.short_description && (
        <div>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Short Description</h3>
          <p className="text-slate-300">{movie.short_description}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-1">Language</h3>
          <p className="text-slate-200">{movie.language || '-'}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-1">Release Date</h3>
          <p className="text-slate-200">
            {movie.release_date
              ? new Date(movie.release_date).toLocaleDateString()
              : '-'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-1">Duration</h3>
          <p className="text-slate-200">
            {movie.duration_minutes ? `${movie.duration_minutes} minutes` : '-'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-1">IMDB Rating</h3>
          <p className="text-slate-200">{movie.imdb_rating || '-'}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-1">Content Rating</h3>
          <p className="text-slate-200">{movie.content_rating || '-'}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-1">Access Type</h3>
          <p className="text-slate-200">{movie.access_type || 'free'}</p>
        </div>
      </div>

      {movie.streams && movie.streams.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Streams</h3>
          <div className="space-y-2">
            {movie.streams.map((stream, index) => (
              <div
                key={`${stream.url}-${index}`}
                className="rounded-lg border border-slate-800 bg-slate-900/50 p-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-200 font-medium">
                      {stream.label || `Stream ${index + 1}`}
                    </p>
                    <p className="text-sm text-slate-400">{stream.type || 'N/A'}</p>
                  </div>
                  <a
                    href={stream.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:underline"
                  >
                    View URL
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {movie.is_featured && (
          <span className="inline-flex rounded-full px-2 py-1 text-xs font-medium bg-yellow-500/20 text-yellow-300">
            Featured
          </span>
        )}
        {movie.is_trending && (
          <span className="inline-flex rounded-full px-2 py-1 text-xs font-medium bg-orange-500/20 text-orange-300">
            Trending
          </span>
        )}
        {movie.is_coming_soon && (
          <span className="inline-flex rounded-full px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-300">
            Coming Soon
          </span>
        )}
        {movie.is_downloadable && (
          <span className="inline-flex rounded-full px-2 py-1 text-xs font-medium bg-green-500/20 text-green-300">
            Downloadable
          </span>
        )}
      </div>
    </div>
  )
}

