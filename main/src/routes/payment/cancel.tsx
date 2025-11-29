import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { XCircle } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/payment/cancel')({
  component: PaymentCancelPage,
})

function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-destructive/10">
            <XCircle className="h-16 w-16 text-destructive" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Payment Cancelled</h1>
          <p className="text-muted-foreground">
            Your payment was cancelled. No charges have been made to your account.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button asChild>
            <Link to="/pricing">View Pricing</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
