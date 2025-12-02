import { useMemo } from "react";

import type { SettingGroup } from "@/features/cms/types";

import { useSettingsByGroup } from "../../hooks";
import type { Setting } from "../../types";
import { CommonSettingsForm } from "./common-settings-form";

const GROUP: SettingGroup = "ads";

export function AdsSettingsPanel() {
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
        Loading ads settings...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-900/60 bg-red-950/40 p-6 text-sm text-red-200">
        Failed to load ads settings. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CommonSettingsForm
        group={GROUP}
        settingKey="ads_enabled"
        label="Enable ads"
        description="Whether to show ads in supported regions and plans."
        placeholder="false"
        setting={byKey.ads_enabled}
      />

      <CommonSettingsForm
        group={GROUP}
        settingKey="ads_provider_config"
        label="Ads provider config"
        description="JSON configuration for your ads provider (placements, keys, etc.)."
        type="textarea"
        placeholder='{"provider":"google","networkCode":"..."}'
        setting={byKey.ads_provider_config}
      />
    </div>
  );
}
