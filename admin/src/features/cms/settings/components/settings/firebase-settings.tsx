import { useMemo } from "react";

import type { SettingGroup } from "@/features/cms/types";

import { useSettingsByGroup } from "../../hooks";
import type { Setting } from "../../types";
import { CommonSettingsForm } from "./common-settings-form";

const GROUP: SettingGroup = "firebase";

export function FirebaseSettingsPanel() {
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
        Loading Firebase settings...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-900/60 bg-red-950/40 p-6 text-sm text-red-200">
        Failed to load Firebase settings. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CommonSettingsForm
        group={GROUP}
        settingKey="firebase_api_key"
        label="API key"
        description="Firebase API key used by the client apps."
        placeholder="your-firebase-api-key"
        setting={byKey.firebase_api_key}
      />

      <CommonSettingsForm
        group={GROUP}
        settingKey="firebase_project_id"
        label="Project ID"
        description="Firebase project identifier."
        placeholder="your-firebase-project-id"
        setting={byKey.firebase_project_id}
      />
    </div>
  );
}
