# TV Shows Feature

## Purpose

TV show content management. Provides access to TV show listings, details, and season information.

## API Endpoints

- `GET /api/tv-shows/paginated` - Get paginated TV shows (with filters)
- `GET /api/tv-shows/:id` - Get TV show by ID
- `GET /api/tv-shows/:id/seasons` - Get seasons for a TV show

## Components

- `tv-show-card.tsx` - TV show card component

## Hooks

- `useTVShows(params)` - Fetch paginated TV shows
- `useTVShow(id)` - Fetch single TV show by ID
- `useTVShowSeasons(id)` - Fetch seasons for a TV show

## Integration Points

- TV show listing pages
- TV show detail pages (`/tv-shows/:id`)
- Season/episode navigation
- Access control checks (subscription/PPV)
- Home page carousels
- TV show filters (genre, search)

