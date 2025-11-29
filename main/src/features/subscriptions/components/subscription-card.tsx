import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SubscriptionStatusBadge } from './subscription-status-badge'
import { CancelSubscriptionDialog } from './cancel-subscription-dialog'
import type { Subscription } from '../types'
import { Calendar, CreditCard, X, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SubscriptionCardProps {
  subscription: Subscription
  isActive?: boolean
  onCancel?: () => void
  className?: string
}

/**
 * Enhanced subscription card component
 */
export function SubscriptionCard({
  subscription,
  isActive = false,
  onCancel,
  className,
}: SubscriptionCardProps) {
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)

  const plan = subscription.plan
  const startsDate = new Date(subscription.started_at)
  const endsDate = new Date(subscription.ends_at)
  const cancelledDate = subscription.cancelled_at
    ? new Date(subscription.cancelled_at)
    : null

  const formatBillingCycle = (cycle: string) => {
    return cycle.charAt(0).toUpperCase() + cycle.slice(1)
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(amount)
  }

  const getPaymentStatusIcon = () => {
    switch (subscription.payment_status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <>
      <Card className={cn('hover:shadow-lg transition-shadow', isActive && 'border-primary', className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">{plan?.name || 'Unknown Plan'}</h3>
              {isActive && (
                <Badge variant="default" className="mt-1">
                  Current Plan
                </Badge>
              )}
            </div>
            <SubscriptionStatusBadge status={subscription.status} />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {plan && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Price</span>
                <span className="font-semibold">
                  {formatCurrency(plan.price, subscription.currency)} /{' '}
                  {formatBillingCycle(plan.billing_cycle)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Amount</span>
                <span className="font-semibold">
                  {formatCurrency(subscription.total_amount, subscription.currency)}
                </span>
              </div>

              {subscription.discount_amount > 0 && (
                <div className="flex items-center justify-between text-green-600">
                  <span className="text-sm">Discount</span>
                  <span className="font-semibold">
                    -{formatCurrency(subscription.discount_amount, subscription.currency)}
                  </span>
                </div>
              )}

              {subscription.tax_amount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tax</span>
                  <span className="text-sm">
                    {formatCurrency(subscription.tax_amount, subscription.currency)}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="border-t pt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Started:</span>
              <span>{startsDate.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Ends:</span>
              <span>{endsDate.toLocaleDateString()}</span>
            </div>
            {cancelledDate && (
              <div className="flex items-center gap-2 text-sm">
                <X className="h-4 w-4 text-destructive" />
                <span className="text-muted-foreground">Cancelled:</span>
                <span className="text-destructive">{cancelledDate.toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {plan && (
            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-2">Features:</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{plan.max_profiles} Profile{plan.max_profiles !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{plan.max_devices} Device{plan.max_devices !== 1 ? 's' : ''}</span>
                </div>
                {plan.allow_download && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Downloads</span>
                  </div>
                )}
                {plan.allow_cast && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Cast</span>
                  </div>
                )}
                {plan.ad_supported && (
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <span>Ad Supported</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Payment Status</span>
              <div className="flex items-center gap-2">
                {getPaymentStatusIcon()}
                <span className="capitalize">{subscription.payment_status}</span>
              </div>
            </div>
            {subscription.payment_transaction_id && (
              <p className="text-xs text-muted-foreground mt-1">
                Transaction: {subscription.payment_transaction_id}
              </p>
            )}
          </div>
        </CardContent>

        {isActive && subscription.status === 'active' && (
          <CardFooter>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => setIsCancelDialogOpen(true)}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel Subscription
            </Button>
          </CardFooter>
        )}
      </Card>

      <CancelSubscriptionDialog
        open={isCancelDialogOpen}
        onOpenChange={setIsCancelDialogOpen}
        subscription={subscription}
        onSuccess={() => {
          setIsCancelDialogOpen(false)
          onCancel?.()
        }}
      />
    </>
  )
}

