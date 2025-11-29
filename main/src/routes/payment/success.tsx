import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/payment/success')({
  component: PaymentSuccessPage,
})

function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-green-500/10">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Your subscription has been upgraded successfully. You now have access to all premium features.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button asChild>
            <Link to="/">Go to Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/catalog">Browse Videos</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
