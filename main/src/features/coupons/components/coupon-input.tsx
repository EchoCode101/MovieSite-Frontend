import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useValidateCoupon } from '../hooks/useCoupons'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CouponInputProps {
  value: string
  onChange: (value: string) => void
  onDiscountApplied?: (discount: number) => void
  onCouponValidated?: (coupon: { discount_type: string; discount_value: number; is_valid: boolean; code: string }) => void
  disabled?: boolean
  className?: string
}

/**
 * Component for inputting and validating coupon codes
 */
export function CouponInput({
  value,
  onChange,
  onDiscountApplied,
  onCouponValidated,
  disabled = false,
  className,
}: CouponInputProps) {
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean
    discount: number
    message: string
  } | null>(null)

  const validateCoupon = useValidateCoupon()

  const handleValidate = async () => {
    if (!value.trim()) {
      setValidationResult(null)
      return
    }

    setIsValidating(true)
    try {
      const result = await validateCoupon.mutateAsync(value.trim())
      setValidationResult({
        isValid: result.is_valid,
        discount: calculateDiscount(result),
        message: result.is_valid
          ? `Discount applied: ${formatDiscount(result)}`
          : 'Invalid or expired coupon code',
      })
      if (result.is_valid && onDiscountApplied) {
        onDiscountApplied(calculateDiscount(result))
      } else if (!result.is_valid && onDiscountApplied) {
        onDiscountApplied(0)
      }
      if (onCouponValidated) {
        onCouponValidated({ ...result, code: value.trim() })
      }
    } catch (error) {
      setValidationResult({
        isValid: false,
        discount: 0,
        message: 'Failed to validate coupon',
      })
      if (onDiscountApplied) {
        onDiscountApplied(0)
      }
    } finally {
      setIsValidating(false)
    }
  }

  const calculateDiscount = (coupon: { discount_type: string; discount_value: number }): number => {
    // This should be calculated based on the base price
    // For now, return the discount value (will need base price passed in)
    return coupon.discount_value
  }

  const formatDiscount = (coupon: { discount_type: string; discount_value: number }): string => {
    if (coupon.discount_type === 'percent') {
      return `${coupon.discount_value}%`
    }
    return `$${coupon.discount_value.toFixed(2)}`
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleValidate()
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor="coupon">Coupon Code (Optional)</Label>
      <div className="flex gap-2">
        <Input
          id="coupon"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setValidationResult(null)
            if (onDiscountApplied) {
              onDiscountApplied(0)
            }
          }}
          onKeyPress={handleKeyPress}
          placeholder="Enter coupon code"
          disabled={disabled || isValidating}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={handleValidate}
          disabled={disabled || isValidating || !value.trim()}
          variant="outline"
        >
          {isValidating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Apply'
          )}
        </Button>
      </div>
      {validationResult && (
        <div
          className={cn(
            'flex items-center gap-2 text-sm',
            validationResult.isValid ? 'text-green-600' : 'text-destructive'
          )}
        >
          {validationResult.isValid ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <span>{validationResult.message}</span>
        </div>
      )}
    </div>
  )
}

