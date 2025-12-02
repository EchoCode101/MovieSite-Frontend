import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import type { SettingGroup } from '@/features/cms/types'
import { settingGroups } from '@/features/cms/types'
import { SettingsTabs } from '@/features/cms/settings/components/settings-tabs'

export const Route = createFileRoute('/_authenticated/cms/settings/')({
  component: SettingsPage,
})

function SettingsPage() {
  const [activeGroup, setActiveGroup] = useState<SettingGroup>(
    settingGroups[0],
  )

  return (
    <div className="space-y-6">
      <header className="mb-2 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-50">
          Settings
        </h1>
        <p className="text-sm text-slate-400">
          Configure application, payment, auth, integrations, mail, and SEO
          settings in one place.
        </p>
      </header>

      <SettingsTabs
        activeGroup={activeGroup}
        onGroupChange={setActiveGroup}
      />
    </div>
  )
}

