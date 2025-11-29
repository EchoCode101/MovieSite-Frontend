import { useUser } from '@/features/auth/hooks/useAuth'
import { useUpdateSubscription } from '../hooks/usePayment'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Crown } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    tier: 'Free',
    price: '$0',
    description: 'Basic access to our platform',
    features: ['Access to free videos', 'Standard quality', 'Basic comments'],
  },
  {
    name: 'Basic',
    tier: 'Basic',
    price: '$9.99',
    description: 'Enhanced features',
    features: ['All Free features', 'Access to basic videos', 'HD quality', 'Write reviews', 'Reply to comments'],
  },
  {
    name: 'Premium',
    tier: 'Premium',
    price: '$19.99',
    description: 'Premium experience',
    features: ['All Basic features', 'Access to premium videos', 'Full HD quality', 'Ad-free experience', 'Priority support'],
    popular: true,
  },
  {
    name: 'Ultimate',
    tier: 'Ultimate',
    price: '$29.99',
    description: 'The ultimate experience',
    features: ['All Premium features', 'Access to all videos', '4K Ultra HD', 'Early access', 'Exclusive content', 'Download videos'],
  },
]

export function PricingTable() {
  const { data: user } = useUser()
  const updateSubscription = useUpdateSubscription()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-10">
      {plans.map((plan) => {
        const isCurrentPlan = user?.subscription_plan === plan.tier
        return (
          <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-primary border-2 shadow-lg relative' : ''} ${isCurrentPlan ? 'border-primary border-2' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-3xl font-bold mb-6">{plan.price}<span className="text-sm font-normal text-muted-foreground">/month</span></div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full gap-2" 
                disabled={isCurrentPlan || updateSubscription.isPending}
                onClick={() => updateSubscription.mutate(plan.tier)}
                variant={isCurrentPlan ? "outline" : plan.popular ? "default" : "outline"}
              >
                {isCurrentPlan ? (
                  'Current Plan'
                ) : (
                  <>
                    <Crown className="h-4 w-4" />
                    {plan.price === '$0' ? 'Get Started' : `Upgrade to ${plan.name}`}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
