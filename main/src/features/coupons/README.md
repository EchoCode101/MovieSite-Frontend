# Coupons Feature

## Purpose

Coupon code validation and management for subscription discounts and promotions.

## API Endpoints

- `GET /api/coupons/:code` - Validate coupon code

## Components

- `coupon-input.tsx` - Input component for coupon codes
- `coupon-validator.tsx` - Coupon validation component

## Hooks

- `useValidateCoupon()` - Validate coupon code mutation hook

## Integration Points

- Subscription checkout flow
- Payment processing
- Discount application

