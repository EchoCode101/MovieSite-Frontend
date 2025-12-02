# Videos Feature

## Purpose

Generic video content management. Provides access to video listings, details, categories, and related videos.

## API Endpoints

- `GET /api/videos/paginated` - Get paginated videos with filters
- `GET /api/videos/:id` - Get video by ID
- `GET /api/videos/categories` - Get video categories
- `GET /api/videos/:id/related` - Get related videos

## Components

- `filter-bar.tsx` - Video filter bar component
- `video-card.tsx` - Video card component
- `video-player.tsx` - Video player component

## Hooks

- `useVideos(params)` - Fetch paginated videos
- `useVideo(id)` - Fetch single video by ID
- `useRelatedVideos(id)` - Fetch related videos

## Integration Points

- Video listing pages
- Video detail pages
- Video player
- Content discovery
- Category browsing

