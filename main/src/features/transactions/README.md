# Transactions Feature

## Purpose

Transaction history management. Provides access to user's payment transactions for subscriptions and pay-per-view purchases.

## API Endpoints

- `GET /api/transactions` - Get paginated transactions with optional filters
- `GET /api/transactions/:id` - Get transaction by ID

## Components

None (transactions are typically displayed in a transactions list or history page)

## Hooks

- `useTransactions(params)` - Fetch paginated transactions with filters
- `useTransaction(id)` - Fetch single transaction by ID

## Integration Points

- Transaction history page
- Payment receipts
- Subscription management
- PPV purchase history

