# Phase 1: Project Setup & Foundation

**Status:** Completed  
**Duration:** Week 1  
**Goal:** Set up the complete foundation for the admin panel with all utilities, configuration, and core infrastructure.

---

## Overview

Phase 1 focuses on establishing a solid foundation for the admin panel. Since the basic Vite + React + TypeScript setup is already complete, we'll focus on:

1. Installing missing dependencies (Axios, React Hook Form, Recharts, etc.)
2. Setting up the complete project structure
3. Creating utility functions and libraries
4. Configuring API client with interceptors
5. Setting up query keys factory
6. Installing additional ShadCN UI components
7. Creating base configuration files

---

## Current Status

✅ **Already Completed:**

- Vite + React 19 + TypeScript setup
- TanStack Router with file-based routing
- TanStack Query for state management
- Tailwind CSS 4.0 configuration
- Basic ShadCN UI components (button, input, label, select, slider, switch, textarea)
- Biome for linting/formatting
- Environment configuration with @t3-oss/env-core

---

## Notes

- All paths use `@/` alias for imports (configured in tsconfig.json and vite.config.ts)
- Follow TypeScript strict mode - no `any` types
- Use logger utility instead of console.\*
- All API functions should be pure functions in `api/` directories
- All React hooks should be in `hooks/` directories
- All components should be in `components/` directories
- Follow the feature module pattern for organization

---

**Phase 1 Completion Criteria:**

✅ All dependencies installed  
✅ Project structure created  
✅ Utilities and configuration files created  
✅ No TypeScript or linting errors  
✅ Development server running successfully  
✅ Ready to begin Phase 2 implementation

---

## Phase 2: Authentication & Layout

**Status:** Completed  
**Duration:** Week 2  
**Goal:** Implement admin authentication flows and the core admin layout (sidebar + header) with protected routes.

---

### Overview

Phase 2 focuses on making the admin panel secure and usable:

1. Implement typed auth APIs and hooks.
2. Build login, forgot password, and reset password pages.
3. Add protected routes and a dedicated authenticated layout.
4. Create the admin layout shell with sidebar navigation and header.
5. Connect logout and current admin user display.

---

### Phase 2 Tasks

1. **Auth API Layer**
   - `src/features/auth/api/types.ts` and `auth-api.ts` with login/logout/me/forgot/reset endpoints, using `apiClient`, `extractData`, and `API_ERRORS`.
   - **Status:** ✅ Completed

2. **Auth Hooks**
   - `useAdminLogin`, `useAdminLogout`, `useAdminUser`, `useForgotPassword`, and `useResetPassword` using TanStack Query, localStorage, and toasts.
   - **Status:** ✅ Completed

3. **Auth Forms & Pages**
   - `login-form.tsx`, `forgot-password-form.tsx`, and `reset-password-form.tsx` using React Hook Form + Zod + existing ShadCN-style UI.
   - Routes: `/login`, `/forgot-password`, `/reset-password/$token`.
   - **Status:** ✅ Completed

4. **Protected Layout & Routing**
   - `_authenticated` layout route with `beforeLoad` using `requireAuth`.
   - Basic dashboard page at `/dashboard`.
   - `requireGuest` on login-related routes.
   - **Status:** ✅ Completed

5. **Admin Layout Shell**
   - `AdminLayout` under `src/components/layout/` and `Sidebar` under `src/components/common/`.
   - Navigation moved into the sidebar; header shows current admin email and logout button.
   - **Status:** ✅ Completed

6. **UX & Testing**
   - Toasts and loading/error states across auth flows.
   - Verified redirects, token handling, and basic responsive layout.
   - `npx tsc --noEmit` and `npm run lint` pass.
   - **Status:** ✅ Completed

---

### Phase 2 Completion Criteria

✅ Auth API functions implemented and typed  
✅ Auth hooks wired with TanStack Query and navigation  
✅ Login / forgot / reset pages functional and styled  
✅ Protected `_authenticated` layout and `/dashboard` route working  
✅ Sidebar + header layout integrated with auth state  
✅ TypeScript and lint checks passing with no new errors

---

## Phase 3: Dashboard & Analytics

**Status:** Completed  
**Duration:** Week 2–3  
**Goal:** Replace the placeholder dashboard with a fully functional analytics page including stats, charts, and activity feeds.

### Overview

Phase 3 focuses on delivering a data-driven admin dashboard using the existing API client and TanStack Query:

1. Define typed dashboard models and API functions.
2. Implement dashboard query hooks for stats and analytics.
3. Build reusable dashboard components (cards, charts, lists).
4. Replace the placeholder dashboard page with the full analytics layout.
5. Verify build, lint, and runtime behaviour.

