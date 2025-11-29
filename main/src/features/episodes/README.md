# Episodes Feature

## Purpose

TV show episode management. Provides access to episode listings by season and individual episode details.

## API Endpoints

- `GET /api/episodes/season/:seasonId` - Get episodes by season ID
- `GET /api/episodes/:id` - Get episode by ID

## Components

None (episodes are typically displayed in TV show detail pages)

## Hooks

- `useEpisodesBySeason(seasonId)` - Fetch episodes for a season
- `useEpisode(id)` - Fetch single episode by ID

## Integration Points

- TV show detail pages
- Season/episode navigation
- Episode playback
- Watch progress tracking

