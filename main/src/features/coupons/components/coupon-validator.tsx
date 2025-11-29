import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Coupon } from '../types'
import { X, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CouponValidatorProps {
  coupon: Coupon
  onRemove?: () => void
  className?: string
}

/**
 * Component to display validated coupon information
 */
export function CouponValidator({ coupon, onRemove, className }: CouponValidatorProps) {
  if (!coupon.is_valid) {
    return null
  }

  const formatDiscount = () => {
    if (coupon.discount_type === 'percent') {
      return `${coupon.discount_value}%`
    }
    return `$${coupon.discount_value.toFixed(2)}`
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        <div>
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            Coupon: {coupon.code}
          </p>
          <p className="text-xs text-green-600 dark:text-green-400">
            {formatDiscount()} discount applied
          </p>
        </div>
      </div>
      {onRemove && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100 dark:hover:bg-green-900/40"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

