import { useMemo } from 'react'

import type { SettingGroup } from '@/features/cms/types'

import { useSettingsByGroup } from '../../hooks'
import type { Setting } from '../../types'
import { CommonSettingsForm } from './common-settings-form'

const GROUP: SettingGroup = 'tmdb'

export function TmdbSettingsPanel() {
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
        Loading TMDB settings...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-900/60 bg-red-950/40 p-6 text-sm text-red-200">
        Failed to load TMDB settings. Please try again.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <CommonSettingsForm
        group={GROUP}
        settingKey="tmdb_api_key"
        label="TMDB API key"
        description="API key used for movie and TV metadata."
        placeholder="your-tmdb-api-key"
        setting={byKey.tmdb_api_key}
      />

      <CommonSettingsForm
        group={GROUP}
        settingKey="tmdb_language"
        label="Default language"
        description="Default language code used for TMDB requests (e.g. en-US)."
        placeholder="en-US"
        setting={byKey.tmdb_language}
      />
    </div>
  )
}


