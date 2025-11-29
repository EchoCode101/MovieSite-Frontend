import { useRef, useEffect, useState } from 'react'
import { useUser } from '@/features/auth/hooks/useAuth'
import { canAccessVideo, getRequiredTier } from '@/features/auth/utils/access-control'
import { UpgradePrompt } from '@/components/common/upgrade-prompt'
import { useUpdateWatchProgress } from '@/features/watch/hooks/useWatchHistory'
import { getActiveProfileId } from '@/features/profiles/components/profile-selector'
import { Play } from 'lucide-react'
import type { Video } from '../types'

interface VideoPlayerProps {
  video: Video
  contentType?: 'movie' | 'episode'
  contentId?: string
}

export function VideoPlayer({ video, contentType, contentId }: VideoPlayerProps) {
  const { data: user } = useUser()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const updateProgress = useUpdateWatchProgress()
  const activeProfileId = getActiveProfileId()
  const progressUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
  const hasAccess = canAccessVideo(user?.subscription_plan, video.accessLevel)
  const requiredTier = getRequiredTier('video', video.accessLevel)

  // Track watch progress
  useEffect(() => {
    if (!videoRef.current || !user || !activeProfileId || !contentType || !contentId) {
      return
    }

    const videoElement = videoRef.current

    const handleTimeUpdate = () => {
      if (videoElement) {
        setCurrentTime(videoElement.currentTime)
        setDuration(videoElement.duration || 0)
      }
    }

    const handleLoadedMetadata = () => {
      if (videoElement) {
        setDuration(videoElement.duration || 0)
        // Resume from last position if available
        // This would require fetching watch history first
      }
    }

    const handlePause = () => {
      // Save progress on pause
      if (videoElement && duration > 0) {
        saveProgress(videoElement.currentTime, duration)
      }
    }

    const handleEnded = () => {
      // Mark as fully watched
      if (videoElement && duration > 0) {
        saveProgress(duration, duration)
      }
    }

    videoElement.addEventListener('timeupdate', handleTimeUpdate)
    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata)
    videoElement.addEventListener('pause', handlePause)
    videoElement.addEventListener('ended', handleEnded)

    // Auto-save progress every 30 seconds
    progressUpdateIntervalRef.current = setInterval(() => {
      if (videoElement && duration > 0 && !videoElement.paused) {
        saveProgress(videoElement.currentTime, duration)
      }
    }, 30000) // 30 seconds

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate)
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata)
      videoElement.removeEventListener('pause', handlePause)
      videoElement.removeEventListener('ended', handleEnded)
      if (progressUpdateIntervalRef.current) {
        clearInterval(progressUpdateIntervalRef.current)
      }
    }
  }, [user, activeProfileId, contentType, contentId, duration])

  const saveProgress = (watchedSeconds: number, totalSeconds: number) => {
    if (!activeProfileId || !contentType || !contentId || totalSeconds <= 0) {
      return
    }

    // Only save if watched at least 10 seconds or 5% of video
    const minWatchTime = Math.min(10, totalSeconds * 0.05)
    if (watchedSeconds < minWatchTime) {
      return
    }

    updateProgress.mutate({
      profile_id: activeProfileId,
      target_type: contentType,
      target_id: contentId,
      watched_seconds: Math.floor(watchedSeconds),
      total_seconds: Math.floor(totalSeconds),
    })
  }

  if (!hasAccess) {
    return (
      <div className="aspect-video bg-muted flex flex-col items-center justify-center p-6 text-center rounded-lg">
        <UpgradePrompt
          requiredTier={requiredTier}
          feature="watch this video"
          variant="card"
        />
      </div>
    )
  }

  // Check if video URL is available
  if (!video.videoUrl || video.videoUrl === 'undefined' || video.videoUrl === '') {
    return (
      <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden shadow-xl flex items-center justify-center relative">
        {/* Placeholder Background */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        
        {/* Thumbnail if available */}
        {video.thumbnailUrl && (
          <img 
            src={video.thumbnailUrl} 
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )}
        
        {/* Placeholder Content */}
        <div className="relative z-10 text-center space-y-4 p-8">
          <div className="flex justify-center">
            <div className="p-6 rounded-full bg-primary/20 backdrop-blur-sm">
              <Play className="h-16 w-16 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Video Player Placeholder</h3>
            <p className="text-gray-300 max-w-md">
              Video streaming is currently being implemented on the backend.
              <br />
              <span className="text-sm text-gray-400">
                This is a placeholder to allow testing of comments and reviews.
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
      <video
        ref={videoRef}
        src={video.videoUrl}
        poster={video.thumbnailUrl}
        controls
        className="w-full h-full"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
