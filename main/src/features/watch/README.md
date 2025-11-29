# Watch Feature

## Purpose

Watchlist and watch history management. Allows users to save content to watch later and track viewing progress across movies and episodes.

## API Endpoints

- `POST /api/watch/watchlist` - Add to watchlist
- `DELETE /api/watch/watchlist` - Remove from watchlist
- `GET /api/watch/watchlist` - Get watchlist (with filters)
- `POST /api/watch/progress` - Update watch progress
- `GET /api/watch/continue-watching` - Get continue watching items
- `DELETE /api/watch/history` - Remove watch history item

## Components

- `watchlist-item.tsx` - Watchlist item card
- `watchlist-list.tsx` - Watchlist list view
- `continue-watching.tsx` - Continue watching carousel
- `watch-progress.tsx` - Progress indicator component

## Hooks

- `useWatchlist(params)` - Fetch watchlist
- `useAddToWatchlist()` - Add to watchlist mutation
- `useRemoveFromWatchlist()` - Remove from watchlist mutation
- `useUpdateWatchProgress()` - Update progress mutation
- `useContinueWatching(profile_id, limit)` - Fetch continue watching
- `useRemoveWatchHistory()` - Remove history mutation

## Integration Points

- "Add to Watchlist" button on content cards
- Continue watching section on home page
- Watchlist page/route
- Progress tracking in video player
- Progress indicators on content cards

