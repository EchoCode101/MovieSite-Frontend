/**
 * Stream type for channels
 */
export type StreamType = 'hls' | 'dash' | 'mp4'

/**
 * Channel entity
 */
export interface Channel {
  id?: string
  _id?: string // Backend may return either
  name: string
  slug: string
  description?: string
  logo_url?: string
  banner_url?: string
  stream_url?: string
  stream_type?: StreamType
  language?: string
  country?: string
  category?: string
  is_active?: boolean
  is_featured?: boolean
  sort_order?: number
  createdAt: string
  updatedAt: string
}

/**
 * Parameters for fetching channels list (optional filters)
 */
export interface ChannelListParams {
  search?: string
  is_active?: boolean
  is_featured?: boolean
}

/**
 * Payload for creating a new channel
 */
export interface CreateChannelPayload {
  name: string
  slug?: string
  description?: string
  logo_url?: string
  banner_url?: string
  stream_url?: string
  stream_type?: StreamType
  language?: string
  country?: string
  category?: string
  is_active?: boolean
  is_featured?: boolean
  sort_order?: number
}

/**
 * Payload for updating an existing channel
 */
export interface UpdateChannelPayload {
  name?: string
  slug?: string
  description?: string
  logo_url?: string
  banner_url?: string
  stream_url?: string
  stream_type?: StreamType
  language?: string
  country?: string
  category?: string
  is_active?: boolean
  is_featured?: boolean
  sort_order?: number
}

