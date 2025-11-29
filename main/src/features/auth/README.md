# Auth Feature

## Purpose

User authentication and authorization. Handles user login, registration, logout, token validation, and access control.

## API Endpoints

- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration
- `POST /api/users/logout` - User logout
- `GET /api/users/me` - Get current user profile
- `GET /api/users/validate-token` - Validate access token

## Components

- `login-form.tsx` - Login form component
- `register-form.tsx` - Registration form component

## Hooks

- `useLogin()` - Login mutation hook
- `useRegister()` - Registration mutation hook
- `useLogout()` - Logout mutation hook
- `useUser()` - Get current user query hook
- `useValidateToken()` - Token validation query hook

## Utilities

- `access-control.ts` - Access control utilities for checking user permissions

## Integration Points

- Authentication flow (login/register/logout)
- Protected routes and components
- User profile management
- Token management and refresh
- Access control based on user role and subscription

