import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PPVPurchaseDialog } from './ppv-purchase-dialog'
import type { Movie, Episode } from '@/types/content'
import type { Movie as MovieType } from '@/features/movies/types'
import type { Episode as EpisodeType } from '@/features/episodes/types'
import { ShoppingCart } from 'lucide-react'

interface PPVPurchaseButtonProps {
  content: Movie | Episode | MovieType | EpisodeType
  contentType: 'movie' | 'episode'
  className?: string
}

/**
 * Button component for purchasing PPV content
 * Opens purchase dialog when clicked
 */
export function PPVPurchaseButton({ content, contentType, className }: PPVPurchaseButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Check if content is PPV
  if (content.access_type !== 'pay_per_view') {
    return null
  }

  // Get price from content (may need to be added to types)
  const price = (content as any).pay_per_view_price || 0
  const purchaseType = (content as any).purchase_type || 'rent'

  if (price <= 0) {
    return null
  }

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)} className={className}>
        <ShoppingCart className="h-4 w-4 mr-2" />
        {purchaseType === 'rent' ? 'Rent' : 'Buy'} ${price.toFixed(2)}
      </Button>
      <PPVPurchaseDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        content={content}
        contentType={contentType}
        price={price}
        purchaseType={purchaseType}
      />
    </>
  )
}

