# Frontend Application Documentation

**Version:** 2.0.0  
**Last Updated:** 2025-01-29  
**Project:** Vidstie - Video Streaming Platform Frontend  
**Framework:** React 19 + TypeScript + Vite + TanStack Router + TanStack Query

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Core Concepts](#core-concepts)
6. [Feature Modules](#feature-modules)
7. [API Integration](#api-integration)
8. [State Management](#state-management)
9. [Routing](#routing)
10. [Styling & UI Components](#styling--ui-components)
11. [Authentication & Authorization](#authentication--authorization)
12. [Development Guidelines](#development-guidelines)
13. [Testing](#testing)
14. [Build & Deployment](#build--deployment)
15. [Troubleshooting](#troubleshooting)
16. [API Reference](#api-reference)

---

## Overview

### What is This Application?

Vidstie is a modern video streaming platform frontend built with React and TypeScript. It provides a comprehensive interface for users to browse, watch, and manage video content including movies, TV shows, live streams, and more.

### Key Features

- **Content Management**: Browse movies, TV shows, episodes, and live channels
- **User Authentication**: Secure login, registration, and profile management
- **Multi-Profile Support**: Create and manage multiple user profiles with parental controls
- **Watchlist & History**: Save content for later and track viewing history
- **Subscriptions**: Manage subscription plans and payments
- **Pay-Per-View**: Purchase individual content items
- **Comments & Reviews**: Engage with content through comments and ratings
- **Search & Discovery**: Advanced search and filtering capabilities
- **Responsive Design**: Mobile-first, responsive UI with dark/light theme support

### Application Type

- **Type**: Single Page Application (SPA)
- **Rendering**: Client-side rendering with TanStack Router
- **State Management**: TanStack Query for server state, React hooks for local state
- **Styling**: Tailwind CSS with ShadCN UI components

---

## Architecture & Technology Stack

### Core Technologies

| Technology          | Version | Purpose                     |
| ------------------- | ------- | --------------------------- |
| **React**           | 19.2.0  | UI library                  |
| **TypeScript**      | 5.7.2   | Type safety                 |
| **Vite**            | 7.1.7   | Build tool and dev server   |
| **TanStack Router** | 1.132.0 | File-based routing          |
| **TanStack Query**  | 5.66.5  | Server state management     |
| **Axios**           | 1.13.2  | HTTP client                 |
| **Tailwind CSS**    | 4.0.6   | Utility-first CSS framework |
| **ShadCN UI**       | Latest  | Component library           |
| **Zod**             | 4.1.12  | Schema validation           |
| **Vitest**          | 3.0.5   | Testing framework           |

### Development Tools

- **Biome**: Linting and formatting
- **TanStack Devtools**: Router and Query debugging
- **TypeScript**: Static type checking
- **Vite Dev Server**: Hot module replacement

### Architecture Patterns

1. **Feature-Based Architecture**: Code organized by features (auth, movies, subscriptions, etc.)
2. **Separation of Concerns**: Clear separation between UI, logic, and data layers
3. **API Layer Pattern**: Centralized API client with interceptors
4. **Hook Pattern**: Custom hooks for reusable logic
5. **Component Composition**: Small, composable components

---

## Project Structure

```
React App/main/
├── src/
│   ├── assets/              # Static assets (images, icons)
│   ├── components/          # Shared UI components
│   │   ├── common/         # Common components (navbar, footer, etc.)
│   │   └── ui/             # ShadCN UI components
│   ├── config/             # Configuration files
│   │   ├── api.ts         # Axios instance and interceptors
│   │   └── env.ts         # Environment variables
│   ├── features/          # Feature modules (organized by domain)
│   │   ├── auth/          # Authentication feature
│   │   │   ├── api/       # API functions
│   │   │   ├── components/# Feature-specific components
│   │   │   ├── hooks/     # Custom hooks
│   │   │   ├── types.ts   # TypeScript types
│   │   │   └── README.md  # Feature documentation
│   │   ├── movies/        # Movies feature
│   │   ├── tv-shows/      # TV Shows feature
│   │   └── ...            # Other features
│   ├── integrations/      # Third-party integrations
│   │   └── tanstack-query/# TanStack Query setup
│   ├── lib/               # Shared utilities
│   │   ├── api-response.ts# API response types
│   │   ├── api-errors.ts  # Standardized error messages
│   │   ├── auth-guard.ts  # Route guards
│   │   ├── auth-init.ts   # Auth initialization
│   │   ├── logger.ts         # Logging utility
│   │   ├── query-keys.ts  # Query key factory
│   │   ├── query.ts       # Query client setup
│   │   └── utils.ts       # Utility functions
│   ├── routes/            # File-based routes
│   │   ├── __root.tsx     # Root layout
│   │   ├── index.tsx      # Home page
│   │   ├── auth/          # Auth routes
│   │   ├── movies/        # Movie routes
│   │   └── ...            # Other routes
│   ├── types/             # Global TypeScript types
│   ├── utils/             # Utility functions
│   ├── main.tsx           # Application entry point
│   ├── router.tsx         # Router configuration
│   └── styles.css         # Global styles
├── public/                # Public static files
├── dist/                  # Build output
├── node_modules/          # Dependencies
├── .vscode/               # VS Code settings
├── .cursor/               # Cursor IDE rules
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── biome.json             # Biome configuration
└── README.md              # Project README
```

### Directory Conventions

#### Feature Module Structure

Every feature follows this structure:

```
features/<feature-name>/
├── api/              # API functions (pure functions, no hooks)
├── components/       # Feature-specific React components
├── hooks/            # Custom React hooks (useQuery, useMutation)
├── types.ts          # TypeScript type definitions
└── README.md         # Feature documentation
```

#### Component Organization

- **`components/common/`**: Shared components used across multiple features
- **`components/ui/`**: ShadCN UI components (buttons, inputs, dialogs, etc.)
- **`features/<feature>/components/`**: Feature-specific components

#### Route Organization

- **`routes/`**: File-based routing (TanStack Router)
- File names map directly to URLs:
  - `routes/index.tsx` → `/`
  - `routes/movies/$id.tsx` → `/movies/:id`
  - `routes/auth/login.tsx` → `/auth/login`

---

## Getting Started

### Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (or yarn/pnpm)
- **Git**: For version control

### Installation

1. **Clone the repository** (if applicable):

   ```bash
   git clone <repository-url>
   cd "React App/main"
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:

   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_APP_TITLE=PunjabiDub
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

### Available Scripts

| Script     | Command          | Description                           |
| ---------- | ---------------- | ------------------------------------- |
| **dev**    | `npm run dev`    | Start development server on port 3000 |
| **build**  | `npm run build`  | Build for production                  |
| **serve**  | `npm run serve`  | Preview production build              |
| **test**   | `npm run test`   | Run tests with Vitest                 |
| **lint**   | `npm run lint`   | Lint code with Biome                  |
| **format** | `npm run format` | Format code with Biome                |
| **check**  | `npm run check`  | Run lint and format checks            |

### Development Workflow

1. **Create a feature branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** following the [Development Guidelines](#development-guidelines)

3. **Test your changes**:

   ```bash
   npm run test
   npm run lint
   ```

4. **Build to verify**:
   ```bash
   npm run build
   ```

---

## Core Concepts

### 1. Utilities & Libraries

The application includes several shared utilities in `src/lib/`:

#### Logger Utility (`src/lib/logger.ts`)

Centralized logging with appropriate log levels:

```typescript
import { logger } from "@/lib/logger";

logger.debug("Debug message", data); // Only in development
logger.info("Info message", data);
logger.warn("Warning message", data);
logger.error("Error message", error, data);
```

**Features**:
- Development-only debug logs
- Consistent logging format
- Can be extended for error tracking services
- Never use `console.*` directly

#### API Errors Utility (`src/lib/api-errors.ts`)

Standardized error message constants:

```typescript
import { API_ERRORS } from "@/lib/api-errors";

// Generic errors
throw new Error(API_ERRORS.MISSING_DATA_FIELD);
throw new Error(API_ERRORS.UNKNOWN_ERROR);

// Operation-specific errors
throw new Error(API_ERRORS.FETCH_FAILED("movies"));
throw new Error(API_ERRORS.CREATE_FAILED("profile"));
```

**Benefits**: Consistent error messages, easy updates, better UX.

#### Query Keys Factory (`src/lib/query-keys.ts`)

Type-safe, centralized query key management:

```typescript
import { queryKeys } from "@/lib/query-keys";

// Use factory instead of hardcoded arrays
queryKey: queryKeys.movies.list(params)
queryKey: queryKeys.user.all
```

**Features**: Type safety, prevents typos, easy refactoring, parameterized keys.

#### API Response Utilities (`src/lib/api-response.ts`)

Type-safe response handling:

```typescript
import { extractData, extractDataOrNull } from "@/lib/api-response";

// Extract data, throws if unsuccessful
const data = extractData(response);

// Extract data, returns null if unsuccessful
const data = extractDataOrNull(response);
```

### 2. File-Based Routing

TanStack Router uses file-based routing. Routes are automatically generated from files in the `src/routes/` directory.

**Example Route File**:

```typescript
// src/routes/movies/$id.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/$id")({
  component: MovieDetailPage,
});

function MovieDetailPage() {
  const { id } = Route.useParams();
  // Component implementation
}
```

**Route Parameters**:

- `$id` → Dynamic parameter (e.g., `/movies/123`)
- `index.tsx` → Index route (e.g., `/movies`)
- `__root.tsx` → Root layout (wraps all routes)

### 3. Feature Modules

Features are self-contained modules that include:

- API functions
- Components
- Hooks
- Types
- Documentation

**Example Feature Structure**:

```
features/movies/
├── api/
│   └── movies.ts          # API functions
├── hooks/
│   └── useMovies.ts       # React hooks
├── components/
│   └── movie-card.tsx     # Components
├── types.ts               # TypeScript types
└── README.md              # Documentation
```

### 4. API Layer Pattern

All API calls go through a centralized client:

```typescript
// src/config/api.ts
import { apiClient } from "@/config/api";

// API functions are pure functions
export const getMovies = async (params?: Params): Promise<Movie[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Movie[]>>("/movies", {
      params,
    });
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch movies");
    }
    if (!response.data) {
      throw new Error("Invalid response: missing data field");
    }
    return response.data;
  } catch (err) {
    throw err instanceof Error ? err : new Error("Unknown error");
  }
};
```

### 5. TanStack Query Pattern

Server state is managed with TanStack Query:

```typescript
// Custom hook using TanStack Query
export const useMovies = (params?: Params) => {
  return useQuery({
    queryKey: queryKeys.movies.list(params),
    queryFn: () => getMovies(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
```

### 6. Query Key Factory

Query keys are managed centrally in `src/lib/query-keys.ts`:

```typescript
// src/lib/query-keys.ts
export const queryKeys = {
  movies: {
    all: ["movies"] as const,
    list: (params?: Params) => ["movies", params] as const,
    detail: (id: string) => ["movies", id] as const,
    trending: () => ["movies", "trending"] as const,
    featured: () => ["movies", "featured"] as const,
    comingSoon: () => ["movies", "coming-soon"] as const,
  },
  // ... many more feature query keys
} as const;
```

**Benefits**:
- Type safety - prevents typos
- Centralized management - single source of truth
- Easy refactoring - change once, update everywhere
- Parameterized keys - supports dynamic query keys

**Usage**:
```typescript
import { queryKeys } from "@/lib/query-keys";

// In hooks
queryKey: queryKeys.movies.list(params)

// In mutations
queryClient.invalidateQueries({ queryKey: queryKeys.movies.all })
```

---

## Feature Modules

### Authentication (`features/auth/`)

**Purpose**: User authentication, registration, and session management.

**Components**:

- `login-form.tsx`: Login form component
- `register-form.tsx`: Registration form component

**Hooks**:

- `useAuth.ts`: Authentication hooks
  - `useLogin()`: Login mutation
  - `useRegister()`: Registration mutation
  - `useUser()`: Get current user
  - `useLogout()`: Logout function
  - `useValidateToken()`: Validate access token

**API Functions**:

- `login()`: Authenticate user
- `register()`: Create new user account
- `logout()`: End user session
- `getUser()`: Fetch current user profile
- `validateToken()`: Validate access token

**Types**:

```typescript
interface User {
  id: string;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  role: string;
  status: string;
}
```

**Usage Example**:

```typescript
import { useUser, useLogin } from "@/features/auth/hooks/useAuth";

function MyComponent() {
  const { data: user } = useUser();
  const login = useLogin();

  const handleLogin = () => {
    login.mutate({ email: "user@example.com", password: "password" });
  };
}
```

### Movies (`features/movies/`)

**Purpose**: Movie content management and display.

**Components**:

- `movie-card.tsx`: Movie card component for listings

**Hooks**:

- `useMovies.ts`: Movie data hooks
  - `useMovies()`: Fetch paginated movies
  - `useMovie(id)`: Fetch single movie
  - `useTrendingMovies()`: Fetch trending movies
  - `useFeaturedMovies()`: Fetch featured movies
  - `useComingSoonMovies()`: Fetch coming soon movies

**API Functions**:

- `getMovies()`: Get paginated movies with filters
- `getMovieById()`: Get movie by ID
- `getTrendingMovies()`: Get trending movies
- `getFeaturedMovies()`: Get featured movies
- `getComingSoonMovies()`: Get coming soon movies

**Types**:

```typescript
interface Movie {
  id: string;
  title: string;
  description?: string;
  thumbnail_url?: string;
  poster_url?: string;
  video_url?: string;
  duration?: number;
  release_date?: string;
  rating?: number;
  genres?: string[];
  access_type: "free" | "subscription" | "pay_per_view";
  plan_ids?: string[];
}
```

### TV Shows (`features/tv-shows/`)

**Purpose**: TV show content management.

**Components**:

- `tv-show-card.tsx`: TV show card component

**Hooks**:

- `useTvShows.ts`: TV show data hooks
  - `useTvShows()`: Fetch paginated TV shows
  - `useTvShow(id)`: Fetch single TV show

**API Functions**:

- `getTvShows()`: Get paginated TV shows
- `getTvShowById()`: Get TV show by ID
- `getTvShowSeasons()`: Get seasons for a TV show

### Episodes (`features/episodes/`)

**Purpose**: TV show episode content management and display.

**Components**:

- `episode-card.tsx`: Episode card component for listings

**Hooks**:

- `useEpisodes.ts`: Episode data hooks
  - `useEpisodes()`: Fetch paginated episodes with filters
  - `useEpisodesBySeason(seasonId)`: Fetch episodes for a season
  - `useEpisode(id)`: Fetch single episode

**API Functions**:

- `getPaginatedEpisodes()`: Get paginated episodes with filters (genre, year, search, etc.)
- `getEpisodesBySeason()`: Get episodes for a specific season
- `getEpisodeById()`: Get episode by ID

**Types**:

```typescript
interface Episode {
  id: string;
  tv_show_id: string;
  season_id: string;
  episode_number: number;
  title: string;
  description?: string;
  thumbnail_url?: string;
  streams?: Array<{ label?: string; type?: string; url: string }>;
  enable_subtitle?: boolean;
  subtitles?: Array<{ language: string; is_default: boolean; url: string }>;
  duration_minutes?: number;
  release_date?: string;
  access_type: "free" | "subscription" | "pay_per_view";
  plan_ids?: string[];
  pay_per_view_price?: number;
  seo_title?: string;
  seo_description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}
```

**Usage Example**:

```typescript
import { useEpisodes } from "@/features/episodes/hooks/useEpisodes";

function EpisodesList() {
  const { data, isLoading } = useEpisodes({
    page: 1,
    limit: 12,
    sort: "updatedAt",
    order: "DESC",
    genre: "action",
    year: 2024,
  });

  if (isLoading) return <LoadingState />;
  return <div>{/* Render episodes */}</div>;
}
```

### Profiles (`features/profiles/`)

**Purpose**: Multi-profile management with parental controls.

**Components**:

- `profile-selector.tsx`: Profile selection dropdown
- `profile-form.tsx`: Create/edit profile form
- `profile-card.tsx`: Profile display card
- `pin-entry-dialog.tsx`: PIN entry for protected profiles

**Hooks**:

- `useProfiles.ts`: Profile management hooks
  - `useProfiles()`: Fetch user profiles
  - `useProfile(id)`: Fetch single profile
  - `useCreateProfile()`: Create new profile
  - `useUpdateProfile()`: Update profile
  - `useDeleteProfile()`: Delete profile

**Features**:

- Multiple profiles per user
- Parental controls (age restrictions)
- PIN protection for profiles
- Profile avatars and names

### Subscriptions (`features/subscriptions/`)

**Purpose**: Subscription plan management and payments.

**Components**:

- `subscription-card.tsx`: Display subscription details
- `subscription-status-badge.tsx`: Status indicator
- `cancel-subscription-dialog.tsx`: Cancel subscription dialog

**Hooks**:

- `useSubscriptions.ts`: Subscription hooks
  - `useSubscriptions()`: Fetch user subscriptions
  - `useActiveSubscription()`: Get active subscription
  - `useCreateSubscription()`: Create subscription
  - `useCancelSubscription()`: Cancel subscription
- `usePlans.ts`: Plan hooks
  - `usePlans()`: Fetch available plans

**API Functions**:

- `getSubscriptions()`: Get user subscriptions
- `getActiveSubscription()`: Get active subscription
- `createSubscription()`: Subscribe to a plan
- `cancelSubscription()`: Cancel subscription
- `getPlans()`: Get available subscription plans

### Watch (`features/watch/`)

**Purpose**: Watchlist and viewing history management.

**Components**:

- `continue-watching-carousel.tsx`: Continue watching section
- `watchlist-item-card.tsx`: Watchlist item display
- `watch-history-item.tsx`: History item display

**Hooks**:

- `useWatchlist.ts`: Watchlist hooks
  - `useWatchlist()`: Fetch watchlist
  - `useAddToWatchlist()`: Add to watchlist
  - `useRemoveFromWatchlist()`: Remove from watchlist
- `useWatchHistory.ts`: History hooks
  - `useWatchHistory()`: Fetch viewing history
  - `useContinueWatching()`: Get continue watching items

**API Functions**:

- `getWatchlist()`: Get user watchlist
- `addToWatchlist()`: Add content to watchlist
- `removeFromWatchlist()`: Remove from watchlist
- `getWatchHistory()`: Get viewing history
- `getContinueWatching()`: Get continue watching items

### Comments & Reviews (`features/comments/`)

**Purpose**: User engagement through comments and reviews.

**Components**:

- `comment-list.tsx`: Display comments
- `comment-item.tsx`: Individual comment
- `comment-form.tsx`: Add/edit comment form
- `review-list.tsx`: Display reviews
- `review-item.tsx`: Individual review
- `review-form.tsx`: Add/edit review form
- `reply-item.tsx`: Reply to comment

**Hooks**:

- `useComments.ts`: Comment hooks
  - `useComments(videoId)`: Fetch comments
  - `useCreateComment()`: Create comment
  - `useUpdateComment()`: Update comment
  - `useDeleteComment()`: Delete comment
  - `useCreateReply()`: Reply to comment
- `useReviews.ts`: Review hooks
  - `useReviews(videoId)`: Fetch reviews
  - `useCreateReview()`: Create review
  - `useUpdateReview()`: Update review
  - `useDeleteReview()`: Delete review

### Pay-Per-View (`features/pay-per-view/`)

**Purpose**: Purchase individual content items.

**Components**:

- `ppv-purchase-button.tsx`: Purchase button
- `ppv-purchase-dialog.tsx`: Purchase confirmation dialog
- `ppv-access-check.tsx`: Access verification component

**Hooks**:

- `usePayPerView.ts`: PPV hooks
  - `usePPVAccess()`: Check access to PPV content
  - `usePurchasePPV()`: Purchase PPV content
  - `usePPVPurchases()`: Get user PPV purchases

### Notifications (`features/notifications/`)

**Purpose**: In-app notifications management.

**Components**:

- `NotificationDropdown`: Notification dropdown in navbar

**Hooks**:

- `useNotifications.ts`: Notification hooks
  - `useNotifications()`: Fetch notifications
  - `useUnreadCount()`: Get unread count
  - `useMarkAsRead()`: Mark notification as read
  - `useMarkAllAsRead()`: Mark all as read

### Devices (`features/devices/`)

**Purpose**: Device management and tracking.

**Components**:

- `device-card.tsx`: Device display card
- `remove-device-dialog.tsx`: Remove device confirmation

**Hooks**:

- `useDevices.ts`: Device hooks
  - `useDevices()`: Fetch user devices
  - `useRemoveDevice()`: Remove device
  - `useDeviceLimit()`: Get device limit

### Search (`features/search/`)

**Purpose**: Global content search functionality.

**API Functions**:

- `searchContent()`: Search across all content types

**Types**:

```typescript
interface SearchResult {
  movies: Movie[];
  tvShows: TVShow[];
  episodes: Episode[];
}
```

### Videos (`features/videos/`)

**Purpose**: Generic video player and management with advanced filtering.

**Components**:
- `video-player.tsx`: HTML5 video player with progress tracking (auto-saves every 30 seconds)
- `video-card.tsx`: Video display card for listings
- `filter-bar.tsx`: Advanced filtering component with genre, year, sort, access type, and limit filters
- `multi-select-year.tsx`: Multi-select year filter component
- `multi-select-genre.tsx`: Multi-select genre filter component

**Hooks**:
- `useVideos.ts`: Video data hooks
  - `useVideos()`: Fetch paginated videos with filters
  - `useVideo(id)`: Fetch single video
  - `useCategories()`: Fetch video categories

**API Functions**:
- `getVideos()`: Get paginated videos with filters (page, limit, sort, order)
- `getVideoById()`: Get video by ID
- `getVideoUrl()`: Get video streaming URL

**Types**:
```typescript
interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  accessLevel: string;
  // ... more fields
}
```

### Home (`features/home/`)

**Purpose**: Homepage content management and display.

**Components**:
- `HeroCarousel.tsx`: Hero carousel with banners or featured content
- `MovieCarousel.tsx`: Movie carousel component
- `PricingSection.tsx`: Pricing section component
- `PartnersMarquee.tsx`: Partners marquee component
- `video-carousel-section.tsx`: Video carousel section

**Hooks**:
- `useHomeData.ts`: Home data hooks
  - `useFeaturedVideos()`: Fetch featured videos
  - `usePopularVideos()`: Fetch popular videos
  - `useCategoryVideos()`: Fetch videos by category
  - `useAccessLevelVideos()`: Fetch videos by access level

**API Functions**:
- `getFeaturedVideos()`: Get featured videos
- `getPopularVideos()`: Get popular videos
- `getCategoryVideos()`: Get videos by category
- `getAccessLevelVideos()`: Get videos by access level

### Other Features

- **Banners** (`features/banners/`): Homepage banner management
  - API: `getBanners()` with position and device filters
  - Hooks: `useBanners()` with filters
  - README: ✅ Complete

- **Genres** (`features/genres/`): Genre categorization
  - Components: `genre-badge.tsx`
  - API: `getGenres()`
  - Hooks: `useGenres()`
  - README: ✅ Complete

- **Cast & Crew** (`features/cast-crew/`): Actor and crew information
  - Components: `cast-list.tsx`, `crew-list.tsx`, `person-card.tsx`
  - API: `getCastCrew()`, `getCastCrewById()`, `getCast()`, `getCrew()`
  - Hooks: `useCastCrew()`, `useCast()`, `useCrew()`
  - README: ✅ Complete

- **Channels** (`features/channels/`): Live TV channels
  - API: `getChannels()` with pagination and search
  - Hooks: `useChannels()`
  - README: ✅ Complete

- **Seasons** (`features/seasons/`): TV show seasons
  - Components: `season-card.tsx`
  - API: `getSeasons()`, `getSeasonById()`
  - Hooks: `useSeasons()`, `useSeason(id)`
  - README: ✅ Complete

- **Likes** (`features/likes/`): Like/dislike functionality
  - API: `toggleLikeDislike()`, `getLikeDislikeCounts()`, `getUserReaction()`
  - Hooks: `useToggleLikeDislike()` (with optimistic updates), `useLikeDislikeCounts()`, `useUserReaction()`
  - README: ✅ Complete

- **Transactions** (`features/transactions/`): Payment transaction history
  - API: `getTransactions()` with filters (type, status, pagination)
  - Hooks: `useTransactions()`
  - README: ✅ Complete

- **Payment** (`features/payment/`): Payment processing
  - Components: `pricing-table.tsx`
  - API: `processPayment()`, `updateSubscription()`
  - Hooks: `useProcessPayment()`, `useUpdateSubscription()` (updates user cache)
  - README: ✅ Complete

- **Payment Methods** (`features/payment-methods/`): Payment method management
  - API: `getPaymentMethods()`
  - Hooks: `usePaymentMethods()`
  - README: ✅ Complete

- **Taxes** (`features/taxes/`): Tax calculation
  - API: `getTaxesByCountry()`
  - Hooks: `useTaxes(country)`
  - README: ✅ Complete

- **Pages** (`features/pages/`): CMS pages (About, Privacy, etc.)
  - API: `getPages()`, `getPageBySlug()`
  - Hooks: `usePages()`, `usePage(slug)`
  - README: ✅ Complete

- **User** (`features/user/`): User profile management
  - Components: User profile components
  - API: `getUserVideos()`, `saveVideoUrl()`
  - Hooks: `useUserVideos()`, `useSaveVideoUrl()`
  - README: ✅ Complete

- **Video Metrics** (`features/video-metrics/`): Video analytics
  - API: `getVideoMetrics()`
  - Hooks: `useVideoMetrics()`
  - README: ✅ Complete

- **Live** (`features/live/`): Live streaming content
  - Components: `live-stream-card.tsx`
  - README: ✅ Complete

- **Coupons** (`features/coupons/`): Coupon code validation
  - Components: `coupon-input.tsx`, `coupon-validator.tsx`
  - API: `validateCoupon()`
  - Hooks: `useCoupons()`
  - README: ✅ Complete

- **Reports** (`features/reports/`): Content reporting
  - API: `createReport()`
  - README: ✅ Complete

- **Search** (`features/search/`): Global content search
  - API: `searchContent()` - searches across movies, TV shows, episodes
  - Types: `SearchResult` interface
  - README: ✅ Complete

**All 30 features have README.md files documenting their purpose, API endpoints, components, and hooks.**

---

## API Integration

### API Client Configuration

The API client is configured in `src/config/api.ts`:

```typescript
import { apiClient } from "@/config/api";
import { env } from "@/config/env";

// Base URL from environment
baseURL: env.VITE_API_URL || "http://localhost:3000/api";
```

**Request Interceptor**:
- Automatically adds `Authorization: Bearer <token>` header from `localStorage.getItem('token')`
- Token is injected for all authenticated requests

**Response Interceptor**:
- Unwraps `response.data` - returns `ApiResponse<T>` directly (not the full axios response)
- Handles 401 Unauthorized: Attempts token refresh via `/token/refresh` endpoint
- Handles 304 Not Modified: Preserves response for cache usage
- Extracts error messages from backend response format
- Converts all errors to `Error` objects

**Token Refresh Flow**:
1. On 401 response, interceptor attempts refresh
2. If refresh succeeds, retries original request with new token
3. If refresh fails, clears token and redirects to `/auth/login`

### API Response Format

All API responses follow this structure:

```typescript
// Base API response (src/lib/api-response.ts)
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  token?: string; // Optional, for auth endpoints
  refreshToken?: string; // Optional, for auth endpoints
}
```

### Authentication Endpoints

For authentication endpoints, use `AuthApiResponse<T>`:

```typescript
// Auth-specific API response
interface AuthApiResponse<T> extends ApiResponse<T> {
  token: string; // Required for auth endpoints
  refreshToken?: string; // Optional
}
```

### API Response Utilities

The `src/lib/api-response.ts` file provides utility functions:

```typescript
import { extractData, extractDataOrNull } from "@/lib/api-response";

// Extract data, throwing error if unsuccessful
const data = extractData(response); // Throws if !success or !data

// Extract data, returning null if unsuccessful
const data = extractDataOrNull(response); // Returns null if !success or !data
```

### API Function Pattern

All API functions follow this standardized pattern:

```typescript
import { apiClient } from "@/config/api";
import { ApiResponse } from "@/lib/api-response";
import { API_ERRORS } from "@/lib/api-errors";
import { logger } from "@/lib/logger";

export const getResource = async (params?: Params): Promise<ReturnType> => {
  try {
    // apiClient interceptor returns response.data (ApiResponse<T>)
    const response = await apiClient.get<ApiResponse<ReturnType>>("/endpoint", {
      params,
    });

    // Validate response
    if (!response.success) {
      throw new Error(response.message || API_ERRORS.FETCH_FAILED("resource"));
    }
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD);
    }

    return response.data;
  } catch (err) {
    // Log error
    logger.error(
      "Error fetching resource",
      err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
    );
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR);
  }
};
```

**Key Points**:
- Use `API_ERRORS` constants for consistent error messages
- Use `logger` instead of `console.*` for logging
- Response interceptor already unwraps `response.data`, so we get `ApiResponse<T>` directly
- Always validate `response.success` and `response.data` before returning

### Error Handling

1. **Network Errors**: Caught and re-thrown as Error objects
2. **401 Unauthorized**: Automatic token refresh attempt via interceptor
3. **Validation Errors**: Extracted from `response.message` or `response.error.message`
4. **User Feedback**: Errors displayed via toast notifications (Sonner)

### Standardized Error Messages

Use `API_ERRORS` constants from `src/lib/api-errors.ts` for consistent error messages:

```typescript
import { API_ERRORS } from "@/lib/api-errors";

// Generic errors
API_ERRORS.INVALID_RESPONSE
API_ERRORS.MISSING_DATA_FIELD
API_ERRORS.UNKNOWN_ERROR

// Operation-specific errors
API_ERRORS.FETCH_FAILED("movies")
API_ERRORS.CREATE_FAILED("profile")
API_ERRORS.UPDATE_FAILED("subscription")
API_ERRORS.DELETE_FAILED("comment")

// Auth-specific errors
API_ERRORS.LOGIN_FAILED
API_ERRORS.REGISTRATION_FAILED
API_ERRORS.TOKEN_VALIDATION_FAILED
```

**Benefits**:
- Consistent error messages across the application
- Easy to update error messages in one place
- Better user experience with uniform messaging
- Type-safe error message constants

### Token Management

- **Storage**: Access token stored in `localStorage.getItem('token')`
- **Refresh**: Automatic refresh on 401 responses
- **Injection**: Automatically added to request headers via interceptor
- **Cleanup**: Removed on logout or invalid token

---

## State Management

### Server State (TanStack Query)

All server state is managed with TanStack Query:

```typescript
// Query configuration (src/lib/query.ts)
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Query Hooks Pattern

```typescript
export const useResource = (params?: Params) => {
  return useQuery({
    queryKey: queryKeys.resource.list(params),
    queryFn: () => getResource(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!params?.id, // Conditional fetching
  });
};
```

### Mutation Hooks Pattern

**Simple Mutation** (with cache invalidation):

```typescript
export const useCreateResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createResource,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.resource.all,
        refetchType: "active",
      });
    },
  });
};
```

**Optimistic Update Mutation**:

Optimistic updates provide immediate UI feedback before server confirmation. Features with optimistic updates: profiles, subscriptions, devices, watchlist, comments, likes, reviews, notifications.

```typescript
export const useUpdateResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateResource,
    onMutate: async (newData) => {
      // 1. Cancel outgoing queries to prevent race conditions
      await queryClient.cancelQueries({ queryKey: queryKeys.resource.all });

      // 2. Snapshot previous value for rollback
      const previous = queryClient.getQueryData(queryKeys.resource.list());

      // 3. Optimistically update cache
      queryClient.setQueryData(queryKeys.resource.list(), (old) => {
        if (!old) return [newData];
        return old.map((item) => (item.id === newData.id ? newData : item));
      });

      // 4. Return context for rollback
      return { previous };
    },
    onError: (error, variables, context) => {
      // Rollback on error - restore previous state
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.resource.list(), context.previous);
      }
    },
    onSuccess: (newData) => {
      // Update with server response (more accurate than optimistic update)
      queryClient.setQueryData(queryKeys.resource.list(), (old) => {
        if (!old) return [newData];
        return old.map((item) => (item.id === newData.id ? newData : item));
      });
      
      // Invalidate to ensure consistency (refetchType: 'none' since we already updated)
      queryClient.invalidateQueries({
        queryKey: queryKeys.resource.all,
        refetchType: "none",
      });
    },
  });
};
```

**Optimistic Update Pattern**:
1. `onMutate`: Cancel queries, snapshot previous state, optimistically update cache
2. `onError`: Rollback to previous state if mutation fails
3. `onSuccess`: Update with server response, invalidate with `refetchType: 'none'` (since we already updated)

**Benefits**:
- Immediate UI feedback
- Better user experience
- Automatic rollback on error
- Server response ensures accuracy

### Local State (React Hooks)

Use React hooks for UI state:

```typescript
// Component state
const [isOpen, setIsOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState("");

// Form state
const [formData, setFormData] = useState<FormData>({});
```

### Query Key Factory

Query keys are managed centrally in `src/lib/query-keys.ts`. **All query keys must use the factory** - no hardcoded arrays allowed.

**Complete Query Key Structure**:

```typescript
export const queryKeys = {
  // Auth & User
  user: {
    all: ['user'] as const,
    detail: () => ['user'] as const,
  },
  
  // Movies
  movies: {
    all: ['movies'] as const,
    list: (params?: Params) => ['movies', params] as const,
    detail: (id: string) => ['movies', id] as const,
    trending: () => ['movies', 'trending'] as const,
    featured: () => ['movies', 'featured'] as const,
    comingSoon: () => ['movies', 'coming-soon'] as const,
  },
  
  // TV Shows
  tvShows: {
    all: ['tv-shows'] as const,
    list: (params?: Params) => ['tv-shows', params] as const,
    detail: (id: string) => ['tv-shows', id] as const,
    seasons: (id: string) => ['tv-shows', id, 'seasons'] as const,
  },
  
  // Episodes
  episodes: {
    all: ['episodes'] as const,
    list: (params?: Params) => ['episodes', params] as const,
    bySeason: (seasonId: string) => ['episodes', 'season', seasonId] as const,
    detail: (id: string) => ['episodes', id] as const,
  },
  
  // ... many more feature query keys
} as const;
```

**Usage Examples**:

```typescript
import { queryKeys } from "@/lib/query-keys";

// In query hooks
queryKey: queryKeys.movies.list(params)
queryKey: queryKeys.movies.detail(id)
queryKey: queryKeys.episodes.bySeason(seasonId)

// In mutations
queryClient.invalidateQueries({ queryKey: queryKeys.movies.all })
queryClient.setQueryData(queryKeys.user.all, userData)
queryClient.cancelQueries({ queryKey: queryKeys.comments.all })
```

**Benefits**:

- **Type Safety**: TypeScript ensures correct usage
- **Prevents Typos**: Compile-time errors for invalid keys
- **Easy Refactoring**: Change once, update everywhere
- **Centralized Management**: Single source of truth
- **Parameterized Keys**: Supports dynamic query keys with parameters

**Migration from Hardcoded Keys**:

```typescript
// ❌ WRONG - Hardcoded query keys
queryKey: ['movies', params]
queryKey: ['user']

// ✅ CORRECT - Use query key factory
queryKey: queryKeys.movies.list(params)
queryKey: queryKeys.user.all
```

---

## Routing

### File-Based Routing

TanStack Router uses file-based routing. Routes are automatically generated from files in `src/routes/`.

### Complete Route Structure

| File Path                                   | URL                               | Description                        | Auth Required |
| ------------------------------------------- | --------------------------------- | ---------------------------------- | ------------- |
| `routes/index.tsx`                          | `/`                               | Home page with featured content    | No            |
| `routes/about.tsx`                          | `/about`                          | About page                         | No            |
| `routes/contact.tsx`                        | `/contact`                        | Contact page                       | No            |
| `routes/privacy.tsx`                        | `/privacy`                        | Privacy policy page                | No            |
| `routes/catalog/index.tsx`                  | `/catalog`                        | Content catalog with search/filter (videos, movies, TV shows, episodes) | No            |
| `routes/movies/$id.tsx`                     | `/movies/:id`                     | Movie detail page                  | No            |
| `routes/tv-shows/$id.tsx`                   | `/tv-shows/:id`                   | TV show detail page                | No            |
| `routes/tv-shows/$id/seasons/$seasonId.tsx` | `/tv-shows/:id/seasons/:seasonId` | Season detail page (nested route)  | No            |
| `routes/seasons/$seasonId.tsx`             | `/seasons/:seasonId`              | Season detail page (standalone)    | No            |
| `routes/episodes/$id.tsx`                   | `/episodes/:id`                   | Episode detail page                | No            |
| `routes/watch/$videoId.tsx`                 | `/watch/:videoId`                 | Video player page                  | No            |
| `routes/category/$categoryId.tsx`           | `/category/:categoryId`           | Category browsing page             | No            |
| `routes/category/simple/$categoryId.tsx`    | `/category/simple/:categoryId`    | Simple category page               | No            |
| `routes/live/index.tsx`                     | `/live`                           | Live TV channels page              | No            |
| `routes/interview/$id.tsx`                  | `/interview/:id`                  | Interview content page             | No            |
| `routes/pages/$slug.tsx`                    | `/pages/:slug`                    | Dynamic CMS pages                  | No            |
| `routes/pricing/index.tsx`                  | `/pricing`                        | Subscription pricing page          | No            |
| `routes/pricing.tsx`                        | `/pricing`                        | Legacy pricing page (redirects)    | No            |
| `routes/auth/login.tsx`                     | `/auth/login`                     | Login page                         | Guest only    |
| `routes/auth/register.tsx`                  | `/auth/register`                  | Registration page                  | Guest only    |
| `routes/auth/forgot-password.tsx`           | `/auth/forgot-password`           | Password reset request             | Guest only    |
| `routes/auth/reset-password.tsx`            | `/auth/reset-password`            | Password reset form                | Guest only    |
| `routes/reset-password.$token.tsx`          | `/reset-password/:token`          | Password reset with token          | Guest only    |
| `routes/profile.tsx`                        | `/profile`                        | User profile management            | Yes           |
| `routes/profiles.tsx`                       | `/profiles`                       | Multi-profile management           | Yes           |
| `routes/watchlist.tsx`                      | `/watchlist`                      | User watchlist                     | Yes           |
| `routes/subscriptions.tsx`                  | `/subscriptions`                  | Subscription management            | Yes           |
| `routes/devices.tsx`                        | `/devices`                        | Device management                  | Yes           |
| `routes/transactions.tsx`                   | `/transactions`                   | Transaction history                | Yes           |
| `routes/payment/success.tsx`                | `/payment/success`                | Payment success callback           | No            |
| `routes/payment/cancel.tsx`                 | `/payment/cancel`                 | Payment cancellation callback      | No            |
| `routes/not-found.tsx`                      | `*`                               | 404 Not Found page                 | No            |

### Route Parameters

Dynamic parameters use `$` prefix:

```typescript
// routes/movies/$id.tsx
export const Route = createFileRoute("/movies/$id")({
  component: MovieDetailPage,
});

function MovieDetailPage() {
  const { id } = Route.useParams(); // Get :id from URL
  // ...
}
```

### Route Guards

Protect routes with authentication using `requireAuth()` and `requireGuest()` from `src/lib/auth-guard.ts`:

**Protected Routes** (require authentication):

```typescript
// routes/profile.tsx
import { requireAuth } from "@/lib/auth-guard";

export const Route = createFileRoute("/profile")({
  beforeLoad: async () => {
    await requireAuth(); // Redirects to /auth/login if not authenticated
  },
  component: ProfilePage,
});
```

**Guest-Only Routes** (require NOT being authenticated):

```typescript
// routes/auth/login.tsx
import { requireGuest } from "@/lib/auth-guard";

export const Route = createFileRoute("/auth/login")({
  beforeLoad: async () => {
    await requireGuest(); // Redirects to / if already authenticated
  },
  component: LoginPage,
});
```

**How Route Guards Work**:
1. `requireAuth()`: Checks for token and user in cache, attempts to fetch user if token exists, redirects to login if not authenticated
2. `requireGuest()`: Checks if user is authenticated, redirects to home if already logged in
3. Both functions integrate with query cache for efficient user data access

### Navigation

```typescript
import { Link, useNavigate } from '@tanstack/react-router'

// Link component
<Link to="/movies/$id" params={{ id: '123' }}>View Movie</Link>

// Programmatic navigation
const navigate = useNavigate()
navigate({ to: '/movies/$id', params: { id: '123' } })
```

### Root Layout

The root layout (`routes/__root.tsx`) wraps all routes:

```typescript
export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <ErrorBoundary>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet /> {/* Route content appears here */}
        </main>
        <Footer />
        <Toaster />
      </div>
    </ErrorBoundary>
  )
}
```

### Search Parameters & Query Strings

TanStack Router supports search parameters for filtering and pagination:

```typescript
// Define search schema with Zod
const catalogSearchSchema = z.object({
  search: z.string().optional(),
  type: z
    .enum(["video", "movie", "tv-show", "episode"])
    .optional()
    .default("video"),
  genre: z.string().optional().default("All"),
  year: z.string().optional().default("All"),
  sort: z.string().optional().default("featured"),
  page: z.number().optional().default(1),
});

export const Route = createFileRoute("/catalog/")({
  validateSearch: catalogSearchSchema,
  component: CatalogPage,
});

// Use search params in component
function CatalogPage() {
  const { search, type, genre, page } = Route.useSearch();
  // ...
}
```

### Route Preloading

Routes can be preloaded for better performance:

```typescript
// In router configuration
const router = createRouter({
  routeTree,
  defaultPreload: "intent", // Preload on hover/focus
  defaultPreloadStaleTime: 0,
});
```

### Route Loaders

Routes can use loaders to fetch data before rendering:

```typescript
export const Route = createFileRoute("/movies/$id")({
  loader: async ({ params }) => {
    const movie = await getMovieById(params.id);
    return { movie };
  },
  component: MovieDetailPage,
});

function MovieDetailPage() {
  const { movie } = Route.useLoaderData();
  // ...
}
```

---

## Styling & UI Components

### Tailwind CSS

The project uses Tailwind CSS 4.0 with a custom configuration.

**Key Features**:

- Mobile-first responsive design
- Dark mode support
- Custom color palette
- Utility classes

**Common Patterns**:

```typescript
// Container
<div className="container mx-auto px-4 sm:px-6 lg:px-8">

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Dark mode
<div className="bg-background dark:bg-background-dark">
```

### ShadCN UI Components

ShadCN UI components are located in `src/components/ui/`.

**Available Components**:

- `button.tsx`: Button component with variants
- `input.tsx`: Input field
- `card.tsx`: Card container
- `dialog.tsx`: Modal dialog
- `dropdown-menu.tsx`: Dropdown menu
- `tabs.tsx`: Tab navigation
- `avatar.tsx`: User avatar
- `badge.tsx`: Badge/label
- `carousel.tsx`: Carousel slider
- `skeleton.tsx`: Loading skeleton
- `toaster.tsx`: Toast notifications
- And more...

**Usage Example**:

```typescript
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Click me</Button>
      </CardContent>
    </Card>
  )
}
```

### Theme System

Theme management via `ThemeProvider`:

```typescript
// src/components/theme-provider.tsx
import { ThemeProvider, useTheme } from "@/components/theme-provider";

// In component
const { theme, setTheme } = useTheme();
// theme: 'light' | 'dark' | 'system'
```

### Utility Functions

**Class Name Merging**:

```typescript
import { cn } from '@/lib/utils'

// Merge Tailwind classes
<div className={cn('base-class', condition && 'conditional-class')}>
```

### Common Components

**Located in `src/components/common/`**:

- `navbar.tsx`: Main navigation bar with user menu, notifications, theme toggle
- `footer.tsx`: Footer component with links and copyright
- `loading-state.tsx`: Loading spinner component
- `error-state.tsx`: Error display component with retry option
- `empty-state.tsx`: Empty state message component
- `error-boundary.tsx`: React error boundary for catching component errors
- `not-found.tsx`: 404 Not Found page component
- `upgrade-prompt.tsx`: Upgrade prompt for premium features

### Feature-Specific Components

**Videos Feature** (`src/features/videos/components/`):
- `video-player.tsx`: HTML5 video player with progress tracking
- `video-card.tsx`: Video display card for listings
- `filter-bar.tsx`: Advanced filtering component with genre, year, sort, access type filters
- `multi-select-year.tsx`: Multi-select year filter component
- `multi-select-genre.tsx`: Multi-select genre filter component

**Home Feature** (`src/features/home/components/`):
- `HeroCarousel.tsx`: Hero carousel with banners or featured content
- `MovieCarousel.tsx`: Movie carousel component
- `PricingSection.tsx`: Pricing section component
- `PartnersMarquee.tsx`: Partners marquee component
- `video-carousel-section.tsx`: Video carousel section

**Watch Feature** (`src/features/watch/components/`):
- `continue-watching-carousel.tsx`: Continue watching carousel
- `watchlist-item-card.tsx`: Watchlist item display card
- `watch-history-item.tsx`: Watch history item component

**Comments Feature** (`src/features/comments/components/`):
- `comment-list.tsx`: Display comments list
- `comment-item.tsx`: Individual comment component
- `comment-form.tsx`: Add/edit comment form
- `reply-item.tsx`: Reply to comment component
- `review-list.tsx`: Display reviews list
- `review-item.tsx`: Individual review component
- `review-form.tsx`: Add/edit review form

**Profiles Feature** (`src/features/profiles/components/`):
- `profile-selector.tsx`: Profile selection dropdown
- `profile-form.tsx`: Create/edit profile form
- `profile-card.tsx`: Profile display card
- `pin-entry-dialog.tsx`: PIN entry dialog for protected profiles

---

## Authentication & Authorization

### Authentication Flow

1. **Login**: 
   - User submits credentials → API returns token → Token stored in localStorage
   - Fetch complete user profile immediately
   - Set user data in query cache
   - Remove old user-specific queries
   - Invalidate and refetch all user-specific queries
   - Navigate to home page

2. **Token Refresh**: 
   - On 401 response → Automatic refresh attempt via interceptor
   - New token stored in localStorage
   - Original request retried with new token

3. **Logout**: 
   - Token removed from localStorage
   - All query cache cleared
   - Redirect to login page

### Login Flow Details

The complete login flow from `useAuth.ts`:

```typescript
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: async (data) => {
      // 1. Store token
      localStorage.setItem('token', data.token);

      // 2. Fetch complete user profile
      const fullUserData = await getUser();

      // 3. Set user data in cache (triggers navbar update immediately)
      queryClient.setQueryData(queryKeys.user.all, fullUserData);

      // 4. Remove old user-specific queries
      queryClient.removeQueries({ queryKey: queryKeys.profiles.all });
      // ... remove other user-specific queries

      // 5. Invalidate and refetch all user-specific queries
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.profiles.all, refetchType: 'active' }),
        // ... invalidate other queries
      ]);

      toast.success('Login successful!');
      navigate({ to: '/' });
    },
  });
};
```

### Auth Initialization

On app load, `initializeAuth()` runs (called from `main.tsx`):

```typescript
// src/lib/auth-init.ts
import { queryClient } from './query';
import { validateToken } from '@/features/auth/api/auth';
import { logger } from './logger';
import { queryKeys } from './query-keys';

export async function initializeAuth(): Promise<void> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  if (!token) {
    // No token, clear all query cache to ensure no stale data
    queryClient.clear();
    return;
  }

  try {
    // Validate token with backend
    const validationResult = await validateToken();
    
    if (validationResult.isValid && validationResult.user) {
      // Token is valid, set user data in query cache
      queryClient.setQueryData(queryKeys.user.all, validationResult.user);
      
      // Invalidate all user-specific queries to fetch fresh data
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.profiles.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.devices.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.watchlist.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.watchHistory.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.userVideos.all }),
      ]);
    } else {
      // Token is invalid, clear everything
      localStorage.removeItem('token');
      queryClient.clear();
    }
  } catch (error) {
    // Validation failed, clear everything
    logger.error('Auth initialization failed', error);
    localStorage.removeItem('token');
    queryClient.clear();
  }
}
```

**Flow**:
1. Check for existing token in localStorage
2. If token exists, validate with backend
3. If valid, set user data in query cache and invalidate user-specific queries
4. If invalid, clear token and query cache

### Route Guards

**Protected Routes**:

```typescript
import { requireAuth } from "@/lib/auth-guard";

export const Route = createFileRoute("/profile")({
  beforeLoad: async () => {
    await requireAuth(); // Redirects to /auth/login if not authenticated
  },
});
```

**Guest-Only Routes**:

```typescript
import { requireGuest } from "@/lib/auth-guard";

export const Route = createFileRoute("/auth/login")({
  beforeLoad: async () => {
    await requireGuest(); // Redirects to / if already authenticated
  },
});
```

### Access Control

Content access is controlled by:

1. **Subscription Plans**: User must have active subscription matching content's `plan_ids`
2. **Access Type**:
   - `free`: Available to all
   - `subscription`: Requires active subscription
   - `pay_per_view`: Requires purchase

**Access Check Utility**:

```typescript
import {
  canAccessContent,
  hasPPVAccess,
} from "@/features/auth/utils/access-control";

const hasAccess =
  canAccessContent(
    activeSubscription?.plan?.name,
    movie.plan_ids,
    movie.access_type
  ) ||
  (movie.access_type === "pay_per_view" && hasPPVAccess(ppvAccess));
```

### User Profile Management

- **Multi-Profile Support**: Users can create multiple profiles
- **Parental Controls**: Profiles can have age restrictions
- **PIN Protection**: Profiles can be PIN-protected
- **Active Profile**: One profile active at a time (stored in sessionStorage)

### Password Reset Flow

1. **Request Reset**: User enters email on `/auth/forgot-password`
2. **Email Sent**: Backend sends reset link with token
3. **Reset Page**: User clicks link → `/reset-password/:token`
4. **New Password**: User enters new password
5. **Login**: User redirected to login page

**Route Flow**:

```
/auth/forgot-password → Email sent → /reset-password/:token → /auth/login
```

### Payment Flow

1. **Select Plan**: User selects subscription plan on `/pricing`
2. **Apply Coupon**: Optional coupon code validation
3. **Payment**: User enters payment details
4. **Processing**: Payment processed via backend
5. **Callback**: Redirect to `/payment/success` or `/payment/cancel`

**Routes**:

- `/pricing`: Plan selection and coupon input
- `/payment/success`: Payment success confirmation
- `/payment/cancel`: Payment cancellation page

### Search & Filtering

The catalog page (`/catalog`) supports advanced search and filtering for multiple content types:

**Search Parameters** (defined in `routes/catalog/index.tsx`):

- `search`: Text search query
- `type`: Content type (`video`, `movie`, `tv-show`, `episode`) - default: `"video"`
- `genre`: Filter by genre (ID or slug) - can be string or array, default: `"All"`
- `year`: Filter by release year - can be string or array, default: `"All"`
- `sort`: Sort order - default: `"featured"`
  - For videos: `featured`, `popular`, `newest`, `oldest`, `most_viewed`, `most_liked`
  - For movies/TV shows: `featured`, `popular`, `newest`, `oldest`, `rating`
- `sort_order`: Sort direction (`ASC` | `DESC`) - default: `"DESC"`
- `access_type`: Filter by access type (`All`, `free`, `subscription`, `pay_per_view`) - default: `"All"`
- `limit`: Items per page (12, 24, 48, 96) - default: `12`
- `page`: Pagination page number - default: `1`

**Example URL**:

```
/catalog?search=action&type=movie&genre=Action&year=2024&sort=rating&sort_order=DESC&access_type=subscription&limit=24&page=1
```

**Usage**:

```typescript
import { useNavigate } from '@tanstack/react-router';

const navigate = useNavigate();

// Navigate with search params
navigate({
  to: "/catalog",
  search: {
    search: "action",
    type: "movie",
    genre: "Action",
    year: "2024",
    sort: "rating",
    sort_order: "DESC",
    access_type: "subscription",
    limit: 24,
    page: 1,
  },
});
```

**Catalog Features**:
- Multi-content type support: Videos, Movies, TV Shows, Episodes
- Advanced filtering with FilterBar component
- Content type switching via tabs
- Pagination with page navigation
- Real-time search with debouncing
- Genre and year multi-select filters

### Video Player

The video player component (`VideoPlayer` from `src/features/videos/components/video-player.tsx`) handles:

- **Video Playback**: HTML5 video player with native controls
- **Progress Tracking**: Automatic watch progress saving every 30 seconds
- **Access Control**: Checks user subscription and PPV access before playback
- **Placeholder Support**: Shows placeholder UI when video URL is not available
- **Progress Resume**: Can resume from last watched position (requires watch history integration)

**Features**:
- Auto-saves progress on pause and video end
- Saves progress every 30 seconds during playback
- Only saves if watched at least 10 seconds or 5% of video
- Integrates with active profile for multi-profile support

**Usage**:

```typescript
import { VideoPlayer } from '@/features/videos/components/video-player'

<VideoPlayer
  video={video}
  contentType="movie" // or "episode"
  contentId={movie.id}
/>
```

**Component Props**:
- `video`: Video object with `videoUrl`, `thumbnailUrl`, `title`, `accessLevel`
- `contentType`: `'movie' | 'episode'` - Type of content being played
- `contentId`: ID of the content item for progress tracking

### Content Access Control

Content access is determined by:

1. **Access Type**:
   - `free`: Available to all users
   - `subscription`: Requires active subscription
   - `pay_per_view`: Requires one-time purchase

2. **Subscription Plans**: Content may be restricted to specific plans

3. **Pay-Per-View**: Users must purchase individual content items

**Access Check**:

```typescript
import {
  canAccessContent,
  hasPPVAccess,
} from "@/features/auth/utils/access-control";

const hasAccess =
  canAccessContent(
    activeSubscription?.plan?.name,
    content.plan_ids,
    content.access_type
  ) ||
  (content.access_type === "pay_per_view" && hasPPVAccess(ppvAccess));
```

---

## Development Guidelines

### Code Style

1. **TypeScript**: All new code must be TypeScript (`.ts`, `.tsx`)
2. **Functional Components**: Use functional components with hooks
3. **Pure Functions**: Prefer pure functions for logic
4. **No Business Logic in JSX**: Move logic to hooks or utilities

### File Organization

1. **Feature-Based**: Organize by feature, not by file type
2. **Co-location**: Keep related files together
3. **Barrel Exports**: Use `index.ts` for clean imports (optional)

### Component Guidelines

1. **Component Size**: Max 150-200 lines per component
2. **Single Responsibility**: One component, one purpose
3. **Composition**: Prefer composition over large components
4. **Props Interface**: Always define props interface

**Example**:

```typescript
interface MovieCardProps {
  movie: Movie;
  onSelect?: (movie: Movie) => void;
}

export function MovieCard({ movie, onSelect }: MovieCardProps) {
  // Component implementation
}
```

### API Layer Guidelines

1. **Pure Functions**: API functions must be pure (no hooks)
2. **Error Handling**: Always use try/catch
3. **Type Safety**: Use TypeScript types for requests/responses
4. **Validation**: Validate response shape before returning

**Example**:

```typescript
import { apiClient } from "@/config/api";
import { ApiResponse } from "@/lib/api-response";
import { API_ERRORS } from "@/lib/api-errors";
import { logger } from "@/lib/logger";

export const getMovies = async (params?: Params): Promise<Movie[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Movie[]>>("/movies", {
      params,
    });
    if (!response.success) {
      throw new Error(response.message || API_ERRORS.FETCH_FAILED("movies"));
    }
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD);
    }
    return response.data;
  } catch (err) {
    logger.error(
      "Error fetching movies",
      err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
    );
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR);
  }
};
```

### Hook Guidelines

1. **Custom Hooks**: Use for reusable logic
2. **Query Hooks**: Use TanStack Query hooks for server state
3. **Naming**: Prefix with `use` (e.g., `useMovies`, `useAuth`)

**Example**:

```typescript
export const useMovies = (params?: Params) => {
  return useQuery({
    queryKey: queryKeys.movies.list(params),
    queryFn: () => getMovies(params),
    staleTime: 1000 * 60 * 5,
  });
};
```

### Error Handling

1. **User Feedback**: Always show error messages to users via toast notifications
2. **Loading States**: Show loading indicators during async operations
3. **Empty States**: Handle empty data gracefully
4. **Standardized Errors**: Use `API_ERRORS` constants for consistent error messages

**Example**:

```typescript
import { useMovies } from "@/features/movies/hooks/useMovies";
import { LoadingState } from "@/components/common/loading-state";
import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";

function MovieList() {
  const { data: movies, isLoading, error } = useMovies();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;
  if (!movies || movies.length === 0) return <EmptyState />;

  return <div>{/* Render movies */}</div>;
}
```

### Standardized Error Handling Rules

**Use API_ERRORS constants**:

```typescript
import { API_ERRORS } from "@/lib/api-errors";

// In API functions
if (!response.success) {
  throw new Error(response.message || API_ERRORS.FETCH_FAILED("resource"));
}
if (!response.data) {
  throw new Error(API_ERRORS.MISSING_DATA_FIELD);
}
```

**Benefits**:
- Consistent error messages across the application
- Easy to update error messages in one place
- Better user experience with uniform messaging
- Type-safe error message constants

### Logging

**Use logger utility instead of console**:

The logger utility (`src/lib/logger.ts`) provides consistent logging across the application:

```typescript
import { logger } from "@/lib/logger";

// Debug: Only logs in development mode
logger.debug("Debug message", additionalData);

// Info: Logs in all environments
logger.info("Info message", additionalData);

// Warn: Logs warnings in all environments
logger.warn("Warning message", additionalData);

// Error: Logs errors in all environments (can be extended for error tracking)
logger.error("Error message", error, additionalData);
```

**Log Levels**:
- `debug()`: Only logs when `import.meta.env.DEV === true`
- `info()`: Logs in all environments
- `warn()`: Logs warnings in all environments
- `error()`: Logs errors in all environments

**Benefits**:
- Consistent logging format across the application
- Development-only debug logs
- Can be extended to send errors to tracking services (Sentry, LogRocket, etc.)
- Never use `console.log`, `console.error`, etc. directly

**Error Tracking Integration** (future):
```typescript
// In production, send to error tracking service
if (import.meta.env.PROD && error instanceof Error) {
  // errorTrackingService.captureException(error, { extra: { message, ...args } })
}
```

### TypeScript Best Practices

1. **No `any` Types**: Avoid `any`, use proper types or `unknown`
2. **Type Imports**: Use `import type` for type-only imports
3. **Interface over Type**: Prefer `interface` for object shapes
4. **Strict Mode**: Keep TypeScript strict mode enabled

### Testing Guidelines

1. **Unit Tests**: Test utilities and pure functions
2. **Component Tests**: Test component rendering and interactions
3. **Integration Tests**: Test feature workflows
4. **Mock API**: Mock API calls in tests

---

## Testing

### Testing Framework

- **Vitest**: Test runner
- **@testing-library/react**: React component testing
- **jsdom**: DOM environment for tests

### Running Tests

```bash
npm run test
```

### Test Structure

```typescript
// src/features/movies/__tests__/useMovies.test.ts
import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useMovies } from "../hooks/useMovies";

describe("useMovies", () => {
  it("should fetch movies", async () => {
    const { result } = renderHook(() => useMovies());
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
```

### Mocking API Calls

```typescript
import { vi } from "vitest";
import * as moviesApi from "../api/movies";

vi.mock("../api/movies", () => ({
  getMovies: vi.fn(() => Promise.resolve([{ id: "1", title: "Test" }])),
}));
```

---

## Build & Deployment

### Building for Production

```bash
npm run build
```

Output: `dist/` directory

### Build Configuration

Vite configuration (`vite.config.ts`):

- React plugin
- TypeScript path aliases
- TanStack Router plugin
- Tailwind CSS plugin
- Devtools plugin

### Environment Variables

Environment variables are managed through `src/config/env.ts` using `@t3-oss/env-core` for type-safe validation:

**Required Variables**:

```env
VITE_API_URL=http://localhost:3000/api
```

**Optional Variables**:

```env
VITE_APP_TITLE=PunjabiDub
```

**Access Pattern**:

```typescript
import { env } from "@/config/env";

// Type-safe access
const apiUrl = env.VITE_API_URL || "http://localhost:3000/api";
const appTitle = env.VITE_APP_TITLE || "Vidstie";
```

**Configuration** (`src/config/env.ts`):
- Uses Zod for runtime validation
- Type-safe with TypeScript
- Validates at build time
- Supports optional variables with defaults

### Deployment Checklist

1. ✅ Build passes: `npm run build`
2. ✅ Tests pass: `npm run test`
3. ✅ Linting passes: `npm run lint`
4. ✅ Environment variables set
5. ✅ API URL configured
6. ✅ Static assets optimized

### Deployment Options

- **Static Hosting**: Vercel, Netlify, GitHub Pages
- **CDN**: Cloudflare, AWS CloudFront
- **Server**: Nginx, Apache (serve `dist/` directory)

---

## Troubleshooting

### Common Issues

#### 1. "Cannot find module" Errors

**Problem**: TypeScript can't resolve imports.

**Solution**:

- Check `tsconfig.json` paths configuration
- Restart TypeScript server in IDE
- Verify file paths are correct

#### 2. API Calls Failing

**Problem**: 401 Unauthorized or network errors.

**Solution**:

- Check `VITE_API_URL` environment variable
- Verify token is stored in localStorage
- Check API interceptor configuration

#### 3. Query Cache Issues

**Problem**: Stale data or cache not updating.

**Solution**:

- Check query key factory usage - ensure using `queryKeys` factory, not hardcoded arrays
- Verify cache invalidation in mutations - check `refetchType` is correct (`'active'` for refetch, `'none'` when using `setQueryData`)
- Check optimistic updates - ensure `onSuccess` updates cache correctly
- Clear cache: `queryClient.clear()`
- Verify query keys match between queries and mutations

#### 4. Route Not Found

**Problem**: 404 errors on valid routes.

**Solution**:

- Check route file naming (must match URL)
- Verify route is exported correctly
- Check `routeTree.gen.ts` is up to date

#### 5. Build Errors

**Problem**: TypeScript or build errors.

**Solution**:

- Run `npm run check` to see all issues
- Fix TypeScript errors
- Check for missing imports
- Verify all types are defined
- Ensure query keys use factory, not hardcoded arrays
- Check that logger is used instead of console.*
- Verify API_ERRORS constants are used for error messages

#### 6. Query Key Factory Issues

**Problem**: Query keys not working or TypeScript errors.

**Solution**:

- Ensure using `queryKeys` factory from `@/lib/query-keys`
- Check that query key structure matches between query and mutation
- Verify parameterized keys are called as functions: `queryKeys.movies.list(params)`
- No hardcoded query key arrays allowed

#### 7. Logger Usage Issues

**Problem**: Console logs appearing in production or inconsistent logging.

**Solution**:

- Use `logger` from `@/lib/logger` instead of `console.*`
- Use appropriate log levels: `debug()` for dev-only, `info()` for general, `warn()` for warnings, `error()` for errors
- Never use `console.log`, `console.error`, etc. directly

### Debugging Tools

1. **TanStack Router Devtools**: Route debugging
2. **TanStack Query Devtools**: Query cache inspection
3. **React Devtools**: Component tree inspection
4. **Browser DevTools**: Network, console, storage

### Getting Help

1. Check existing documentation
2. Review feature README files
3. Check code comments
4. Review similar implementations

---

## API Reference

### Base URL

```
Development: http://localhost:3000/api
Production: <configured in environment>
```

### Authentication Endpoints

#### POST `/auth/login`

Login user.

**Request**:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "user-id",
    "email": "user@example.com",
    "username": "username"
  },
  "token": "jwt-access-token",
  "refreshToken": "jwt-refresh-token"
}
```

#### POST `/auth/register`

Register new user.

**Request**:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "username",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response**:

```json
{
  "success": true,
  "message": "Registration successful"
}
```

#### GET `/auth/user`

Get current user profile.

**Headers**:

```
Authorization: Bearer <token>
```

**Response**:

```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "email": "user@example.com",
    "username": "username",
    "first_name": "John",
    "last_name": "Doe",
    "role": "user",
    "status": "active"
  }
}
```

### Content Endpoints

#### GET `/movies`

Get paginated movies.

**Query Parameters**:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `genre`: Filter by genre
- `search`: Search query
- `is_trending`: Filter trending movies
- `is_featured`: Filter featured movies
- `is_coming_soon`: Filter coming soon movies

**Response**:

```json
{
  "success": true,
  "data": {
    "movies": [
      {
        "id": "movie-id",
        "title": "Movie Title",
        "description": "Movie description",
        "thumbnail_url": "https://...",
        "poster_url": "https://...",
        "duration": 120,
        "release_date": "2024-01-01",
        "rating": 8.5,
        "genres": ["Action", "Drama"],
        "access_type": "subscription",
        "plan_ids": ["plan-id"]
      }
    ],
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 100
  }
}
```

#### GET `/movies/:id`

Get movie by ID.

**Response**:

```json
{
  "success": true,
  "data": {
    "id": "movie-id",
    "title": "Movie Title",
    "description": "Movie description",
    "thumbnail_url": "https://...",
    "poster_url": "https://...",
    "video_url": "https://...",
    "duration": 120,
    "release_date": "2024-01-01",
    "rating": 8.5,
    "genres": ["Action", "Drama"],
    "cast": ["Actor 1", "Actor 2"],
    "directors": ["Director 1"],
    "access_type": "subscription",
    "plan_ids": ["plan-id"],
    "is_trending": true,
    "is_featured": false,
    "is_coming_soon": false
  }
}
```

#### GET `/movies/trending`

Get trending movies.

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "movie-id",
      "title": "Movie Title",
      "thumbnail_url": "https://...",
      "rating": 8.5
    }
  ]
}
```

#### GET `/movies/featured`

Get featured movies.

#### GET `/movies/coming-soon`

Get coming soon movies.

### TV Shows Endpoints

#### GET `/tv-shows`

Get paginated TV shows.

**Query Parameters**:

- `page`: Page number
- `limit`: Items per page
- `genre`: Filter by genre
- `search`: Search query

**Response**:

```json
{
  "success": true,
  "data": {
    "tvShows": [
      {
        "id": "tvshow-id",
        "title": "TV Show Title",
        "description": "TV show description",
        "thumbnail_url": "https://...",
        "poster_url": "https://...",
        "seasons": 3,
        "episodes": 24,
        "genres": ["Drama", "Thriller"],
        "access_type": "subscription"
      }
    ],
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50
  }
}
```

#### GET `/tv-shows/:id`

Get TV show by ID.

#### GET `/tv-shows/:id/seasons`

Get seasons for a TV show.

### Subscriptions Endpoints

#### GET `/subscriptions`

Get user subscriptions.

**Headers**:

```
Authorization: Bearer <token>
```

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "subscription-id",
      "plan": {
        "id": "plan-id",
        "name": "Premium",
        "price": 9.99,
        "duration": 30
      },
      "status": "active",
      "start_date": "2024-01-01",
      "end_date": "2024-01-31"
    }
  ]
}
```

#### GET `/subscriptions/active`

Get active subscription.

#### POST `/subscriptions`

Create new subscription.

**Request**:

```json
{
  "plan_id": "plan-id",
  "payment_method_id": "payment-method-id"
}
```

#### DELETE `/subscriptions/:id`

Cancel subscription.

### Watchlist Endpoints

#### GET `/watchlist`

Get user watchlist.

**Query Parameters**:

- `profile_id`: Filter by profile
- `target_type`: Filter by type (movie, tvshow, episode)
- `page`: Page number
- `limit`: Items per page

**Response**:

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "watchlist-item-id",
        "target_type": "movie",
        "target_id": "movie-id",
        "target": {
          "id": "movie-id",
          "title": "Movie Title",
          "thumbnail_url": "https://..."
        },
        "added_at": "2024-01-01T00:00:00Z"
      }
    ],
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 1
  }
}
```

