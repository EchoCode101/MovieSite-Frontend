import { createFileRoute, Link } from '@tanstack/react-router'
import { usePlans } from '@/features/subscriptions/hooks/usePlans'
import { CouponInput } from '@/features/coupons/components/coupon-input'
import { CouponValidator } from '@/features/coupons/components/coupon-validator'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import { useState } from 'react'
import type { Coupon } from '@/features/coupons/types'

export const Route = createFileRoute('/pricing/')({
  component: PricingPage,
})

function PricingPage() {
  const { data: plansData, isLoading, error } = usePlans({ is_active: true })
  const plans = plansData?.plans || []
  const [couponCode, setCouponCode] = useState('')
  const [validatedCoupon, setValidatedCoupon] = useState<Coupon | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-muted/30 border-b">
        <div className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock premium content and features with our flexible subscription plans
          </p>
        </div>
      </section>

      {/* Coupon Section */}
      <section className="container mx-auto py-8 px-4 max-w-2xl">
        <div className="bg-muted/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Have a coupon code?</h2>
          <CouponInput
            value={couponCode}
            onChange={(value) => {
              setCouponCode(value)
              if (!value) {
                setValidatedCoupon(null)
              }
            }}
            onCouponValidated={(coupon) => {
              if (coupon.is_valid) {
                setValidatedCoupon(coupon as Coupon)
              } else {
                setValidatedCoupon(null)
              }
            }}
          />
          {validatedCoupon && (
            <div className="mt-4">
              <CouponValidator
                coupon={validatedCoupon}
                onRemove={() => {
                  setCouponCode('')
                  setValidatedCoupon(null)
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Pricing Table */}
      <section className="container mx-auto py-16 px-4">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-destructive">
            Error loading plans: {error.message}
          </div>
        )}

        {plans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`border rounded-lg p-6 ${
                  plan.is_featured ? 'border-primary shadow-lg scale-105' : ''
                }`}
              >
                {plan.is_featured && (
                  <Badge className="mb-4">Most Popular</Badge>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground">
                    /{plan.billing_cycle}
                  </span>
                </div>
                {plan.description && (
                  <p className="text-sm text-muted-foreground mb-6">
                    {plan.description}
                  </p>
                )}
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{plan.max_profiles} Profiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{plan.max_devices} Devices</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      {plan.allow_download ? 'Downloads' : 'No Downloads'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      {plan.allow_cast ? 'Cast Support' : 'No Cast'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      {plan.ad_supported ? 'Ad Supported' : 'Ad Free'}
                    </span>
                  </li>
                </ul>
                <Button className="w-full" variant={plan.is_featured ? 'default' : 'outline'}>
                  {plan.name === 'Free' ? 'Current Plan' : 'Subscribe'}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          !isLoading && (
            <div className="text-center py-12 text-muted-foreground">
              No plans available at the moment.
            </div>
          )
        )}
      </section>

      {/* FAQ or Additional Info */}
      <section className="container mx-auto py-16 px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Can I change my plan anytime?</h3>
            <p className="text-muted-foreground">
              Yes! You can upgrade or downgrade your subscription at any time from your profile page.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">
              We accept all major credit cards and PayPal for your convenience.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Is there a free trial?</h3>
            <p className="text-muted-foreground">
              Our Free plan is available forever with no credit card required. Upgrade anytime to access premium features.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
