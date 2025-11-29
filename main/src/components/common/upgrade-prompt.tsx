import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Lock, Crown } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { SubscriptionTier } from '@/features/auth/utils/access-control'
import { getTierDisplayName } from '@/features/auth/utils/access-control'

interface UpgradePromptProps {
  requiredTier: SubscriptionTier
  feature: string
  variant?: 'inline' | 'card' | 'modal'
}

export function UpgradePrompt({ requiredTier, feature, variant = 'inline' }: UpgradePromptProps) {
  const tierName = getTierDisplayName(requiredTier)

  if (variant === 'card') {
    return (
      <Card className="p-8 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-primary/10">
            <Lock className="h-12 w-12 text-primary" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">
            {tierName} Subscription Required
          </h3>
          <p className="text-muted-foreground">
            Upgrade to {tierName} to {feature}
          </p>
        </div>
        <Button asChild size="lg" className="gap-2">
          <Link to="/pricing">
            <Crown className="h-4 w-4" />
            Upgrade to {tierName}
          </Link>
        </Button>
      </Card>
    )
  }

  if (variant === 'modal') {
    return (
      <div className="space-y-6 p-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-primary/10">
            <Lock className="h-16 w-16 text-primary" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">
            {tierName} Subscription Required
          </h2>
          <p className="text-muted-foreground text-lg">
            Upgrade to {tierName} to {feature}
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/pricing">
              <Crown className="h-4 w-4" />
              Upgrade Now
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Inline variant
  return (
    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border">
      <Lock className="h-5 w-5 text-muted-foreground" />
      <div className="flex-1">
        <p className="text-sm font-medium">
          {tierName} subscription required to {feature}
        </p>
      </div>
      <Button asChild size="sm" variant="outline" className="gap-2">
        <Link to="/pricing">
          <Crown className="h-3 w-3" />
          Upgrade
        </Link>
      </Button>
    </div>
  )
}