### Phase 3 Tasks

1. **Dashboard Types & API Layer**
   - `src/features/dashboard/types.ts` and `api/dashboard-api.ts` with stats, revenue, user growth, content stats, recent activity, and top content endpoints using `apiClient`, `extractData`, and `API_ERRORS`.
   - **Status:** ✅ Completed

2. **Dashboard Hooks**
   - `useDashboardStats`, `useRevenueData`, `useUserGrowth`, `useContentStats`, `useRecentActivity`, and `useTopContent` using TanStack Query and `queryKeys.dashboard`.
   - **Status:** ✅ Completed

3. **Dashboard Components**
   - `stats-cards.tsx`, `revenue-chart.tsx`, `user-growth-chart.tsx`, `content-stats-chart.tsx`, `recent-activity.tsx`, and `top-content.tsx` under `src/features/dashboard/components/` plus a reusable `Card` in `src/components/ui/card.tsx`.
   - **Status:** ✅ Completed

4. **Dashboard Page Layout**
   - Updated `routes/_authenticated/dashboard/index.tsx` to use the new hooks and components, including period and content-type filters, and integrated it into the existing `AdminLayout`.
   - **Status:** ✅ Completed

5. **Quality Checks**
   - `npm run build` and `npm run lint` pass with no new errors; dashboard renders with loading and basic error states for each widget.
   - **Status:** ✅ Completed

---

### Phase 3 Completion Criteria

✅ Dashboard shows live metrics from backend APIs via typed hooks  
✅ Revenue, user growth, and content distribution charts render correctly for the selected period  
✅ Recent activity and top content sections load, limit correctly, and handle empty/error states  
✅ TypeScript build and lint pass with no new issues

---

## Phase 4: User Management

**Status:** Completed  
**Duration:** Week 3–4  
**Goal:** Provide admins with a full users management experience including listing, filtering, CRUD operations, bulk actions, and subscription management.

### Overview

Phase 4 focuses on delivering a complete users module for the admin panel, built on top of the existing backend user and admin APIs:

1. Define user-specific types and API functions.
2. Implement TanStack Query hooks for list/detail and mutations.
3. Build reusable users UI (table, filters, dialogs, bulk actions).
4. Add users routes and navigation.
5. Verify behaviour, type safety, and build/lint.

### Phase 4 Tasks

1. **Users Types & API Layer**
   - `src/features/users/types.ts` and `api/users-api.ts` with typed helpers for `GET /api/users/paginated`, `GET /api/users/:id`, `POST /api/users`, `PUT /api/users/:id`, `DELETE /api/users/:id`, and `PUT /api/admin/subscription`.
   - **Status:** ✅ Completed

2. **Users Hooks**
   - `useUsers`, `useUser`, `useCreateUser`, `useUpdateUser`, `useDeleteUser`, and `useUpdateUserSubscription` using TanStack Query and `queryKeys.users`.
   - **Status:** ✅ Completed

3. **Users Components**
   - `users-table.tsx`, `user-filters.tsx`, `user-form-dialog.tsx`, `user-details-dialog.tsx`, `delete-user-dialog.tsx`, `users-bulk-actions.tsx`, and `subscription-badge.tsx` under `src/features/users/components/`, plus additional ShadCN-style UI primitives (`table`, `dialog`, `badge`, `checkbox`).
   - **Status:** ✅ Completed

4. **Users Routes & Navigation**
   - `routes/_authenticated/users/index.tsx` for the users list page wired to the new hooks and components, and `Sidebar` updated with a `Users` entry pointing to `/_authenticated/users/`.
   - **Status:** ✅ Completed

5. **Quality Checks**
   - `npm run build` and `npm run lint` pass with no new errors; user listing, filtering, selection, dialogs, and CSV export work against the current API client layer.
   - **Status:** ✅ Completed

---

### Phase 4 Completion Criteria

✅ Users list supports pagination, search, and filtering by role, status, and subscription plan  
✅ Admins can create, edit, delete, and bulk delete users via dialogs and bulk actions  
✅ Admin can change a user's subscription plan from the admin panel (API helper and mutation in place)  
✅ TypeScript build and lint pass with no new issues

---

## Phase 5: Content Management – Videos & Movies

**Status:** Completed  
**Duration:** Week 4–5  
**Goal:** Implement comprehensive content management for videos and movies, including paginated lists, create/edit forms, Cloudinary upload for videos, streams configuration, and access control fields.

### Overview