#### POST `/watchlist`

Add to watchlist.

**Request**:

```json
{
  "target_type": "movie",
  "target_id": "movie-id",
  "profile_id": "profile-id"
}
```

#### DELETE `/watchlist/:id`

Remove from watchlist.

### Comments Endpoints

#### GET `/comments/video/:videoId`

Get comments for a video.

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "comment-id",
      "user": {
        "id": "user-id",
        "username": "username",
        "profile_pic": "https://..."
      },
      "content": "Great movie!",
      "created_at": "2024-01-01T00:00:00Z",
      "replies": []
    }
  ]
}
```

#### POST `/comments`

Create comment.

**Request**:

```json
{
  "video_id": "video-id",
  "content": "Comment text"
}
```

#### PUT `/comments/:id`

Update comment.

#### DELETE `/comments/:id`

Delete comment.

### Reviews Endpoints

#### GET `/reviews/video/:videoId`

Get reviews for a video.

#### POST `/reviews`

Create review.

**Request**:

```json
{
  "video_id": "video-id",
  "rating": 5,
  "content": "Review text"
}
```

### Pay-Per-View Endpoints

#### GET `/pay-per-view/access/:targetType/:targetId`

Check PPV access.

**Response**:

```json
{
  "success": true,
  "data": {
    "hasAccess": true,
    "purchaseType": "one_time",
    "expiresAt": null
  }
}
```

#### POST `/pay-per-view/purchase`

Purchase PPV content.

**Request**:

```json
{
  "target_type": "movie",
  "target_id": "movie-id",
  "payment_method_id": "payment-method-id"
}
```

### Profiles Endpoints

#### GET `/profiles`

Get user profiles.

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "profile-id",
      "name": "Profile Name",
      "avatar": "https://...",
      "age_restriction": 18,
      "is_pin_protected": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### POST `/profiles`

Create profile.

**Request**:

```json
{
  "name": "Profile Name",
  "avatar": "https://...",
  "age_restriction": 18,
  "pin": "1234"
}
```

#### PUT `/profiles/:id`

Update profile.

#### DELETE `/profiles/:id`

Delete profile.

### Devices Endpoints

#### GET `/devices`

Get user devices.

#### DELETE `/devices/:id`

Remove device.

### Notifications Endpoints

#### GET `/notifications`

Get notifications.

**Query Parameters**:

- `page`: Page number
- `limit`: Items per page

#### PUT `/notifications/:id/read`

Mark notification as read.

#### PUT `/notifications/read-all`

Mark all notifications as read.

### Videos Endpoints

#### GET `/videos`

Get paginated videos.

**Query Parameters**:

- `page`: Page number
- `limit`: Items per page
- `sort`: Sort order
- `order`: Sort direction (asc/desc)

#### GET `/videos/:id`

Get video by ID.

#### GET `/videos/:id/url`

Get video streaming URL.

### Episodes Endpoints

#### GET `/episodes/paginated`

Get paginated episodes with filters.

**Query Parameters**:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `sort`: Sort field (default: "updatedAt")
- `order`: Sort direction - `ASC` or `DESC` (default: "DESC")
- `genre`: Filter by genre ID or slug (via TV show)
- `year`: Filter by release year (1900-2100)
- `access_type`: Filter by access type (`free`, `subscription`, `pay_per_view`)
- `search`: Search query (searches title and description)
- `tv_show_id`: Filter by TV show ID
- `season_id`: Filter by season ID

**Response**:

```json
{
  "success": true,
  "message": "Episodes retrieved successfully",
  "data": {
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 200,
    "episodes": [
      {
        "id": "episode-id",
        "tv_show_id": "tv-show-id",
        "season_id": "season-id",
        "episode_number": 1,
        "title": "Episode Title",
        "description": "Episode description",
        "thumbnail_url": "https://...",
        "duration_minutes": 45,
        "release_date": "2024-01-01",
        "access_type": "subscription",
        "plan_ids": ["plan-id"],
        "status": "published"
      }
    ]
  }
}
```

**Access Control**: Episodes are filtered based on user's subscription and PPV purchases. Free content is always accessible.

---

#### GET `/episodes/season/:seasonId`

Get episodes for a specific season.

**URL Parameters**:

- `seasonId`: Season ID

**Response**:

```json
{
  "success": true,
  "message": "Episodes retrieved successfully",
  "data": [
    {
      "id": "episode-id",
      "tv_show_id": "tv-show-id",
      "season_id": "season-id",
      "episode_number": 1,
      "title": "Episode Title",
      "thumbnail_url": "https://...",
      "access_type": "subscription"
    }
  ]
}
```

---

#### GET `/episodes/:id`

Get episode by ID.

**URL Parameters**:

- `id`: Episode ID

**Response**:

```json
{
  "success": true,
  "message": "Episode retrieved successfully",
  "data": {
    "id": "episode-id",
    "tv_show_id": "tv-show-id",
    "season_id": "season-id",
    "episode_number": 1,
    "title": "Episode Title",
    "description": "Episode description",
    "thumbnail_url": "https://...",
    "streams": [
      {
        "label": "HD",
        "type": "hls",
        "url": "https://..."
      }
    ],
    "enable_subtitle": true,
    "subtitles": [],
    "duration_minutes": 45,
    "release_date": "2024-01-01",
    "access_type": "subscription",
    "plan_ids": ["plan-id"],
    "status": "published"
  }
}
```

**Access Control**: Returns 403 if user doesn't have required subscription or PPV purchase.

### Seasons Endpoints

#### GET `/seasons`

Get seasons.

**Query Parameters**:

- `tv_show_id`: Filter by TV show

#### GET `/seasons/:id`

Get season by ID.

### Channels Endpoints

#### GET `/channels`

Get live TV channels.

**Query Parameters**:

- `page`: Page number
- `limit`: Items per page
- `search`: Search query

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "channel-id",
      "name": "Channel Name",
      "description": "Channel description",
      "logo_url": "https://...",
      "stream_url": "https://...",
      "category": "Entertainment",
      "country": "US",
      "language": "English",
      "is_live": true
    }
  ]
}
```

