import { useMemo } from "react";

import type { SettingGroup } from "@/features/cms/types";

import { useSettingsByGroup } from "../../hooks";
import type { Setting } from "../../types";
import { CommonSettingsForm } from "./common-settings-form";

const GROUP: SettingGroup = "seo";

export function SeoSettingsPanel() {
  const { data: settings = [], isLoading, isError } = useSettingsByGroup(GROUP);

  const byKey = useMemo(() => {
    const map: Record<string, Setting> = {};
    for (const setting of settings) {
      map[setting.key] = setting;
    }
    return map;
  }, [settings]);

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-400">
        Loading SEO settings...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-900/60 bg-red-950/40 p-6 text-sm text-red-200">
        Failed to load SEO settings. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CommonSettingsForm
        group={GROUP}
        settingKey="seo_default_title"
        label="Default meta title"
        description="Fallback meta title for pages without custom SEO."
        placeholder="Vidstie – Watch movies & TV shows online"
        setting={byKey.seo_default_title}
      />

      <CommonSettingsForm
        group={GROUP}
        settingKey="seo_default_description"
        label="Default meta description"
        description="Fallback meta description used for search engines and social shares."
        type="textarea"
        placeholder="Stream your favorite movies and TV shows with Vidstie."
        setting={byKey.seo_default_description}
      />
    </div>
  );
}