Phase 5 focuses on building out the content management module for videos and movies, providing administrators with the tools to manage platform content:

1. Define typed video and movie models and API functions.
2. Implement content query and mutation hooks.
3. Build reusable content interface components (tables, filters, forms, upload, stream manager).
4. Integrate content management routes into the admin panel.
5. Ensure robust error handling, loading states, and data consistency.

### Phase 5 Tasks

1. **Content Types & API Layer**
   - `src/features/content/videos/types.ts`, `src/features/content/movies/types.ts`, and API functions in `api/videos-api.ts` and `api/movies-api.ts` with functions for fetching paginated content, getting by ID, creating, updating, deleting, bulk deleting videos, and uploading videos to Cloudinary.
   - **Status:** ✅ Completed

2. **Content Hooks**
   - `useVideos`, `useVideo`, `useCreateVideo`, `useUpdateVideo`, `useDeleteVideo`, `useBulkDeleteVideos`, `useUploadVideoToCloudinary` for videos, and `useMovies`, `useMovie`, `useCreateMovie`, `useUpdateMovie`, `useDeleteMovie` for movies using TanStack Query.
   - **Status:** ✅ Completed

3. **Videos UI Components**
   - `videos-table.tsx`, `video-filters.tsx`, `video-form-dialog.tsx`, `video-upload.tsx`, `videos-bulk-actions.tsx`, and `delete-video-dialog.tsx` under `src/features/content/videos/components/`.
   - **Status:** ✅ Completed

4. **Movies UI Components**
   - `movies-table.tsx`, `movie-filters.tsx`, `movie-form-dialog.tsx` (multi-step form), `movie-details.tsx`, `stream-manager.tsx`, and `delete-movie-dialog.tsx` under `src/features/content/movies/components/`.
   - **Status:** ✅ Completed

5. **Content Routes & Navigation**
   - Created `src/routes/_authenticated/content/videos/index.tsx` for videos list page, `src/routes/_authenticated/content/movies/index.tsx` for movies list page, and `src/routes/_authenticated/content/movies/$id.tsx` for movie details page. Updated `src/components/common/sidebar.tsx` to include a Content section with links to videos and movies pages.
   - **Status:** ✅ Completed

6. **Quality Checks**
   - `npm run build` and `npm run lint` pass with no new errors; videos and movies management features render correctly with loading and error states.
   - **Status:** ✅ Completed

---

### Phase 5 Completion Criteria

✅ Videos and movies lists support pagination and documented filters (genre, year, access type, flags)  
✅ Admins can create, edit, delete, and bulk delete videos and movies via forms and bulk actions  
✅ Video uploads to Cloudinary are supported from the admin UI and integrated into video creation  
✅ Multi-step movie form supports all required fields including streams, access control, and metadata  
✅ Stream manager component allows adding/removing/editing movie streams  
✅ Sidebar navigation includes a Content section with links to Videos and Movies pages  
✅ TypeScript build and lint pass with no new issues

---

## Phase 6: Content Management – TV Shows, Seasons, Episodes

**Status:** Completed  
**Duration:** Week 5–6  
**Goal:** Implement comprehensive content management for TV Shows, Seasons, and Episodes with hierarchical navigation, subtitle management, and access control.

### Overview

Phase 6 focuses on building out the TV content management module, providing administrators with complete control over TV shows, their seasons, and episodes:

1. Define typed TV show, season, and episode models and API functions.
2. Implement content query and mutation hooks for all three entities.
3. Build reusable content interface components (tables, filters, forms, subtitle manager).
4. Integrate hierarchical navigation: TV Show → Seasons → Episodes.
5. Ensure robust error handling, loading states, and data consistency.

### Phase 6 Tasks

1. **TV Shows Types & API Layer**
   - `src/features/content/tv-shows/types.ts` and `api/tv-shows-api.ts` with functions for fetching paginated TV shows, getting by ID, creating, updating, deleting, and getting seasons.
   - **Status:** ✅ Completed

2. **TV Shows Hooks**
   - `useTvShows`, `useTvShow`, `useAllTvShows`, `useCreateTvShow`, `useUpdateTvShow`, `useDeleteTvShow`, `useTvShowSeasons` using TanStack Query.
   - **Status:** ✅ Completed

3. **TV Shows UI Components**
   - `tv-shows-table.tsx`, `tv-show-filters.tsx`, `tv-show-form-dialog.tsx`, `tv-show-details.tsx`, `seasons-list.tsx`, and `delete-tv-show-dialog.tsx` under `src/features/content/tv-shows/components/`.
   - **Status:** ✅ Completed