### Coupons Endpoints

#### POST `/coupons/validate`

Validate coupon code.

**Request**:

```json
{
  "code": "DISCOUNT20"
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "id": "coupon-id",
    "code": "DISCOUNT20",
    "discount_type": "percentage",
    "discount_value": 20,
    "is_valid": true,
    "expires_at": "2024-12-31T23:59:59Z"
  }
}
```

### Pages Endpoints

#### GET `/pages`

Get all CMS pages.

#### GET `/pages/:slug`

Get page by slug.

**Response**:

```json
{
  "success": true,
  "data": {
    "id": "page-id",
    "slug": "about",
    "title": "About Us",
    "content": "<p>Page content...</p>",
    "meta_title": "About Us",
    "meta_description": "Learn about our company"
  }
}
```

### Genres Endpoints

#### GET `/genres`

Get all genres.

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "genre-id",
      "name": "Action",
      "slug": "action",
      "description": "Action movies"
    }
  ]
}
```

### Cast & Crew Endpoints

#### GET `/cast-crew`

Get cast and crew members.

**Query Parameters**:

- `page`: Page number
- `limit`: Items per page
- `type`: Filter by type (cast/crew)
- `search`: Search query

#### GET `/cast-crew/:id`

Get person by ID.

### Banners Endpoints

#### GET `/banners`

Get banners.

**Query Parameters**:

- `position`: Banner position (home, catalog, etc.)
- `device`: Device type (web, mobile, etc.)
- `is_active`: Filter active banners

---

## Glossary

### Terms

- **Access Type**: Content access level (`free`, `subscription`, `pay_per_view`)
- **Active Profile**: Currently selected user profile
- **API Response**: Standard backend response format with `success`, `message`, and `data` fields
- **Cache Invalidation**: Process of marking cached data as stale
- **Feature Module**: Self-contained code module for a specific feature
- **Optimistic Update**: UI update before server confirmation
- **Query Key**: Unique identifier for TanStack Query cache entries
- **Route Guard**: Protection mechanism for routes requiring authentication
- **Stale Time**: Duration before cached data is considered stale
- **Token Refresh**: Automatic renewal of expired access tokens

### Abbreviations

- **API**: Application Programming Interface
- **PPV**: Pay-Per-View
- **SPA**: Single Page Application
- **UI**: User Interface
- **UX**: User Experience

---

## Appendix

### A. Environment Variables

Complete list of environment variables (managed via `src/config/env.ts`):

| Variable         | Description          | Required | Default                     | Type     |
| ---------------- | -------------------- | -------- | --------------------------- | -------- |
| `VITE_API_URL`   | Backend API base URL | Yes      | `http://localhost:3000/api` | string   |
| `VITE_APP_TITLE` | Application title    | No       | `PunjabiDub`                | string   |

