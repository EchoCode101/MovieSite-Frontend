import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { useTvShow, useTvShowSeasons } from "@/features/content/tv-shows/hooks";
import { TvShowDetails } from "@/features/content/tv-shows/components/tv-show-details";
import { SeasonsList } from "@/features/content/tv-shows/components/seasons-list";
import { SeasonFormDialog } from "@/features/content/seasons/components/season-form-dialog";

export const Route = createFileRoute("/_authenticated/content/tv-shows/$id")({
  component: TvShowDetailsPage,
});

function TvShowDetailsPage() {
  const { id } = Route.useParams();
  const { data: tvShow, isLoading: tvShowLoading } = useTvShow(id);
  const { data: seasons, isLoading: seasonsLoading } = useTvShowSeasons(id);
  const [isSeasonFormOpen, setIsSeasonFormOpen] = useState(false);

  if (tvShowLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading TV show...
      </div>
    );
  }

  if (!tvShow) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        TV show not found
      </div>
    );
  }

  const handleCreateSeason = () => {
    setIsSeasonFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <header className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            to="/content/tv-shows"
            className="text-sm text-slate-400 hover:text-slate-200 mb-2 block"
          >
            ← Back to TV Shows
          </Link>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">
            {tvShow.title}
          </h1>
        </div>
      </header>

      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
        <TvShowDetails tvShow={tvShow} />
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
        <SeasonsList
          seasons={
            (seasons as Array<
              import("@/features/content/seasons/types").SeasonSummary
            >) || []
          }
          isLoading={seasonsLoading}
          onCreateSeason={handleCreateSeason}
        />
      </div>

      <SeasonFormDialog
        open={isSeasonFormOpen}
        onOpenChange={setIsSeasonFormOpen}
        mode="create"
        tvShowId={id}
      />
    </div>
  );
}
