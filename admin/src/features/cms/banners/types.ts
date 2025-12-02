import type { BannerDevice, BannerPosition } from '../types'

export type BannerTargetType = 'movie' | 'tvshow' | 'episode'

export interface Banner {
    id?: string
    _id?: string
    title?: string
    device?: BannerDevice
    position?: BannerPosition
    target_type: BannerTargetType
    target_id: string
    image_url: string
    sort_order?: number
    is_active: boolean
    createdAt?: string
    updatedAt?: string
}

export interface BannerListParams {
    device?: BannerDevice
    position?: BannerPosition
    is_active?: boolean
}

export type BannerListResponse = Banner[]

export type CreateBannerPayload = Omit<Banner, 'id' | '_id' | 'createdAt' | 'updatedAt'>

export type UpdateBannerPayload = Partial<CreateBannerPayload>