**Access Pattern**:

```typescript
import { env } from "@/config/env";

// Type-safe access with validation
const apiUrl = env.VITE_API_URL || "http://localhost:3000/api";
```

**Configuration**:
- Uses `@t3-oss/env-core` for type-safe environment variables
- Runtime validation with Zod
- Validates at build time
- Supports optional variables with defaults

### B. TypeScript Configuration

Key TypeScript settings in `tsconfig.json`:

- **Target**: ES2022
- **Module**: ESNext
- **JSX**: react-jsx
- **Strict Mode**: Enabled
- **Path Aliases**: `@/*` → `./src/*`

### C. Vite Configuration

Key Vite plugins and settings:

- **React Plugin**: JSX transformation
- **TypeScript Paths**: Path alias resolution
- **TanStack Router Plugin**: File-based routing
- **Tailwind CSS Plugin**: CSS processing
- **Devtools Plugin**: Development tools

### D. Biome Configuration

Code quality settings:

- **Formatter**: Enabled with tab indentation
- **Linter**: Enabled with recommended rules
- **Organize Imports**: Automatic import organization

### E. Browser Support

Minimum browser versions:

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### F. Performance Considerations

1. **Code Splitting**: Routes are automatically code-split
2. **Lazy Loading**: Heavy components should be lazy-loaded
3. **Image Optimization**: Use optimized image formats (WebP, AVIF)
4. **Query Caching**: TanStack Query caches responses to reduce API calls
5. **Bundle Size**: Monitor bundle size with `npm run build -- --analyze`