4. **Seasons Types & API Layer**
   - `src/features/content/seasons/types.ts` and `api/seasons-api.ts` with functions for fetching all seasons, getting by TV show, getting by ID, creating, updating, and deleting.
   - **Status:** ✅ Completed

5. **Seasons Hooks**
   - `useSeasons`, `useSeasonsByTvShow`, `useSeason`, `useCreateSeason`, `useUpdateSeason`, `useDeleteSeason` using TanStack Query.
   - **Status:** ✅ Completed

6. **Seasons UI Components**
   - `seasons-table.tsx`, `season-form-dialog.tsx`, `episodes-list.tsx`, and `delete-season-dialog.tsx` under `src/features/content/seasons/components/`.
   - **Status:** ✅ Completed

7. **Episodes Types & API Layer**
   - `src/features/content/episodes/types.ts` and `api/episodes-api.ts` with functions for fetching paginated episodes, getting all episodes, getting by season, getting by ID, creating, updating, and deleting.
   - **Status:** ✅ Completed

8. **Episodes Hooks**
   - `useEpisodes`, `useAllEpisodes`, `useEpisodesBySeason`, `useEpisode`, `useCreateEpisode`, `useUpdateEpisode`, `useDeleteEpisode` using TanStack Query.
   - **Status:** ✅ Completed

9. **Episodes UI Components**
   - `episodes-table.tsx`, `episode-filters.tsx`, `episode-form-dialog.tsx` (with StreamManager and SubtitleManager), `delete-episode-dialog.tsx`, and `subtitle-manager.tsx` under `src/features/content/episodes/components/`.
   - **Status:** ✅ Completed

10. **Content Routes & Navigation**
    - Created routes for TV shows (`/content/tv-shows` and `/content/tv-shows/$id`), seasons (`/content/seasons` and `/content/seasons/$id`), and episodes (`/content/episodes` and `/content/episodes/$id`). Updated sidebar with TV Shows, Seasons, and Episodes links.
    - **Status:** ✅ Completed

11. **Hierarchical Navigation**
    - Implemented navigation flow: TV Show details → Seasons list → Season details → Episodes list. Episode form includes TV show and season selection with dynamic loading.
    - **Status:** ✅ Completed

12. **Quality Checks**
    - `npm run build` and `npm run lint` pass with no new errors; all TV content management features render correctly with loading and error states.
    - **Status:** ✅ Completed

---

### Phase 6 Completion Criteria

✅ TV shows list supports pagination and filters (genre, year, access type, search)  
✅ Admins can create, edit, delete TV shows via forms  
✅ Seasons management integrated with TV shows (create/edit/delete seasons for a TV show)  
✅ Episodes management with subtitle support (create/edit/delete episodes with streams and subtitles)  
✅ Hierarchical navigation: TV Show → Seasons → Episodes working correctly  
✅ Subtitle manager component allows adding/removing/editing episode subtitles with default selection  
✅ Episode form includes TV show and season selection with dynamic loading  
✅ Access control configuration for episodes (free/subscription/pay-per-view)  
✅ Sidebar navigation includes TV Shows, Seasons, and Episodes links  
✅ TypeScript build and lint pass with no new issues

---

## Implementation Status Summary

**Completed Phases:**

- ✅ Phase 1: Project Setup & Foundation
- ✅ Phase 2: Authentication & Layout
- ✅ Phase 3: Dashboard & Analytics
- ✅ Phase 4: User Management
- ✅ Phase 5: Content Management – Videos & Movies
- ✅ Phase 6: Content Management – TV Shows, Seasons, Episodes

## Phase 7: Content Management – Genres, Cast/Crew, Channels

**Status:** Completed  
**Duration:** Week 6–7  
**Goal:** Implement comprehensive content management for Genres, Cast/Crew, and Channels modules to support the core content management system.

### Overview

Phase 7 focuses on building out reference data management (genres, cast/crew) and live TV channel management:

1. Define typed genre, cast/crew, and channel models and API functions.
2. Implement content query and mutation hooks for all three entities.
3. Build reusable content interface components (tables, filters, forms).
4. Integrate content management routes into the admin panel.
5. Ensure robust error handling, loading states, and data consistency.

### Phase 7 Tasks

1. **Genres Types & API Layer**
   - `src/features/content/genres/types.ts` and `api/genres-api.ts` with functions for fetching all genres, getting by ID, creating, updating, and deleting.
   - **Status:** ✅ Completed

2. **Genres Hooks**
   - `useGenres`, `useGenre`, `useCreateGenre`, `useUpdateGenre`, `useDeleteGenre` using TanStack Query.
   - **Status:** ✅ Completed

