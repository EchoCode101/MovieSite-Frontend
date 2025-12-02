import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { settingGroups } from '@/features/cms/types'
import type { SettingGroup } from '@/features/cms/types'

import { AppSettingsPanel } from './settings/app-settings'
import { PaymentSettingsPanel } from './settings/payment-settings'
import { AuthSettingsPanel } from './settings/auth-settings'
import { FirebaseSettingsPanel } from './settings/firebase-settings'
import { AdsSettingsPanel } from './settings/ads-settings'
import { TmdbSettingsPanel } from './settings/tmdb-settings'
import { MailSettingsPanel } from './settings/mail-settings'
import { SeoSettingsPanel } from './settings/seo-settings'

interface SettingsTabsProps {
  activeGroup: SettingGroup
  onGroupChange: (group: SettingGroup) => void
}

export function SettingsTabs({
  activeGroup,
  onGroupChange,
}: SettingsTabsProps) {
  return (
    <Tabs
      value={activeGroup}
      onValueChange={(value) => onGroupChange(value as SettingGroup)}
      className="space-y-4"
    >
      <TabsList className="flex w-full flex-wrap justify-start gap-2 bg-slate-900/60">
        {settingGroups.map((group) => (
          <TabsTrigger
            key={group}
            value={group}
            className="capitalize"
          >
            {group}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="app">
        <AppSettingsPanel />
      </TabsContent>
      <TabsContent value="payment">
        <PaymentSettingsPanel />
      </TabsContent>
      <TabsContent value="auth">
        <AuthSettingsPanel />
      </TabsContent>
      <TabsContent value="firebase">
        <FirebaseSettingsPanel />
      </TabsContent>
      <TabsContent value="ads">
        <AdsSettingsPanel />
      </TabsContent>
      <TabsContent value="tmdb">
        <TmdbSettingsPanel />
      </TabsContent>
      <TabsContent value="mail">
        <MailSettingsPanel />
      </TabsContent>
      <TabsContent value="seo">
        <SeoSettingsPanel />
      </TabsContent>
    </Tabs>
  )
}