### G. Security Best Practices

1. **Token Storage**: Access tokens stored in localStorage (consider httpOnly cookies for production)
2. **XSS Prevention**: React automatically escapes content
3. **CSRF Protection**: Backend handles CSRF tokens
4. **Input Validation**: Validate all user inputs
5. **Error Messages**: Don't expose sensitive information in error messages

### H. Route Examples

#### Example 1: Protected Route with Auth Guard

```typescript
// routes/profile.tsx
import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth-guard";

export const Route = createFileRoute("/profile")({
  beforeLoad: async () => {
    await requireAuth(); // Redirects to login if not authenticated
  },
  component: ProfilePage,
});

function ProfilePage() {
  const { data: user } = useUser();
  // ...
}
```

#### Example 2: Route with Search Parameters

```typescript
// routes/catalog/index.tsx
import { z } from "zod";

const catalogSearchSchema = z.object({
  search: z.string().optional(),
  type: z.enum(["video", "movie", "tv-show"]).optional().default("video"),
  page: z.number().optional().default(1),
});

export const Route = createFileRoute("/catalog/")({
  validateSearch: catalogSearchSchema,
  component: CatalogPage,
});

function CatalogPage() {
  const { search, type, page } = Route.useSearch();
  // Use search params for filtering
}
```

#### Example 3: Dynamic Route with Parameters

