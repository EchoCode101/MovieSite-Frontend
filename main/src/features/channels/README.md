# Channels Feature

## Purpose

Live TV channel management. Provides access to channel listings, details, and filtering by category, country, and language.

## API Endpoints

- `GET /api/channels` - Get channels with optional filters (category, country, language)
- `GET /api/channels/:id` - Get channel by ID

## Components

None (channels are typically displayed in dedicated channel pages)

## Hooks

- `useChannels(params)` - Fetch channels with optional filters
- `useChannel(id)` - Fetch single channel by ID

## Integration Points

- Live TV section
- Channel browsing and filtering
- Channel detail pages
- Channel streaming

