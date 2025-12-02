import { z } from 'zod'

// Shared CMS enums and types

export const bannerDevices = ['web', 'mobile', 'tv'] as const
export type BannerDevice = (typeof bannerDevices)[number]

export const bannerPositions = ['home', 'movie', 'tv', 'video'] as const
export type BannerPosition = (typeof bannerPositions)[number]

export const settingGroups = [
  'app',
  'payment',
  'auth',
  'firebase',
  'ads',
  'tmdb',
  'mail',
  'seo',
] as const
export type SettingGroup = (typeof settingGroups)[number]

// Shared Zod helpers

export const slugSchema = z
  .string()
  .min(1, 'Slug is required')
  .max(255, 'Slug must be 255 characters or less')
  .transform((value) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
  )

export const settingKeySchema = z
  .string()
  .min(1, 'Key is required')
  .max(255, 'Key must be 255 characters or less')

export const jsonValueSchema = z
  .string()
  .min(2, 'Value is required')
  .refine((value) => {
    try {
      JSON.parse(value)
      return true
    } catch {
      return false
    }
  }, 'Value must be valid JSON')


