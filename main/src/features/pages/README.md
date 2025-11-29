# Pages Feature

## Purpose

Static page management. Provides access to CMS-managed pages like About, Terms, Privacy Policy, etc.

## API Endpoints

- `GET /api/pages` - Get all pages
- `GET /api/pages/:slug` - Get page by slug

## Components

None (pages are typically rendered in dedicated route components)

## Hooks

- `usePages()` - Fetch all pages
- `usePage(slug)` - Fetch single page by slug

## Integration Points

- Static page routes (`/pages/:slug`)
- Footer links
- Legal pages (Terms, Privacy Policy)
- About/Help pages

