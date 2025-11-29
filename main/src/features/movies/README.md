# Movies Feature

## Purpose

Movie content management. Provides access to movie listings, details, and filtering capabilities.

## API Endpoints

- `GET /api/movies/paginated` - Get paginated movies (with filters)
- `GET /api/movies/:id` - Get movie by ID
- `GET /api/movies/trending` - Get trending movies
- `GET /api/movies/featured` - Get featured movies
- `GET /api/movies/coming-soon` - Get coming soon movies

## Components

- `movie-card.tsx` - Movie card component
- `movie-detail.tsx` - Movie detail page component
- `movie-carousel.tsx` - Movie carousel component
- `access-control.tsx` - Access control wrapper

## Hooks

- `useMovies(params)` - Fetch paginated movies
- `useMovie(id)` - Fetch single movie
- `useTrendingMovies()` - Fetch trending movies
- `useFeaturedMovies()` - Fetch featured movies
- `useComingSoonMovies()` - Fetch coming soon movies

## Integration Points

- Replace static movie data on home page
- Movie detail page route (`/movies/:id`)
- Access control checks (subscription/PPV)
- Home page carousels
- Movie filters (genre, trending, featured, coming soon)

