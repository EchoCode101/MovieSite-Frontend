import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useCancelSubscription } from '../hooks/useSubscriptions'
import type { Subscription } from '../types'
import { Loader2 } from 'lucide-react'

interface CancelSubscriptionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subscription: Subscription
  onSuccess?: () => void
}

/**
 * Dialog component for confirming subscription cancellation
 */
export function CancelSubscriptionDialog({
  open,
  onOpenChange,
  subscription,
  onSuccess,
}: CancelSubscriptionDialogProps) {
  const cancelSubscription = useCancelSubscription()

  const handleCancel = async () => {
    try {
      await cancelSubscription.mutateAsync({
        subscription_id: subscription.id,
      })
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      // Error is handled by the hook's toast
    }
  }

  const cancellationDate = subscription.cancelled_at
    ? new Date(subscription.cancelled_at)
    : new Date(subscription.ends_at)
  const endsDate = new Date(subscription.ends_at)

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Are you sure you want to cancel your subscription to{' '}
              <strong>{subscription.plan?.name || 'this plan'}</strong>?
            </p>
            <p>
              Your subscription will remain active until{' '}
              <strong>{endsDate.toLocaleDateString()}</strong>. After that date, you will lose
              access to subscription features.
            </p>
            {subscription.plan && (
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-sm font-medium mb-1">What you'll lose access to:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>All subscription content</li>
                  {subscription.plan.allow_download && <li>Download feature</li>}
                  {subscription.plan.allow_cast && <li>Cast feature</li>}
                  {subscription.plan.max_profiles > 1 && (
                    <li>Multiple profiles (you'll be limited to 1 profile)</li>
                  )}
                </ul>
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              You can reactivate your subscription at any time before the end date.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={cancelSubscription.isPending}>Keep Subscription</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCancel}
            disabled={cancelSubscription.isPending}
            className="bg-destructive hover:bg-destructive/90"
          >
            {cancelSubscription.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Cancel Subscription
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

