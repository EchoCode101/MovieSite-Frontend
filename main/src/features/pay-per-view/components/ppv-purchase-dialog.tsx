import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePurchasePPV } from '../hooks/usePayPerView'
import type { Movie, Episode } from '@/types/content'
import type { Movie as MovieType } from '@/features/movies/types'
import type { Episode as EpisodeType } from '@/features/episodes/types'
import { Loader2 } from 'lucide-react'
import { CouponInput } from '@/features/coupons/components/coupon-input'

interface PPVPurchaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  content: Movie | Episode | MovieType | EpisodeType
  contentType: 'movie' | 'episode'
  price: number
  purchaseType: 'rent' | 'buy'
}

/**
 * Dialog component for purchasing PPV content
 */
export function PPVPurchaseDialog({
  open,
  onOpenChange,
  content,
  contentType,
  price,
  purchaseType: defaultPurchaseType,
}: PPVPurchaseDialogProps) {
  const [selectedPurchaseType, setSelectedPurchaseType] = useState<'rent' | 'buy'>(defaultPurchaseType)
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const purchasePPV = usePurchasePPV()

  // Calculate final price
  const finalPrice = price - discount
  const hasRentOption = defaultPurchaseType === 'rent' || (content as any).purchase_type === 'rent'

  const handlePurchase = async () => {
    try {
      await purchasePPV.mutateAsync({
        target_type: contentType,
        target_id: content.id,
        purchase_type: selectedPurchaseType,
      })
      onOpenChange(false)
      // Reset state
      setCouponCode('')
      setDiscount(0)
    } catch (error) {
      // Error is handled by the hook's toast
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Purchase {content.title}</DialogTitle>
          <DialogDescription>
            Complete your purchase to watch this content.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Purchase Type Selection */}
          {hasRentOption && (
            <div className="space-y-2">
              <Label>Purchase Type</Label>
              <Select
                value={selectedPurchaseType}
                onValueChange={(value) => setSelectedPurchaseType(value as 'rent' | 'buy')}
                disabled={purchasePPV.isPending}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="buy">Buy</SelectItem>
                </SelectContent>
              </Select>
              {selectedPurchaseType === 'rent' && (content as any).access_duration_hours && (
                <p className="text-xs text-muted-foreground">
                  Rental period: {(content as any).access_duration_hours} hours
                </p>
              )}
            </div>
          )}

          {/* Price Display */}
          <div className="border rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Base Price</span>
              <span className="font-semibold">{formatCurrency(price)}</span>
            </div>
            {discount > 0 && (
              <div className="flex items-center justify-between text-green-600">
                <span className="text-sm">Discount</span>
                <span className="font-semibold">-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="border-t pt-2 flex items-center justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-lg font-bold">{formatCurrency(finalPrice)}</span>
            </div>
          </div>

          {/* Coupon Input */}
          <CouponInput
            value={couponCode}
            onChange={setCouponCode}
            onDiscountApplied={setDiscount}
            disabled={purchasePPV.isPending}
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={purchasePPV.isPending}
          >
            Cancel
          </Button>
          <Button onClick={handlePurchase} disabled={purchasePPV.isPending}>
            {purchasePPV.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Complete Purchase
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

