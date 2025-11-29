# Devices Feature

## Purpose

Device management for users. Tracks and manages devices that can access the user's account, with limits based on subscription plan.

## API Endpoints

- `GET /api/devices` - Get user's devices
- `POST /api/devices` - Register/update device
- `DELETE /api/devices/:id` - Remove device
- `GET /api/devices/check-limit` - Check device limit

## Components

- `device-list.tsx` - Device list view
- `device-item.tsx` - Device card component

## Hooks

- `useDevices()` - Fetch devices
- `useRegisterDevice()` - Register device mutation
- `useRemoveDevice()` - Remove device mutation
- `useDeviceLimit()` - Check device limit

## Integration Points

- Device management in profile/settings page
- Auto-register device on login
- Show device limit warnings
- Device removal functionality

