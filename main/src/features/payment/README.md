# Payment Feature

## Purpose

Payment processing and subscription management. Handles subscription plan updates and payment processing.

## API Endpoints

- `PUT /api/users/subscription_plan` - Update user's subscription plan
- Payment processing endpoints (varies by payment provider)

## Components

- `pricing-table.tsx` - Pricing table component for subscription plans

## Hooks

- `useUpdateSubscription()` - Update subscription plan mutation

## Integration Points

- Subscription checkout flow
- Pricing page
- User profile subscription management
- Payment processing

