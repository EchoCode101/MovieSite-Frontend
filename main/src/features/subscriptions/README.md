# Subscriptions Feature

## Purpose

Subscription plan management and user subscription handling. Allows users to view available plans, create subscriptions, and manage their active subscriptions.

## API Endpoints

### Plans
- `GET /api/subscriptions/plans` - Get plans (with filters)
- `GET /api/subscriptions/plans/:id` - Get plan by ID

### Subscriptions
- `GET /api/subscriptions` - Get user subscriptions
- `GET /api/subscriptions/active` - Get active subscription
- `POST /api/subscriptions` - Create subscription
- `POST /api/subscriptions/cancel` - Cancel subscription

## Components

- `subscription-card.tsx` - Subscription card display
- `plan-card.tsx` - Plan selection card
- `subscription-status.tsx` - Status indicator component

## Hooks

### Plans
- `usePlans(params)` - Fetch plans
- `usePlan(id)` - Fetch single plan

### Subscriptions
- `useSubscriptions()` - Fetch user subscriptions
- `useActiveSubscription()` - Fetch active subscription
- `useCreateSubscription()` - Create subscription mutation
- `useCancelSubscription()` - Cancel subscription mutation

## Integration Points

- Pricing page to display plans
- Subscription management in profile page
- Subscription status check for access control
- Subscription info in user profile

