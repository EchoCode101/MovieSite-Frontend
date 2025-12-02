import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import { createBanner } from '../api/banners-api'
import type { Banner, CreateBannerPayload } from '../types'

/**
 * Hook to create a new banner
 */
export function useCreateBanner() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: CreateBannerPayload) => createBanner(payload),
        onSuccess: (banner: Banner) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.banners.all })
            if (banner.id || banner._id) {
                queryClient.invalidateQueries({
                    queryKey: queryKeys.banners.detail(banner.id || banner._id || ''),
                })
            }
            toast.success('Banner created successfully')
        },
        onError: (error) => {
            toast.error('Failed to create banner', error.message)
        },
    })
}


