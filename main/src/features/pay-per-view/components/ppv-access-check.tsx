import { ReactNode } from 'react'
import { usePPVAccess } from '../hooks/usePayPerView'
import { PPVPurchaseButton } from './ppv-purchase-button'
import { UpgradePrompt } from '@/components/common/upgrade-prompt'
import type { Movie, Episode } from '@/types/content'
import type { Movie as MovieType } from '@/features/movies/types'
import type { Episode as EpisodeType } from '@/features/episodes/types'

interface PPVAccessCheckProps {
  content: Movie | Episode | MovieType | EpisodeType
  contentType: 'movie' | 'episode'
  children: ReactNode
  showPurchaseButton?: boolean
}

/**
 * Wrapper component that checks PPV access and shows purchase button if needed
 */
export function PPVAccessCheck({
  content,
  contentType,
  children,
  showPurchaseButton = true,
}: PPVAccessCheckProps) {
  const { data: access, isLoading } = usePPVAccess(contentType, content.id)

  // If not PPV content, show children directly
  if (content.access_type !== 'pay_per_view') {
    return <>{children}</>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  // Check if access is valid
  const hasAccess = access?.hasAccess || false
  const isExpired = access?.expiresAt
    ? new Date(access.expiresAt) < new Date()
    : false

  if (hasAccess && !isExpired) {
    return <>{children}</>
  }

  // Show purchase option or upgrade prompt
  return (
    <div className="space-y-4">
      {showPurchaseButton ? (
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-2">Purchase Required</h3>
          <p className="text-muted-foreground mb-4">
            {isExpired
              ? 'Your rental has expired. Purchase again to continue watching.'
              : 'Purchase this content to watch it.'}
          </p>
          <PPVPurchaseButton content={content} contentType={contentType} />
        </div>
      ) : (
        <UpgradePrompt
          title="Purchase Required"
          message="This content requires a one-time purchase to watch."
        />
      )}
    </div>
  )
}