3. **Genres UI Components**
   - `genres-table.tsx`, `genre-form-dialog.tsx`, and `delete-genre-dialog.tsx` under `src/features/content/genres/components/`.
   - **Status:** ✅ Completed

4. **Cast/Crew Types & API Layer**
   - `src/features/content/cast-crew/types.ts` and `api/cast-crew-api.ts` with functions for fetching cast/crew with filters (type, search), getting by ID, creating, updating, and deleting.
   - **Status:** ✅ Completed

5. **Cast/Crew Hooks**
   - `useCastCrew`, `useCastCrewById`, `useCreateCastCrew`, `useUpdateCastCrew`, `useDeleteCastCrew` using TanStack Query.
   - **Status:** ✅ Completed

6. **Cast/Crew UI Components**
   - `cast-crew-table.tsx`, `cast-crew-filters.tsx`, `cast-crew-form-dialog.tsx` (with image preview), and `delete-cast-crew-dialog.tsx` under `src/features/content/cast-crew/components/`.
   - **Status:** ✅ Completed

7. **Channels Types & API Layer**
   - `src/features/content/channels/types.ts` and `api/channels-api.ts` with functions for fetching all channels, getting by ID, creating, updating, and deleting.
   - **Status:** ✅ Completed

8. **Channels Hooks**
   - `useChannels`, `useChannel`, `useCreateChannel`, `useUpdateChannel`, `useDeleteChannel` using TanStack Query.
   - **Status:** ✅ Completed

9. **Channels UI Components**
   - `channels-table.tsx`, `channel-filters.tsx`, `channel-form-dialog.tsx` (with stream configuration, logo/banner previews, status switches), and `delete-channel-dialog.tsx` under `src/features/content/channels/components/`.
   - **Status:** ✅ Completed

10. **Content Routes & Navigation**
    - Created routes for genres (`/content/genres`), cast-crew (`/content/cast-crew`), and channels (`/content/channels`). Updated sidebar with Genres, Cast/Crew, and Channels links.
    - **Status:** ✅ Completed

11. **Quality Checks**
    - `npm run build` and `npm run lint` pass with no new errors; all content management features render correctly with loading and error states.
    - **Status:** ✅ Completed

---

### Phase 7 Completion Criteria

✅ Genres list displays all genres with name and slug  
✅ Admins can create, edit, delete genres via forms with auto-slug generation  
✅ Cast/Crew list supports filtering by type and search by name  
✅ Admins can create, edit, delete cast/crew with image URL input and preview  
✅ Channels list displays all channels with status indicators and stream type badges  
✅ Admins can create, edit, delete channels with stream configuration (HLS/DASH/MP4)  
✅ All forms validate inputs with Zod schemas  
✅ Sidebar navigation includes Genres, Cast/Crew, and Channels links  
✅ TypeScript build and lint pass with no new issues

---

## Phase 8: Engagement Management – Comments, Reviews, Reports

**Status:** Completed  
**Duration:** Week 7–8  
**Goal:** Implement comprehensive engagement management modules for Comments, Reviews, and Reports to enable administrators to moderate user-generated content, manage reports, and maintain platform quality.

### Overview

Phase 8 focuses on building out the engagement management module, providing administrators with complete moderation capabilities:

1. Define typed comment, review, and report models and API functions.
2. Implement engagement query and mutation hooks for all three entities.
3. Build reusable moderation interface components (tables, filters, dialogs, bulk actions).
4. Integrate engagement management routes into the admin panel.
5. Ensure robust error handling, loading states, and admin permissions.

### Phase 8 Tasks

1. **Comments Types & API Layer**
   - `src/features/engagement/comments/types.ts` and `api/comments-api.ts` with functions for fetching paginated comments, getting by ID, deleting, and bulk deleting.
   - **Status:** ✅ Completed

2. **Comments Hooks**
   - `useComments`, `useComment`, `useDeleteComment`, `useBulkDeleteComments` using TanStack Query.
   - **Status:** ✅ Completed

3. **Comments UI Components**
   - `comments-table.tsx`, `comment-filters.tsx`, `comment-details-dialog.tsx`, `delete-comment-dialog.tsx`, `comments-bulk-actions.tsx`, and `bulk-delete-comments-dialog.tsx` under `src/features/engagement/comments/components/`.
   - **Status:** ✅ Completed

4. **Reviews Types & API Layer**
   - `src/features/engagement/reviews/types.ts` and `api/reviews-api.ts` with functions for fetching paginated reviews, getting by ID, deleting, and bulk deleting.
   - **Status:** ✅ Completed

