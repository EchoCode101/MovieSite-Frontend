# Genres Feature

## Purpose

Genre management for content categorization. Provides genre filtering and display for movies, TV shows, and other content.

## API Endpoints

- `GET /api/genres` - Get all genres
- `GET /api/genres/:id` - Get genre by ID

## Components

- `genre-filter.tsx` - Genre filter component
- `genre-badge.tsx` - Genre badge display

## Hooks

- `useGenres()` - Fetch all genres
- `useGenre(id)` - Fetch single genre

## Integration Points

- Genre filters on catalog/search pages
- Genre display on content cards
- Genre pages/routes

