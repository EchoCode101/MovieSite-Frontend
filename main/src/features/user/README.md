# User Feature

## Purpose

User profile and video management. Handles user profile updates, saved videos, and video URL management.

## API Endpoints

- `GET /api/users/videos` - Get user's saved videos (paginated)
- `POST /api/users/videos` - Save a video URL
- `GET /api/users/videos/:videoId/url` - Get video URL by video ID
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/subscription_plan` - Update user subscription plan

## Components

- `profile-form.tsx` - User profile form component
- `profile-view.tsx` - User profile view component

## Hooks

- `useUserVideos(params)` - Fetch user's saved videos
- `useSaveVideo()` - Save video URL mutation
- `useFetchVideoUrl(videoId)` - Fetch video URL by video ID
- `useUpdateUserProfile()` - Update user profile mutation
- `useUpdateSubscription()` - Update subscription plan mutation

## Integration Points

- User profile page
- Saved videos page
- Profile editing
- Subscription management