5. **Reviews Hooks**
   - `useReviews`, `useReview`, `useDeleteReview`, `useBulkDeleteReviews` using TanStack Query.
   - **Status:** ✅ Completed

6. **Reviews UI Components**
   - `reviews-table.tsx` (with star rating display), `review-filters.tsx`, `review-details-dialog.tsx`, `delete-review-dialog.tsx`, `reviews-bulk-actions.tsx`, and `bulk-delete-reviews-dialog.tsx` under `src/features/engagement/reviews/components/`.
   - **Status:** ✅ Completed

7. **Reports Types & API Layer**
   - `src/features/engagement/reports/types.ts` and `api/reports-api.ts` with functions for fetching all reports, getting by ID, and updating report status.
   - **Status:** ✅ Completed

8. **Reports Hooks**
   - `useReports`, `useReport`, `useUpdateReportStatus` using TanStack Query.
   - **Status:** ✅ Completed

9. **Reports UI Components**
   - `reports-table.tsx` (with status and reason badges), `report-filters.tsx`, `report-details-dialog.tsx`, and `resolve-report-dialog.tsx` (with status workflow dropdown) under `src/features/engagement/reports/components/`.
   - **Status:** ✅ Completed

10. **Engagement Routes & Navigation**
    - Created routes for comments (`/engagement/comments`), reviews (`/engagement/reviews`), and reports (`/engagement/reports`). Updated sidebar with Engagement section containing Comments, Reviews, and Reports links.
    - **Status:** ✅ Completed

11. **Backend Updates**
    - Updated backend `comments.service.ts` and `reviews.service.ts` to allow admin deletion of any comment/review (not just owner).
    - Updated backend controllers to pass admin role flag to services.
    - **Status:** ✅ Completed

12. **Accessibility & Quality Checks**
    - Added `DialogDescription` to all dialogs across the admin panel (27 dialogs total) to fix accessibility warnings.
    - `npm run build` and `npm run lint` pass with no new errors; all engagement management features render correctly with loading and error states.
    - **Status:** ✅ Completed

---

### Phase 8 Completion Criteria

✅ Comments list supports pagination, filtering by target type/ID, and sorting  
✅ Admins can view comment details with author and target content context  
✅ Admins can delete individual comments and bulk delete selected comments  
✅ Reviews list supports pagination, filtering by target type/ID/rating, and sorting  
✅ Admins can view review details with author, rating, and target content context  
✅ Admins can delete individual reviews and bulk delete selected reviews  
✅ Reports list displays all reports with status indicators and reason badges  
✅ Admins can filter reports by status, target type, and reason  
✅ Admins can update report status (Pending → Reviewed → Resolved/Dismissed)  
✅ All tables show loading and error states appropriately  
✅ Sidebar navigation includes Engagement section with Comments, Reviews, and Reports links  
✅ Backend supports admin deletion of any comment/review (not just owner)  
✅ All dialogs have DialogDescription for accessibility compliance  
✅ TypeScript build and lint pass with no new issues  
✅ All moderation operations work correctly against backend APIs

---

## Phase 9: Monetization – Plans, Coupons, Transactions, Taxes, Payment Methods

**Status:** Completed  
**Duration:** Week 8–9  
**Goal:** Implement full monetization management for subscription plans, coupons, transactions, taxes, and payment methods, enabling admins to configure pricing, discounts, billing, and gateways.

### Overview

Phase 9 adds a dedicated Monetization section to the admin panel that exposes all billing-related resources:

1. Subscription plans: list, filter, create/update/delete.
2. Coupons: list, filter, validate, and manage discount codes.
3. Transactions: view, filter, inspect details, and export to CSV.
4. Taxes: configure tax rates per country.
5. Payment methods: configure gateways and credentials securely.

### Phase 9 Tasks

1. **Subscription Plans**
   - Added `src/features/monetization/plans/types.ts` and `api/plans-api.ts` with helpers for `GET /api/subscriptions/plans` and `GET /api/subscriptions/plans/:id`, plus assumed `POST/PUT/DELETE` admin endpoints.
   - Implemented `usePlans`, `usePlan`, `useCreatePlan`, `useUpdatePlan`, and `useDeletePlan` hooks using `queryKeys.plans`.
   - Built `plan-filters.tsx`, `plans-table.tsx`, `plan-form-dialog.tsx`, and `delete-plan-dialog.tsx` for full CRUD and filtering.
   - Added `routes/_authenticated/monetization/plans/index.tsx` to host the plans management page.

