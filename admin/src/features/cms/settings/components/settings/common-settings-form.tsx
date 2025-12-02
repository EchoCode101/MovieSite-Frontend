import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { settingKeySchema } from '@/features/cms/types'
import type { SettingGroup } from '@/features/cms/types'
import type { Setting } from '../../types'
import {
  useCreateOrUpdateSetting,
  useDeleteSetting,
} from '../../hooks'

const settingFormSchema = z.object({
  key: settingKeySchema,
  value: z.string().min(1, 'Value is required'),
})

type SettingFormValues = z.infer<typeof settingFormSchema>

interface CommonSettingsFormProps {
  group: SettingGroup
  settingKey: string
  label: string
  description?: string
  type?: 'text' | 'textarea'
  placeholder?: string
  setting?: Setting | null
}

export function CommonSettingsForm({
  group,
  settingKey,
  label,
  description,
  type = 'text',
  placeholder,
  setting,
}: CommonSettingsFormProps) {
  const createOrUpdate = useCreateOrUpdateSetting()
  const deleteSettingMutation = useDeleteSetting()

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(settingFormSchema),
    defaultValues: {
      key: settingKey,
      value:
        (typeof setting?.value === 'string'
          ? setting.value
          : setting?.value !== undefined
          ? JSON.stringify(setting.value)
          : '') || '',
    },
  })

  useEffect(() => {
    form.reset({
      key: settingKey,
      value:
        (typeof setting?.value === 'string'
          ? setting.value
          : setting?.value !== undefined
          ? JSON.stringify(setting.value)
          : '') || '',
    })
  }, [settingKey, setting, form])

  const handleSubmit = (values: SettingFormValues) => {
    let parsedValue: unknown = values.value
    try {
      parsedValue = JSON.parse(values.value)
    } catch {
      parsedValue = values.value
    }

    createOrUpdate.mutate({
      key: values.key,
      value: parsedValue,
      group,
    })
  }

  const handleDelete = () => {
    if (!setting) return
    deleteSettingMutation.mutate({ key: setting.key, group })
  }

  const isSaving = createOrUpdate.isPending
  const isDeleting = deleteSettingMutation.isPending

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-3 rounded-lg border border-slate-800 bg-slate-900/50 p-4"
    >
      <div className="space-y-1">
        <Label htmlFor={`${settingKey}-value`}>{label}</Label>
        {description && (
          <p className="text-xs text-slate-400">{description}</p>
        )}
      </div>
      <input type="hidden" {...form.register('key')} />
      <div className="space-y-1">
        {type === 'textarea' ? (
          <Textarea
            id={`${settingKey}-value`}
            rows={4}
            {...form.register('value')}
            placeholder={placeholder}
            disabled={isSaving}
          />
        ) : (
          <Input
            id={`${settingKey}-value`}
            {...form.register('value')}
            placeholder={placeholder}
            disabled={isSaving}
          />
        )}
        {form.formState.errors.value && (
          <p className="text-sm text-red-400">
            {form.formState.errors.value.message}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleDelete}
          disabled={!setting || isSaving || isDeleting}
        >
          {isDeleting ? 'Removing...' : 'Remove setting'}
        </Button>
        <Button type="submit" size="sm" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}


