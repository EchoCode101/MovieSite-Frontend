# Taxes Feature

## Purpose

Tax calculation and management. Provides tax information by country for subscription and PPV purchases.

## API Endpoints

- `GET /api/taxes/country/:country` - Get tax information by country code

## Components

None (taxes are typically calculated in checkout flows)

## Hooks

- `useTaxByCountry(country)` - Fetch tax information by country code

## Integration Points

- Subscription checkout flow
- PPV purchase flow
- Tax calculation
- Invoice generation