2. **Coupons**
   - Created `src/features/monetization/coupons/types.ts` and `api/coupons-api.ts` mapping to `/api/coupons` and `/api/coupons/validate/:code`.
   - Implemented hooks: `useCoupons`, `useCoupon`, `useCreateCoupon`, `useUpdateCoupon`, `useDeleteCoupon`, and `useValidateCoupon`.
   - Built `coupon-filters.tsx`, `coupons-table.tsx`, `coupon-form-dialog.tsx`, `coupon-usage-stats.tsx`, and `delete-coupon-dialog.tsx`.
   - Added `routes/_authenticated/monetization/coupons/index.tsx` for the coupons management page.

3. **Transactions**
   - Added `src/features/monetization/transactions/types.ts` and `api/transactions-api.ts` using `/api/transactions/admin/all` and `/api/transactions/:id`.
   - Implemented `useTransactions` and `useTransaction` hooks with client-side filtering by type/status.
   - Built `transactions-filters.tsx`, `transactions-table.tsx`, `transaction-details-dialog.tsx`, and `transaction-export-button.tsx` (CSV export).
   - Created `routes/_authenticated/monetization/transactions/index.tsx` to display and analyze transactions.

4. **Taxes**
   - Created `src/features/monetization/taxes/types.ts` and `api/taxes-api.ts` mapping to `/api/taxes`, `/api/taxes/:id`, and `/api/taxes/country/:country`.
   - Implemented `useTaxes`, `useTax`, `useCreateTax`, `useUpdateTax`, and `useDeleteTax`.
   - Built `tax-form-dialog.tsx`, `taxes-table.tsx`, and `delete-tax-dialog.tsx`.
   - Added `routes/_authenticated/monetization/taxes/index.tsx` for the taxes configuration page.

5. **Payment Methods**
   - Added `src/features/monetization/payment-methods/types.ts` and `api/payment-methods-api.ts` mapping to `/api/payment-methods/admin/all`, `/api/payment-methods/:id`, and CRUD endpoints.
   - Implemented hooks: `usePaymentMethods`, `usePaymentMethod`, `useCreatePaymentMethod`, `useUpdatePaymentMethod`, and `useDeletePaymentMethod`.
   - Built `payment-methods-table.tsx`, `payment-method-form-dialog.tsx` (with JSON config editor), and `delete-payment-method-dialog.tsx`.
   - Created `routes/_authenticated/monetization/payment-methods/index.tsx` for gateway configuration.

6. **Shared Monetization Utilities**
   - Added `src/features/monetization/types.ts` with shared enums (`billingCycles`, `subscriptionStatuses`, `paymentStatuses`, `discountTypes`) and Zod helpers (`moneySchema`, `percentageSchema`, `optionalDateSchema`, `dateRangeSchema`).
   - Extended `src/lib/query-keys.ts` with `plans.list`, `transactions.list`, and other monetization keys where needed.

7. **Navigation, Protection & Quality**
   - Updated `src/components/common/sidebar.tsx` to include a **Monetization** section with links to Plans, Coupons, Transactions, Taxes, and Payment Methods.
   - All monetization routes are nested under `_authenticated`, protected by `requireAuth` and `AdminLayout`.
   - Ensured each page has consistent layout, loading/empty/error states, and uses ShadCN UI + existing patterns.
   - Ran `npm run lint` and `npm run build` successfully after monetization changes.

### Phase 9 Completion Criteria

✅ Plans page lists plans with filters and supports create/edit/delete  
✅ Coupons page lists coupons with filters, supports create/edit/delete, and shows basic usage stats  
✅ Transactions page lists transactions, supports filtering and CSV export, and shows details dialog  
✅ Taxes page lists taxes and supports create/edit/delete with country-based configuration  
✅ Payment methods page lists gateways and supports create/edit/delete with JSON config editor  
✅ Monetization section appears in the sidebar under the authenticated admin layout  
✅ All monetization routes are protected (under `_authenticated`) and follow existing UX patterns  
✅ TypeScript build and lint pass with no new issues after Phase 9 changes  
✅ Lint/build and basic manual verification of CRUD, filters, and CSV export have been completed

## Phase 10: CMS & Configuration – Banners, Settings, Pages

**Status:** Completed  
**Duration:** Week 9–10  
**Goal:** Implement CMS and configuration tools for managing promotional banners, global settings, and static pages from the admin panel.

### Overview

Phase 10 introduces a dedicated CMS section that centralizes configuration and marketing content:

1. Banners: configure promotional artwork and deep links for different devices and positions.
2. Settings: manage grouped application, payment, auth, integration, mail, and SEO settings.
3. Pages: manage static HTML pages such as About, FAQ, Terms, and Privacy.

