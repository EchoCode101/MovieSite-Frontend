import { useMemo } from "react";

import type { SettingGroup } from "@/features/cms/types";

import { useSettingsByGroup } from "../../hooks";
import type { Setting } from "../../types";
import { CommonSettingsForm } from "./common-settings-form";

const GROUP: SettingGroup = "auth";

export function AuthSettingsPanel() {
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
        Loading auth settings...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-900/60 bg-red-950/40 p-6 text-sm text-red-200">
        Failed to load auth settings. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CommonSettingsForm
        group={GROUP}
        settingKey="auth_jwt_expiry_minutes"
        label="JWT expiry (minutes)"
        description="How long access tokens are valid before requiring refresh."
        placeholder="60"
        setting={byKey.auth_jwt_expiry_minutes}
      />

      <CommonSettingsForm
        group={GROUP}
        settingKey="auth_allow_social_login"
        label="Allow social login"
        description="Whether users can sign in with social providers."
        placeholder="false"
        setting={byKey.auth_allow_social_login}
      />
    </div>
  );
}
