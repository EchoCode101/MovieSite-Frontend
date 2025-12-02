import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import { updateBanner } from '../api/banners-api'
import type { UpdateBannerPayload } from '../types'

interface UpdateBannerVariables {
    id: string
    payload: UpdateBannerPayload
}

/**
 * Hook to update an existing banner
 */
export function useUpdateBanner() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, payload }: UpdateBannerVariables) =>
            updateBanner(id, payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.banners.all })
            queryClient.invalidateQueries({
                queryKey: queryKeys.banners.detail(variables.id),
            })
            toast.success('Banner updated successfully')
        },
        onError: (error) => {
            toast.error('Failed to update banner', error.message)
        },
    })
}