### Phase 10 Tasks

1. **CMS Foundations**
   - Added shared CMS enums and Zod helpers in `src/features/cms/types.ts` (banner devices/positions, setting groups, slug and JSON helpers).
   - Extended `src/lib/query-keys.ts` with `banners`, `settings`, and `pages` query keys.
   - **Status:** ✅ Completed

2. **Banners Module**
   - Created `src/features/cms/banners/types.ts` and `api/banners-api.ts` mapping to `/api/banners`, `/api/banners/admin/all`, and `/api/banners/:id` (GET/POST/PUT/DELETE).
   - Implemented hooks: `useBanners`, `useBanner`, `useCreateBanner`, `useUpdateBanner`, `useDeleteBanner` with cache invalidation and toasts.
   - Built `banner-filters.tsx`, `banners-table.tsx`, `banner-form-dialog.tsx`, `banner-preview.tsx`, and `delete-banner-dialog.tsx` for full CRUD, filtering, and visual previews.
   - Added `routes/_authenticated/cms/banners/index.tsx` for the Banners management page.
   - **Status:** ✅ Completed

3. **Settings Module**
   - Created `src/features/cms/settings/types.ts` and `api/settings-api.ts` mapping to `/api/settings`, `/api/settings/group/:group`, and `/api/settings/:key` (GET/POST/PUT/DELETE).
   - Implemented hooks: `useSettings`, `useSettingsByGroup`, `useCreateOrUpdateSetting`, `useUpdateSetting`, and `useDeleteSetting` with group/key-based invalidation.
   - Built `settings-tabs.tsx` and group panels under `settings/` (`app-settings.tsx`, `payment-settings.tsx`, `auth-settings.tsx`, `firebase-settings.tsx`, `ads-settings.tsx`, `tmdb-settings.tsx`, `mail-settings.tsx`, `seo-settings.tsx`) using a shared `common-settings-form.tsx`.
   - Added `routes/_authenticated/cms/settings/index.tsx` for the tabbed Settings page.
   - **Status:** ✅ Completed

4. **Pages Module**
   - Created `src/features/cms/pages/types.ts` and `api/pages-api.ts` mapping to `/api/pages/admin/all`, `/api/pages/:slug`, and admin CRUD endpoints.
   - Implemented hooks: `usePages`, `usePage`, `useCreatePage`, `useUpdatePage`, and `useDeletePage` using `queryKeys.pages`.
   - Built `pages-table.tsx`, `page-form-dialog.tsx` (with slug auto-generation and HTML textarea), and `delete-page-dialog.tsx` for static pages CRUD.
   - Added `routes/_authenticated/cms/pages/index.tsx` for the Pages management page with a simple title/slug search bar.
   - **Status:** ✅ Completed

5. **Navigation, Protection & Quality**
   - Updated `src/components/common/sidebar.tsx` to include a **CMS** section with links to Banners, Settings, and Pages.
   - Ensured all CMS routes are nested under `_authenticated/cms/*`, inheriting `requireAuth` and `AdminLayout` protection.
   - Used consistent layouts, loading/empty/error states, and toasts across CMS pages; addressed new lint findings in CMS files (IDs, unused parameters, literal keys).
   - **Status:** ✅ Completed

### Phase 10 Completion Criteria

✅ Banners page lists banners with device/position/active filters, supports create/edit/delete, and shows a live preview  
✅ Settings page provides grouped tabs (app, payment, auth, firebase, ads, tmdb, mail, seo) with per-setting forms and validation  
✅ Pages page lists static pages with search by title/slug and supports slugged create/edit/delete operations  
✅ CMS section appears in the sidebar under the authenticated admin layout, with all routes protected under `_authenticated/cms/*`  
✅ New CMS code passes TypeScript and lint checks locally for the touched files

---

## Implementation Status Summary

**Completed Phases:**

- ✅ Phase 1: Project Setup & Foundation
- ✅ Phase 2: Authentication & Layout
- ✅ Phase 3: Dashboard & Analytics
- ✅ Phase 4: User Management
- ✅ Phase 5: Content Management – Videos & Movies
- ✅ Phase 6: Content Management – TV Shows, Seasons, Episodes
- ✅ Phase 7: Content Management – Genres, Cast/Crew, Channels
- ✅ Phase 8: Engagement Management – Comments, Reviews, Reports
- ✅ Phase 9: Monetization – Plans, Coupons, Transactions, Taxes, Payment Methods
- ✅ Phase 10: CMS & Configuration – Banners, Settings, Pages
