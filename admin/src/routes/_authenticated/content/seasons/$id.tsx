import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { useSeason } from "@/features/content/seasons/hooks";
import { EpisodesList } from "@/features/content/seasons/components/episodes-list";
import { SeasonFormDialog } from "@/features/content/seasons/components/season-form-dialog";
import { DeleteSeasonDialog } from "@/features/content/seasons/components/delete-season-dialog";
import { useEpisodesBySeason } from "@/features/content/episodes/hooks";
import { EpisodeFormDialog } from "@/features/content/episodes/components/episode-form-dialog";

export const Route = createFileRoute("/_authenticated/content/seasons/$id")({
  component: SeasonDetailsPage,
});

function SeasonDetailsPage() {
  const { id } = Route.useParams();
  const { data: season, isLoading: seasonLoading } = useSeason(id);
  const { data: episodes = [], isLoading: episodesLoading } =
    useEpisodesBySeason(id);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEpisodeFormOpen, setIsEpisodeFormOpen] = useState(false);

  if (seasonLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading season...
      </div>
    );
  }

  if (!season) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Season not found
      </div>
    );
  }

  const handleCreateEpisode = () => {
    setIsEpisodeFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <header className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            to="/content/seasons"
            className="text-sm text-slate-400 hover:text-slate-200 mb-2 block"
          >
            ← Back to Seasons
          </Link>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">
            {season.name || `Season ${season.season_number}`}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsFormOpen(true)}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete
          </Button>
        </div>
      </header>

      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-400 mb-1">
              Season Number
            </h3>
            <p className="text-slate-200">{season.season_number}</p>
          </div>
          {season.description && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-1">
                Description
              </h3>
              <p className="text-slate-300">{season.description}</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-1">
                Release Date
              </h3>
              <p className="text-slate-200">
                {season.release_date
                  ? new Date(season.release_date).toLocaleDateString()
                  : "-"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-1">
                Status
              </h3>
              <p className="text-slate-200">{season.status || "draft"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
        <EpisodesList
          episodes={
            (episodes as Array<
              import("@/features/content/episodes/types").EpisodeSummary
            >) || []
          }
          isLoading={episodesLoading}
          onCreateEpisode={handleCreateEpisode}
        />
      </div>

      <SeasonFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        mode="edit"
        season={season}
      />

      <DeleteSeasonDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        season={season}
      />

      <EpisodeFormDialog
        open={isEpisodeFormOpen}
        onOpenChange={setIsEpisodeFormOpen}
        mode="create"
        seasonId={id}
        tvShowId={season.tv_show_id}
      />
    </div>
  );
}
