import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { EpisodeDetail, EpisodeStream, EpisodeSubtitle } from "../types";
import { useCreateEpisode, useUpdateEpisode } from "../hooks";
import { useAllTvShows } from "@/features/content/tv-shows/hooks";
import { useSeasonsByTvShow } from "@/features/content/seasons/hooks";
import { StreamManager } from "@/features/content/movies/components/stream-manager";
import { SubtitleManager } from "./subtitle-manager";

const episodeSchema = z.object({
  tv_show_id: z.string().min(1, "TV show is required"),
  season_id: z.string().min(1, "Season is required"),
  episode_number: z.number().min(1, "Episode number must be at least 1"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  thumbnail_url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  duration_minutes: z.number().min(0).optional(),
  release_date: z.string().optional(),
  access_type: z.enum(["free", "subscription", "pay_per_view"]).optional(),
  plan_ids: z.string().optional(),
  pay_per_view_price: z.number().min(0).optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  status: z.enum(["draft", "published"]).optional(),
});

type EpisodeFormValues = z.infer<typeof episodeSchema>;

interface EpisodeFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  episode?: EpisodeDetail | null;
  seasonId?: string;
  tvShowId?: string;
}

export function EpisodeFormDialog({
  open,
  onOpenChange,
  mode,
  episode,
  seasonId,
  tvShowId,
}: EpisodeFormDialogProps) {
  const isEdit = mode === "edit" && episode;
  const [streams, setStreams] = useState<EpisodeStream[]>([]);
  const [subtitles, setSubtitles] = useState<EpisodeSubtitle[]>([]);
  const [enableSubtitle, setEnableSubtitle] = useState(false);
  const [selectedTvShowId, setSelectedTvShowId] = useState<string | undefined>(
    episode?.tv_show_id || tvShowId
  );

  const { data: tvShows = [] } = useAllTvShows();
  const { data: seasons = [] } = useSeasonsByTvShow(selectedTvShowId);

  const form = useForm<EpisodeFormValues>({
    resolver: zodResolver(episodeSchema),
    defaultValues: {
      tv_show_id: episode?.tv_show_id || tvShowId || "",
      season_id: episode?.season_id || seasonId || "",
      episode_number: episode?.episode_number || 1,
      title: episode?.title || "",
      description: episode?.description || "",
      thumbnail_url: episode?.thumbnail_url || "",
      duration_minutes: episode?.duration_minutes,
      release_date: episode?.release_date
        ? new Date(episode.release_date).toISOString().split("T")[0]
        : "",
      access_type: episode?.access_type || "free",
      plan_ids: episode?.plan_ids?.join(", ") || "",
      pay_per_view_price: episode?.pay_per_view_price,
      seo_title: episode?.seo_title || "",
      seo_description: episode?.seo_description || "",
      status: episode?.status || "published",
    },
  });

  useEffect(() => {
    if (open) {
      setStreams(episode?.streams || []);
      setSubtitles(episode?.subtitles || []);
      setEnableSubtitle(episode?.enable_subtitle || false);
      setSelectedTvShowId(episode?.tv_show_id || tvShowId);
      form.reset({
        tv_show_id: episode?.tv_show_id || tvShowId || "",
        season_id: episode?.season_id || seasonId || "",
        episode_number: episode?.episode_number || 1,
        title: episode?.title || "",
        description: episode?.description || "",
        thumbnail_url: episode?.thumbnail_url || "",
        duration_minutes: episode?.duration_minutes,
        release_date: episode?.release_date
          ? new Date(episode.release_date).toISOString().split("T")[0]
          : "",
        access_type: episode?.access_type || "free",
        plan_ids: episode?.plan_ids?.join(", ") || "",
        pay_per_view_price: episode?.pay_per_view_price,
        seo_title: episode?.seo_title || "",
        seo_description: episode?.seo_description || "",
        status: episode?.status || "published",
      } as EpisodeFormValues);
    }
  }, [open, episode, seasonId, tvShowId, form]);

  const createMutation = useCreateEpisode();
  const updateMutation = useUpdateEpisode();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const onSubmit = (values: EpisodeFormValues) => {
    const planIds = values.plan_ids
      ? values.plan_ids
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean)
      : undefined;

    const payload = {
      ...values,
      plan_ids: planIds,
      streams: streams.length > 0 ? streams : undefined,
      enable_subtitle: enableSubtitle,
      subtitles: enableSubtitle && subtitles.length > 0 ? subtitles : undefined,
      release_date: values.release_date
        ? new Date(values.release_date).toISOString()
        : undefined,
    };

    if (isEdit && episode) {
      const episodeId = episode.id || episode._id || "";
      const { season_id: _seasonId, episode_number: _episodeNumber, ...updatePayload } = payload;
      // Remove tv_show_id, season_id and episode_number from update payload as they cannot be changed
      updateMutation.mutate(
        { id: episodeId, payload: updatePayload },
        {
          onSuccess: () => {
            onOpenChange(false);
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          onOpenChange(false);
          form.reset();
          setStreams([]);
          setSubtitles([]);
          setEnableSubtitle(false);
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit episode" : "Create episode"}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update episode information, streams, and settings.' : 'Create a new episode with streams, subtitles, and metadata.'}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          {!isEdit && (
            <>
              <div className="space-y-2">
                <Label>TV Show *</Label>
                <Select
                  value={form.watch("tv_show_id")}
                  onValueChange={(val) => {
                    form.setValue("tv_show_id", val);
                    setSelectedTvShowId(val);
                    form.setValue("season_id", ""); // Reset season
                  }}
                  disabled={!!tvShowId || isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select TV show" />
                  </SelectTrigger>
                  <SelectContent>
                    {tvShows.map((tvShow) => {
                      const showId = tvShow.id || tvShow._id || "";
                      return (
                        <SelectItem key={showId} value={showId}>
                          {tvShow.title}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {form.formState.errors.tv_show_id ? (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.tv_show_id.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label>Season *</Label>
                <Select
                  value={form.watch("season_id")}
                  onValueChange={(val) => form.setValue("season_id", val)}
                  disabled={!selectedTvShowId || !!seasonId || isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map((season) => {
                      const sId = season.id || season._id || "";
                      return (
                        <SelectItem key={sId} value={sId}>
                          {season.name || `Season ${season.season_number}`}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {form.formState.errors.season_id ? (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.season_id.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label>Episode Number *</Label>
                <Input
                  type="number"
                  min="1"
                  disabled={isSubmitting}
                  {...form.register("episode_number", { valueAsNumber: true })}
                />
                {form.formState.errors.episode_number ? (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.episode_number.message}
                  </p>
                ) : null}
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label>Title *</Label>
            <Input disabled={isSubmitting} {...form.register("title")} />
            {form.formState.errors.title ? (
              <p className="text-sm text-red-500">
                {form.formState.errors.title.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              disabled={isSubmitting}
              {...form.register("description")}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Thumbnail URL</Label>
              <Input
                disabled={isSubmitting}
                {...form.register("thumbnail_url")}
              />
            </div>

            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Input
                type="number"
                min="0"
                disabled={isSubmitting}
                {...form.register("duration_minutes", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Release Date</Label>
            <Input
              type="date"
              disabled={isSubmitting}
              {...form.register("release_date")}
            />
          </div>

          <StreamManager streams={streams} onChange={setStreams} />

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Switch
                checked={enableSubtitle}
                onCheckedChange={setEnableSubtitle}
                disabled={isSubmitting}
              />
              <Label>Enable Subtitles</Label>
            </div>
          </div>

          {enableSubtitle && (
            <SubtitleManager subtitles={subtitles} onChange={setSubtitles} />
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Access Type</Label>
              <Select
                value={form.watch("access_type")}
                onValueChange={(val) =>
                  form.setValue(
                    "access_type",
                    val as "free" | "subscription" | "pay_per_view"
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="subscription">Subscription</SelectItem>
                  <SelectItem value="pay_per_view">Pay Per View</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {form.watch("access_type") === "pay_per_view" && (
              <div className="space-y-2">
                <Label>Pay Per View Price</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  disabled={isSubmitting}
                  {...form.register("pay_per_view_price", {
                    valueAsNumber: true,
                  })}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Plan IDs (comma-separated)</Label>
            <Input disabled={isSubmitting} {...form.register("plan_ids")} />
          </div>

          <div className="space-y-2">
            <Label>SEO Title</Label>
            <Input disabled={isSubmitting} {...form.register("seo_title")} />
          </div>

          <div className="space-y-2">
            <Label>SEO Description</Label>
            <Textarea
              disabled={isSubmitting}
              {...form.register("seo_description")}
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={form.watch("status")}
              onValueChange={(val) =>
                form.setValue("status", val as "draft" | "published")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEdit ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
