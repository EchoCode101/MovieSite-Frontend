import { useMemo } from 'react'

import type { SettingGroup } from '@/features/cms/types'

import { useSettingsByGroup } from '../../hooks'
import type { Setting } from '../../types'
import { CommonSettingsForm } from './common-settings-form'

const GROUP: SettingGroup = 'mail'

export function MailSettingsPanel() {
  const { data: settings = [], isLoading, isError } = useSettingsByGroup(GROUP)

  const byKey = useMemo(() => {
    const map: Record<string, Setting> = {}
    for (const setting of settings) {
      map[setting.key] = setting
    }
    return map
  }, [settings])

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-400">
        Loading mail settings...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-900/60 bg-red-950/40 p-6 text-sm text-red-200">
        Failed to load mail settings. Please try again.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <CommonSettingsForm
        group={GROUP}
        settingKey="mail_from_address"
        label="From address"
        description="Default from address used for system emails."
        placeholder="no-reply@example.com"
        setting={byKey.mail_from_address}
      />

      <CommonSettingsForm
        group={GROUP}
        settingKey="mail_smtp_config"
        label="SMTP configuration"
        description="JSON configuration for your SMTP provider (host, port, auth, etc.)."
        type="textarea"
        placeholder='{"host":"smtp.example.com","port":587,"secure":false,"auth":{"user":"...","pass":"..."}}'
        setting={byKey.mail_smtp_config}
      />
    </div>
  )
}


