import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const PLANS = [
  {
    name: "Basic",
    price: "Free",
    description: "Essential features for casual viewing",
    features: [
      "720p Streaming",
      "Ad-supported content",
      "Watch on 1 device",
      "Limited catalog access",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    description: "Perfect for entertainment enthusiasts",
    features: [
      "1080p Full HD Streaming",
      "No Ads",
      "Watch on 2 devices",
      "Full catalog access",
      "Offline downloads",
    ],
    cta: "Subscribe Now",
    popular: true,
  },
  {
    name: "Ultimate",
    price: "$19.99",
    period: "/month",
    description: "The ultimate cinematic experience",
    features: [
      "4K Ultra HD + HDR",
      "No Ads",
      "Watch on 4 devices",
      "Full catalog access",
      "Offline downloads",
      "Early access to new releases",
    ],
    cta: "Go Ultimate",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <div className="w-full py-16 px-4 md:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Choose Your Plan
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select the perfect plan for your viewing needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative flex flex-col ${
                plan.popular 
                  ? "border-primary shadow-lg scale-105 z-10" 
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
