import type { TvShowDetail } from "../types";

interface TvShowDetailsProps {
  tvShow: TvShowDetail;
}

export function TvShowDetails({ tvShow }: TvShowDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-50">{tvShow.title}</h2>
        {tvShow.slug && (
          <p className="text-sm text-slate-400 mt-1">Slug: {tvShow.slug}</p>
        )}
      </div>

      {tvShow.description && (
        <div>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">
            Description
          </h3>
          <p className="text-slate-300">{tvShow.description}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-1">
            Language
          </h3>
          <p className="text-slate-200">{tvShow.language || "-"}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-1">
            Release Year
          </h3>
          <p className="text-slate-200">{tvShow.release_year || "-"}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-1">
            IMDB Rating
          </h3>
          <p className="text-slate-200">{tvShow.imdb_rating || "-"}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-1">
            Content Rating
          </h3>
          <p className="text-slate-200">{tvShow.content_rating || "-"}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-1">
            Access Type
          </h3>
          <p className="text-slate-200">{tvShow.access_type || "free"}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-1">Status</h3>
          <p className="text-slate-200">{tvShow.status || "draft"}</p>
        </div>
      </div>

      {tvShow.genres && tvShow.genres.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-2">Genres</h3>
          <div className="flex flex-wrap gap-2">
            {tvShow.genres.map((genre) => (
              <span
                key={genre}
                className="inline-flex rounded-full px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-300"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
