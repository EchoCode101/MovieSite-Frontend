# Likes Feature

## Purpose

Like/dislike functionality for videos, comments, and reviews. Allows users to express their preferences and see aggregated counts.

## API Endpoints

- `POST /api/likes-dislikes` - Toggle like/dislike on a target
- `GET /api/likes-dislikes/counts/:targetType/:targetId` - Get like/dislike counts
- `GET /api/likes-dislikes/user/:targetType/:targetId` - Get user's reaction

## Components

None (likes are typically displayed inline with content)

## Hooks

- `useLikeDislikeCounts(targetType, targetId)` - Fetch like/dislike counts
- `useUserReaction(targetType, targetId)` - Fetch user's reaction
- `useToggleLikeDislike()` - Toggle like/dislike mutation

## Integration Points

- Video detail pages
- Comment sections
- Review sections
- User engagement tracking