```typescript
// routes/movies/$id.tsx
export const Route = createFileRoute("/movies/$id")({
  component: MovieDetailPage,
});

function MovieDetailPage() {
  const { id } = Route.useParams();
  const { data: movie } = useMovie(id);
  // ...
}
```

#### Example 4: Nested Route Structure

```typescript
// routes/tv-shows/$id/seasons/$seasonId.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSeason } from "@/features/seasons/hooks/useSeasons";
import { useTVShow } from "@/features/tv-shows/hooks/useTvShows";

export const Route = createFileRoute("/tv-shows/$id/seasons/$seasonId")({
  component: SeasonDetailPage,
});

function SeasonDetailPage() {
  const { id: tvShowId, seasonId } = Route.useParams();
  const { data: tvShow } = useTVShow(tvShowId);
  const { data: season } = useSeason(seasonId);
  // ...
}
```

#### Example 5: Catalog Route with Complex Search Parameters

```typescript
// routes/catalog/index.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

const catalogSearchSchema = z.object({
  search: z.string().optional(),
  type: z.enum(["video", "movie", "tv-show", "episode"]).optional().default("video"),
  genre: z.union([z.string(), z.array(z.string())]).optional().default("All"),
  year: z.union([z.string(), z.array(z.string())]).optional().default("All"),
  sort: z.string().optional().default("featured"),
  sort_order: z.enum(["ASC", "DESC"]).optional().default("DESC"),
  access_type: z.string().optional().default("All"),
  limit: z.number().optional().default(12),
  page: z.number().optional().default(1),
});

export const Route = createFileRoute("/catalog/")({
  validateSearch: catalogSearchSchema,
  component: CatalogPage,
});

function CatalogPage() {
  const navigate = useNavigate({ from: "/catalog" });
  const { search, type, genre, year, sort, sort_order, access_type, limit, page } = Route.useSearch();
  
  // Use search params for filtering
  // ...
}
```

