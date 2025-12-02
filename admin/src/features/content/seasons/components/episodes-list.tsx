import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { EpisodeSummary } from "@/features/content/episodes/types";

interface Episode extends EpisodeSummary {}

interface EpisodesListProps {
  episodes: Episode[];
  isLoading: boolean;
  seasonId?: string;
  onCreateEpisode: () => void;
}

export function EpisodesList({
  episodes,
  isLoading,
  onCreateEpisode,
}: EpisodesListProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading episodes...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-200">Episodes</h3>
        <Button type="button" onClick={onCreateEpisode} size="sm">
          Add Episode
        </Button>
      </div>

      {episodes.length === 0 ? (
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
          No episodes found. Create the first episode.
        </div>
      ) : (
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-slate-800/50">
                <TableHead>Episode Number</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Access Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {episodes.map((episode) => {
                const episodeId = episode.id || episode._id || "";
                return (
                  <TableRow
                    key={episodeId}
                    className="border-slate-800 hover:bg-slate-800/50"
                  >
                    <TableCell className="font-medium">
                      {episode.episode_number}
                    </TableCell>
                    <TableCell>{episode.title}</TableCell>
                    <TableCell className="text-slate-400">
                      {episode.duration_minutes
                        ? `${episode.duration_minutes} min`
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          episode.access_type === "free"
                            ? "bg-green-500/20 text-green-300"
                            : episode.access_type === "subscription"
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-purple-500/20 text-purple-300"
                        }`}
                      >
                        {episode.access_type || "free"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          episode.status === "published"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-gray-500/20 text-gray-300"
                        }`}
                      >
                        {episode.status || "draft"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Link
                        to="/content/episodes/$id"
                        params={{ id: episodeId }}
                        className="text-blue-400 hover:underline text-sm"
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
