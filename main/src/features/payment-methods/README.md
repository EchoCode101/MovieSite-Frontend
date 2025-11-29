# Payment Methods Feature

## Purpose

Payment method management. Provides access to available payment methods for subscription and PPV purchases.

## API Endpoints

- `GET /api/payment-methods` - Get active payment methods

## Components

None (payment methods are typically displayed in checkout forms)

## Hooks

- `usePaymentMethods()` - Fetch active payment methods

## Integration Points

- Subscription checkout flow
- PPV purchase flow
- Payment method selection
- Payment processing

