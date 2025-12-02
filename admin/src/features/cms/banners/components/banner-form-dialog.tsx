import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { bannerDevices, bannerPositions } from "@/features/cms/types";
import type { BannerDevice, BannerPosition } from "@/features/cms/types";
import type { Banner } from "../types";
import { useCreateBanner, useUpdateBanner } from "../hooks";
import { BannerPreview } from "./banner-preview";

const bannerSchema = z.object({
  title: z.string().max(255, "Title must be 255 characters or less").optional(),
  device: z.custom<BannerDevice>().optional(),
  position: z.custom<BannerPosition>().optional(),
  target_type: z.enum(["movie", "tvshow", "episode"]),
  target_id: z.string().min(1, "Target ID is required"),
  image_url: z.string().url("Image URL must be a valid URL"),
  sort_order: z
    .number()
    .int()
    .min(0, "Sort order cannot be negative")
    .optional(),
  is_active: z.boolean().optional(),
});

type BannerFormValues = z.infer<typeof bannerSchema>;

interface BannerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  banner?: Banner | null;
}

export function BannerFormDialog({
  open,
  onOpenChange,
  mode,
  banner,
}: BannerFormDialogProps) {
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const deviceId = `${baseId}-device`;
  const positionId = `${baseId}-position`;
  const sortOrderId = `${baseId}-sort-order`;
  const targetTypeId = `${baseId}-target-type`;
  const targetId = `${baseId}-target-id`;
  const imageUrlId = `${baseId}-image-url`;
  const isActiveId = `${baseId}-is-active`;

  const isEdit = mode === "edit" && Boolean(banner);

  const createMutation = useCreateBanner();
  const updateMutation = useUpdateBanner();

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      title: banner?.title ?? "",
      device: banner?.device,
      position: banner?.position,
      target_type: banner?.target_type ?? "movie",
      target_id: banner?.target_id ?? "",
      image_url: banner?.image_url ?? "",
      sort_order: banner?.sort_order ?? 0,
      is_active: banner?.is_active ?? true,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: banner?.title ?? "",
        device: banner?.device,
        position: banner?.position,
        target_type: banner?.target_type ?? "movie",
        target_id: banner?.target_id ?? "",
        image_url: banner?.image_url ?? "",
        sort_order: banner?.sort_order ?? 0,
        is_active: banner?.is_active ?? true,
      });
    }
  }, [open, banner, form]);

  const onSubmit = (values: BannerFormValues) => {
    const payload = {
      ...values,
      title: values.title || undefined,
      sort_order: values.sort_order ?? undefined,
      is_active: values.is_active ?? true,
    };

    if (isEdit && banner) {
      const id = banner.id || banner._id || "";
      if (!id) return;
      updateMutation.mutate(
        { id, payload },
        {
          onSuccess: () => {
            onOpenChange(false);
            form.reset();
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          onOpenChange(false);
          form.reset();
        },
      });
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const previewBanner: Banner = {
    ...(banner || {}),
    ...form.getValues(),
    is_active: form.watch("is_active") ?? true,
  } as Banner;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit banner" : "Create banner"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update where and how this banner appears in the app."
              : "Configure a new promotional banner for the app."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-[2fr,1.5fr]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={titleId}>Title</Label>
              <Input
                id={titleId}
                {...form.register("title")}
                placeholder="Optional banner title"
                disabled={isLoading}
              />
              {form.formState.errors.title && (
                <p className="text-sm text-red-400">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor={deviceId}>Device</Label>
                <Select
                  value={form.watch("device") ?? ""}
                  onValueChange={(next) =>
                    form.setValue(
                      "device",
                      (next || undefined) as BannerDevice | undefined
                    )
                  }
                >
                  <SelectTrigger id={deviceId}>
                    <SelectValue placeholder="Any device" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any</SelectItem>
                    {bannerDevices.map((device) => (
                      <SelectItem key={device} value={device}>
                        {device.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={positionId}>Position</Label>
                <Select
                  value={form.watch("position") ?? ""}
                  onValueChange={(next) =>
                    form.setValue(
                      "position",
                      (next || undefined) as BannerPosition | undefined
                    )
                  }
                >
                  <SelectTrigger id={positionId}>
                    <SelectValue placeholder="Any position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any</SelectItem>
                    {bannerPositions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={sortOrderId}>Sort order</Label>
                <Input
                  id={sortOrderId}
                  type="number"
                  {...form.register("sort_order", { valueAsNumber: true })}
                  disabled={isLoading}
                />
                {form.formState.errors.sort_order && (
                  <p className="text-sm text-red-400">
                    {form.formState.errors.sort_order.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={targetTypeId}>Target type *</Label>
                <Select
                  value={form.watch("target_type")}
                  onValueChange={(next) =>
                    form.setValue(
                      "target_type",
                      next as "movie" | "tvshow" | "episode"
                    )
                  }
                >
                  <SelectTrigger id={targetTypeId}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="movie">Movie</SelectItem>
                    <SelectItem value="tvshow">TV Show</SelectItem>
                    <SelectItem value="episode">Episode</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.target_type && (
                  <p className="text-sm text-red-400">
                    {form.formState.errors.target_type.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={targetId}>Target ID *</Label>
                <Input
                  id={targetId}
                  {...form.register("target_id")}
                  placeholder="ID of the target movie/TV show/episode"
                  disabled={isLoading}
                />
                {form.formState.errors.target_id && (
                  <p className="text-sm text-red-400">
                    {form.formState.errors.target_id.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={imageUrlId}>Image URL *</Label>
              <Input
                id={imageUrlId}
                {...form.register("image_url")}
                placeholder="https://example.com/banner.jpg"
                disabled={isLoading}
              />
              {form.formState.errors.image_url && (
                <p className="text-sm text-red-400">
                  {form.formState.errors.image_url.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id={isActiveId}
                checked={form.watch("is_active") ?? true}
                onCheckedChange={(checked) =>
                  form.setValue("is_active", checked)
                }
                disabled={isLoading}
              />
              <Label htmlFor={isActiveId}>Active</Label>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? isEdit
                    ? "Updating..."
                    : "Creating..."
                  : isEdit
                    ? "Update"
                    : "Create"}
              </Button>
            </DialogFooter>
          </form>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Preview
            </p>
            <BannerPreview banner={previewBanner} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
