import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/lib/toast'

import { deleteBanner } from '../api/banners-api'

/**
 * Hook to delete a banner
 */
export function useDeleteBanner() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => deleteBanner(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.banners.all })
            toast.success('Banner deleted successfully')
        },
        onError: (error) => {
            toast.error('Failed to delete banner', error.message)
        },
    })
}


