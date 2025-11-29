# Home Feature

## Purpose

Home page content management. Provides featured videos, popular videos, category-based videos, and access-level filtered videos for the home page.

## API Endpoints

- `GET /api/videos/paginated` - Get paginated videos (used for featured, popular, category, and access-level videos)

## Components

- `hero-carousel.tsx` - Hero section carousel
- `hero-video-card.tsx` - Hero video card component
- `HeroCarousel.tsx` - Alternative hero carousel
- `MovieCarousel.tsx` - Movie carousel component
- `PartnersMarquee.tsx` - Partners marquee component
- `PricingSection.tsx` - Pricing section component
- `video-carousel-section.tsx` - Video carousel section

## Hooks

- `useFeaturedVideos(limit)` - Fetch featured videos
- `usePopularVideos(limit)` - Fetch popular videos
- `useCategoryVideos(category, limit)` - Fetch videos by category
- `useAccessLevelVideos(accessLevel, limit)` - Fetch videos by access level

## Integration Points

- Home page (`/`)
- Featured content display
- Popular content sections
- Category-based content sections
- Access-level based content filtering

