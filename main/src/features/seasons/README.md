# Seasons Feature

## Purpose

TV show season management. Provides access to season listings by TV show and individual season details.

## API Endpoints

- `GET /api/seasons/tv-show/:tvShowId` - Get seasons by TV show ID
- `GET /api/seasons/:id` - Get season by ID

## Components

None (seasons are typically displayed in TV show detail pages)

## Hooks

- `useSeasonsByTVShow(tvShowId)` - Fetch seasons for a TV show
- `useSeason(id)` - Fetch single season by ID

## Integration Points

- TV show detail pages
- Season/episode navigation
- Episode listing
- Watch progress tracking

