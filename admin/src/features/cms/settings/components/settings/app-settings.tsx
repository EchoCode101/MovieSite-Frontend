import { useMemo } from "react";

import type { SettingGroup } from "@/features/cms/types";

import { useSettingsByGroup } from "../../hooks";
import type { Setting } from "../../types";
import { CommonSettingsForm } from "./common-settings-form";

const GROUP: SettingGroup = "app";

export function AppSettingsPanel() {
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
        Loading app settings...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-900/60 bg-red-950/40 p-6 text-sm text-red-200">
        Failed to load app settings. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CommonSettingsForm
        group={GROUP}
        settingKey="app_name"
        label="Application name"
        description="This name appears in the admin panel and user-facing apps."
        placeholder="Vidstie"
        setting={byKey.app_name}
      />

      <CommonSettingsForm
        group={GROUP}
        settingKey="app_logo_url"
        label="Logo URL"
        description="URL to the logo image used across apps."
        placeholder="https://example.com/logo.png"
        setting={byKey.app_logo_url}
      />

      <CommonSettingsForm
        group={GROUP}
        settingKey="app_primary_color"
        label="Primary theme color"
        description="Primary brand color in HEX (e.g. #517cee)."
        placeholder="#517cee"
        setting={byKey.app_primary_color}
      />
    </div>
  );
}
