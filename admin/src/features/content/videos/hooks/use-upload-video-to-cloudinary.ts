import { useMutation } from '@tanstack/react-query'

import { uploadVideoToCloudinary } from '../api/videos-api'
import { toast } from '@/lib/toast'

/**
 * Hook to upload video to Cloudinary
 */
export function useUploadVideoToCloudinary() {
  return useMutation({
    mutationFn: (file: File) => uploadVideoToCloudinary(file),
    onSuccess: () => {
      toast.success('Video uploaded successfully')
    },
    onError: (error) => {
      toast.error('Failed to upload video', error.message)
    },
  })
}

