# Pay Per View Feature

## Purpose

Pay-per-view content management. Handles PPV purchases, access checks, and purchase history.

## API Endpoints

- `GET /api/pay-per-view` - Get user's PPV purchases
- `POST /api/pay-per-view/purchase` - Purchase PPV content
- `GET /api/pay-per-view/access/:targetType/:targetId` - Check PPV access

## Components

- `ppv-access-check.tsx` - Component to check and display PPV access
- `ppv-purchase-button.tsx` - Button component for PPV purchases
- `ppv-purchase-dialog.tsx` - Dialog for PPV purchase flow

## Hooks

- `usePPVPurchases()` - Fetch user's PPV purchases
- `usePurchasePPV()` - Purchase PPV content mutation
- `usePPVAccess(targetType, targetId)` - Check PPV access for content

## Integration Points

- Video/movie detail pages
- Content access control
- Purchase flow
- Transaction history