### I. Common Patterns

#### Pattern 1: Loading, Error, Empty States

```typescript
function ResourceList() {
  const { data, isLoading, error } = useResource()

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState message={error.message} />
  if (!data || data.length === 0) return <EmptyState />

  return <div>{/* Render data */}</div>
}
```

#### Pattern 2: Form with Mutation (with Optimistic Updates)

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { queryKeys } from "@/lib/query-keys";

function CreateForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const create = useCreateResource();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate(formData, {
      onSuccess: () => {
        toast.success('Created successfully');
        navigate({ to: '/resources' });
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to create');
      },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button type="submit" disabled={create.isPending}>
        {create.isPending ? 'Creating...' : 'Create'}
      </Button>
    </form>
  );
}

// Mutation hook with optimistic updates
function useCreateResource() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createResource,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.resource.all });
      const previous = queryClient.getQueryData(queryKeys.resource.list());
      queryClient.setQueryData(queryKeys.resource.list(), (old) => {
        if (!old) return [newData];
        return [...old, newData];
      });
      return { previous };
    },
    onError: (error, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.resource.list(), context.previous);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.resource.all,
        refetchType: 'none',
      });
    },
  });
}
```

#### Pattern 3: Conditional Rendering Based on Auth

```typescript
function ProtectedContent() {
  const { data: user } = useUser()

  if (!user) {
    return <div>Please log in</div>
  }

  return <div>Protected content</div>
}
```

### J. Migration Guide

#### From Class Components to Functional Components

**Before**:

```typescript
class MyComponent extends React.Component {
  state = { count: 0 }

