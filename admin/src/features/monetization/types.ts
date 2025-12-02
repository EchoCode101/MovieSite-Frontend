import { z } from 'zod'

/**
 * Common monetization enums and shared types
 * These mirror backend enums described in BACKEND_API_DOCUMENTATION_LATEST.md
 */

export const billingCycles = ['weekly', 'monthly', 'quarterly', 'yearly'] as const
export type BillingCycle = (typeof billingCycles)[number]

export const subscriptionStatuses = ['active', 'cancelled', 'expired', 'pending'] as const
export type SubscriptionStatus = (typeof subscriptionStatuses)[number]

export const paymentStatuses = ['pending', 'paid', 'failed', 'refunded'] as const
export type PaymentStatus = (typeof paymentStatuses)[number]

export const discountTypes = ['fixed', 'percent'] as const
export type DiscountType = (typeof discountTypes)[number]

/**
 * Reusable Zod helpers for money/percentage/date ranges
 * Forms in monetization submodules should import these where appropriate.
 */

export const moneySchema = z
  .number()
  .min(0, 'Amount must be greater than or equal to 0')

export const percentageSchema = z
  .number()
  .min(0, 'Percentage cannot be negative')
  .max(100, 'Percentage cannot exceed 100')

export const optionalDateSchema = z
  .string()
  .datetime()
  .or(z.literal('').transform(() => undefined))
  .optional()

export const dateRangeSchema = z
  .object({
    start: optionalDateSchema,
    end: optionalDateSchema,
  })
  .refine(
    (value) => {
      if (!value.start || !value.end) return true
      return new Date(value.start) <= new Date(value.end)
    },
    {
      message: 'End date must be after start date',
      path: ['end'],
    },
  )


