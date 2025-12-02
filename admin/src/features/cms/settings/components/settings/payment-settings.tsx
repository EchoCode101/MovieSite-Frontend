import { useMemo } from "react";

import type { SettingGroup } from "@/features/cms/types";

import { useSettingsByGroup } from "../../hooks";
import type { Setting } from "../../types";
import { CommonSettingsForm } from "./common-settings-form";

const GROUP: SettingGroup = "payment";

export function PaymentSettingsPanel() {
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
        Loading payment settings...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-900/60 bg-red-950/40 p-6 text-sm text-red-200">
        Failed to load payment settings. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CommonSettingsForm
        group={GROUP}
        settingKey="payment_default_currency"
        label="Default currency"
        description="Default currency code used for subscriptions and purchases (e.g. USD, EUR, INR)."
        placeholder="USD"
        setting={byKey.payment_default_currency}
      />

      <CommonSettingsForm
        group={GROUP}
        settingKey="payment_tax_inclusive"
        label="Prices include tax"
        description="Whether plan prices are tax-inclusive. Use true/false or a JSON boolean."
        placeholder="true"
        setting={byKey.payment_tax_inclusive}
      />
    </div>
  );
}