  render() {
    return <div>{this.state.count}</div>
  }
}
```

**After**:

```typescript
function MyComponent() {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}
```

#### From useState to TanStack Query

**Before**:

```typescript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchData()
    .then(setData)
    .finally(() => setLoading(false));
}, []);
```

**After**:

```typescript
const { data, isLoading } = useResource();
```

### K. Contributing Guidelines

1. **Code Style**: Follow Biome formatting rules
2. **TypeScript**: No `any` types, use proper types
3. **Testing**: Write tests for new features
4. **Documentation**: Update README files for features
5. **Commits**: Use conventional commit messages

### L. Resources

- **React Documentation**: https://react.dev
- **TanStack Router**: https://tanstack.com/router
- **TanStack Query**: https://tanstack.com/query
- **Tailwind CSS**: https://tailwindcss.com
- **ShadCN UI**: https://ui.shadcn.com
- **TypeScript**: https://www.typescriptlang.org
- **Vite**: https://vitejs.dev

---

## Changelog

### Version 2.0.0 (2025-01-29)

- **Major Updates**:
  - Added comprehensive documentation for logger utility
  - Added API errors standardization documentation
  - Expanded query key factory documentation with complete structure
  - Updated all code examples to use queryKeys factory, logger, and API_ERRORS
  - Documented complete auth initialization and login flow
  - Added optimistic updates pattern documentation
  - Documented all 30 feature modules with actual structure
  - Added comprehensive component documentation
  - Updated routes table with all actual routes (including nested routes)
  - Documented catalog page with advanced filtering
  - Documented video player with progress tracking
  - Updated environment variables section with type-safe access pattern
  - Added troubleshooting for query keys, logger, and error handling

- **Improvements from NEXT_PLAN.md**:
  - Query keys factory implementation (100% migrated)
  - Logger utility creation and usage
  - API errors standardization pattern
  - Optimistic updates implementation (9 features)
  - All feature README files created (30/30)
  - TSDoc documentation added to all critical hooks

### Version 1.0.0 (2025-01-29)

- Initial documentation release
- Complete feature module documentation
- API reference documentation
- Development guidelines
- Troubleshooting guide

---

## License

This documentation is part of the Vidstie project.

---

**Document Version**: 2.0.0  
**Last Updated**: 2025-01-29  
**Maintained By**: Development Team

---

## Summary of Updates (Version 2.0.0)

This documentation has been comprehensively updated to reflect the current codebase implementation:

### Key Additions

1. **Utilities Documentation**:
   - Logger utility (`src/lib/logger.ts`) with log levels and usage patterns
   - API errors standardization (`src/lib/api-errors.ts`) with constants
   - Query keys factory complete structure and usage
   - API response utilities (`extractData`, `extractDataOrNull`)

2. **Routes Updates**:
   - Added missing routes: `seasons/$seasonId.tsx`, `pricing.tsx`
   - Documented nested route: `tv-shows/$id/seasons/$seasonId.tsx`
   - Added catalog route example with complex search parameters

3. **API Integration**:
   - Complete interceptor documentation (request/response)
   - Token refresh flow details
   - Standardized error handling with `API_ERRORS`
   - Updated all API function examples

4. **State Management**:
   - Complete optimistic updates pattern documentation
   - Query client configuration details
   - Query key factory migration guide
   - Features with optimistic updates listed

5. **Authentication**:
   - Complete auth initialization flow
   - Detailed login flow with query cache management
   - Route guards implementation details

6. **Features**:
   - All 30 features documented with actual structure
   - Videos feature with all 5 components
   - Home feature with all components
   - Complete feature list with README status

7. **Components**:
   - All common components documented
   - Feature-specific components listed
   - Videos feature components detailed

8. **Development Guidelines**:
   - Logging rules section
   - Error handling rules with `API_ERRORS`
   - Query key rules emphasizing factory usage
   - Optimistic updates rules with pattern

9. **Code Examples**:
   - All examples updated to use `queryKeys` factory
   - All examples use `logger` instead of `console.*`
   - All examples use `API_ERRORS` for error messages
   - Added new examples (catalog, video player, optimistic updates)

10. **Troubleshooting**:
    - Added query key factory troubleshooting
    - Added logger usage troubleshooting
    - Added standardized error messages troubleshooting

### Improvements Reflected

All improvements from `NEXT_PLAN.md` have been documented:
- ✅ Query keys factory implementation (100% migrated)
- ✅ Logger utility creation and usage
- ✅ API errors standardization pattern
- ✅ Optimistic updates implementation (9 features)
- ✅ All feature README files created (30/30)
- ✅ TSDoc documentation added to all critical hooks

---

_For questions or contributions, please refer to the project repository or contact the development team._
