# Cast & Crew Feature

## Purpose

Cast and crew member management. Provides information about actors, directors, writers, and other crew members associated with content.

## API Endpoints

- `GET /api/cast-crew` - Get all (with filters: type, search)
- `GET /api/cast-crew/:id` - Get by ID

## Components

- `cast-list.tsx` - Cast list display
- `crew-list.tsx` - Crew list display
- `person-card.tsx` - Person card component

## Hooks

- `useCastCrew(params)` - Fetch cast & crew
- `useCastCrewMember(id)` - Fetch single member

## Integration Points

- Show cast & crew on movie/TV show detail pages
- Person detail pages
- Cast/crew filters in search

