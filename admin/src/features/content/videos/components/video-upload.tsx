import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUploadVideoToCloudinary } from '../hooks/use-upload-video-to-cloudinary'
import type { UploadResult } from '../types'

interface VideoUploadProps {
  onUploadComplete: (result: UploadResult) => void
  onError?: (error: Error) => void
}

export function VideoUpload({ onUploadComplete, onError }: VideoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const uploadMutation = useUploadVideoToCloudinary()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        const error = new Error('Please select a valid video file')
        onError?.(error)
        return
      }
      // Validate file size (100MB max)
      if (file.size > 100 * 1024 * 1024) {
        const error = new Error('File size must be less than 100MB')
        onError?.(error)
        return
      }
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    try {
      const result = await uploadMutation.mutateAsync(selectedFile)
      onUploadComplete(result)
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      onError?.(error as Error)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Video File</Label>
        <Input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          disabled={uploadMutation.isPending}
          className="bg-slate-950"
        />
        {selectedFile && (
          <p className="mt-2 text-sm text-slate-400">
            Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
      </div>

      {selectedFile && (
        <Button
          type="button"
          onClick={handleUpload}
          disabled={uploadMutation.isPending}
        >
          {uploadMutation.isPending ? 'Uploading...' : 'Upload to Cloudinary'}
        </Button>
      )}

      {uploadMutation.isPending && (
        <div className="text-sm text-slate-400">Uploading video...</div>
      )}
    </div>
  )
}

