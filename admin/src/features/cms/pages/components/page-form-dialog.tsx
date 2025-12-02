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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { slugSchema } from "@/features/cms/types";
import type { Page } from "../types";
import { useCreatePage, useUpdatePage } from "../hooks";

const pageSchema = z.object({
  slug: slugSchema,
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be 255 characters or less"),
  content: z.string().min(1, "Content is required"),
  is_active: z.boolean().optional(),
});

type PageFormValues = z.infer<typeof pageSchema>;

interface PageFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  page?: Page | null;
}

export function PageFormDialog({
  open,
  onOpenChange,
  mode,
  page,
}: PageFormDialogProps) {
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const slugId = `${baseId}-slug`;
  const contentId = `${baseId}-content`;
  const isActiveId = `${baseId}-is-active`;

  const isEdit = mode === "edit" && Boolean(page);

  const createMutation = useCreatePage();
  const updateMutation = useUpdatePage();

  const form = useForm<PageFormValues>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      slug: page?.slug ?? "",
      title: page?.title ?? "",
      content: page?.content ?? "",
      is_active: page?.is_active ?? true,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        slug: page?.slug ?? "",
        title: page?.title ?? "",
        content: page?.content ?? "",
        is_active: page?.is_active ?? true,
      });
    }
  }, [open, page, form]);

  const watchTitle = form.watch("title");

  useEffect(() => {
    if (!isEdit && watchTitle && !page?.slug) {
      const autoSlug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      form.setValue("slug", autoSlug);
    }
  }, [watchTitle, isEdit, page, form]);

  const onSubmit = (values: PageFormValues) => {
    const payload = {
      slug: values.slug,
      title: values.title,
      content: values.content,
      is_active: values.is_active ?? true,
    };

    if (isEdit && page) {
      updateMutation.mutate(
        {
          slug: page.slug,
          payload: {
            title: payload.title,
            content: payload.content,
            is_active: payload.is_active,
          },
        },
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit page" : "Create page"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update title, slug, and content for this CMS page."
              : "Create a new CMS page with slugged URL and rich content."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr,1.5fr]">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor={titleId}>Title *</Label>
                <Input
                  id={titleId}
                  {...form.register("title")}
                  placeholder="About Us"
                  disabled={isLoading}
                />
                {form.formState.errors.title && (
                  <p className="text-sm text-red-400">
                    {form.formState.errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={slugId}>Slug *</Label>
                <Input
                  id={slugId}
                  {...form.register("slug")}
                  placeholder="about-us"
                  disabled={isLoading || isEdit}
                />
                {form.formState.errors.slug && (
                  <p className="text-sm text-red-400">
                    {form.formState.errors.slug.message}
                  </p>
                )}
                <p className="text-xs text-slate-500">
                  This will be used in the page URL (e.g. /pages/slug).
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor={contentId}>Content (HTML) *</Label>
                <Textarea
                  id={contentId}
                  rows={10}
                  {...form.register("content")}
                  placeholder="<h1>About Us</h1><p>Content here...</p>"
                  disabled={isLoading}
                />
                {form.formState.errors.content && (
                  <p className="text-sm text-red-400">
                    {form.formState.errors.content.message}
                  </p>
                )}
                <p className="text-xs text-slate-500">
                  HTML content for now; a richer editor can be added later.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                <Switch
                  id={isActiveId}
                  checked={form.watch("is_active") ?? true}
                  onCheckedChange={(checked) =>
                    form.setValue("is_active", checked)
                  }
                  disabled={isLoading}
                />
                <div className="space-y-1">
                  <Label htmlFor={isActiveId}>Published</Label>
                  <p className="text-xs text-slate-400">
                    When enabled, this page will be visible to users.
                  </p>
                </div>
              </div>

              {page && (
                <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-300">
                  <p className="font-semibold">Meta</p>
                  <p>Slug: {page.slug}</p>
                  {page.createdAt && (
                    <p className="mt-1 text-slate-400">
                      Created: {new Date(page.createdAt).toLocaleString()}
                    </p>
                  )}
                  {page.updatedAt && (
                    <p className="text-slate-400">
                      Updated: {new Date(page.updatedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </div>
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
      </DialogContent>
    </Dialog>
  );
}
