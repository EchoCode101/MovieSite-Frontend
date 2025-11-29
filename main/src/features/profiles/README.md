# Profiles Feature

## Purpose

Multi-profile management for users. Allows users to create and manage multiple profiles (e.g., for family members) with individual settings like language preferences, autoplay settings, and parental controls.

## API Endpoints

- `GET /api/profiles` - List all user profiles
- `POST /api/profiles` - Create a new profile
- `PUT /api/profiles/:id` - Update a profile
- `DELETE /api/profiles/:id` - Delete a profile

## Components

- `profile-list.tsx` - Display list of profiles
- `profile-form.tsx` - Create/edit profile form
- `profile-selector.tsx` - Profile switcher component

## Hooks

- `useProfiles()` - Fetch all profiles
- `useProfile(id)` - Fetch single profile
- `useCreateProfile()` - Create profile mutation
- `useUpdateProfile()` - Update profile mutation
- `useDeleteProfile()` - Delete profile mutation

## Integration Points

- Profile selector in navbar (when user has multiple profiles)
- Profile management page
- Profile context/hook for current active profile

