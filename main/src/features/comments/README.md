# Comments Feature

## Purpose

User comments and reviews management. Allows users to comment on videos and reply to comments, as well as submit reviews with ratings.

## API Endpoints

### Comments
- `GET /api/comments/video/:videoId` - Get comments for a video
- `POST /api/comments` - Create a comment
- `PUT /api/comments/:id` - Update a comment
- `DELETE /api/comments/:id` - Delete a comment

### Replies
- `GET /api/replies/:commentId` - Get replies for a comment
- `POST /api/replies` - Create a reply
- `PUT /api/replies/:id` - Update a reply
- `DELETE /api/replies/:id` - Delete a reply

### Reviews
- `GET /api/reviews/video/:videoId` - Get reviews for a video (legacy endpoint)
- `GET /api/reviews/target/:targetType/:targetId` - Get reviews by target type and ID
- `GET /api/reviews/paginated` - Get paginated reviews (with optional filters)
- `GET /api/reviews/recent` - Get recent reviews (with optional date range)
- `POST /api/reviews` - Create a review
- `PUT /api/reviews/:id` - Update a review
- `DELETE /api/reviews/:id` - Delete a review

## Components

- `comment-form.tsx` - Form for creating/editing comments
- `comment-item.tsx` - Individual comment display
- `comment-list.tsx` - List of comments
- `reply-item.tsx` - Individual reply display
- `review-form.tsx` - Form for creating/editing reviews
- `review-item.tsx` - Individual review display
- `review-list.tsx` - List of reviews

## Hooks

### Comments
- `useComments(videoId)` - Fetch comments for a video
- `useCreateComment()` - Create comment mutation
- `useUpdateComment()` - Update comment mutation
- `useDeleteComment()` - Delete comment mutation

### Replies
- `useReplies(commentId)` - Fetch replies for a comment
- `useCreateReply()` - Create reply mutation
- `useUpdateReply()` - Update reply mutation
- `useDeleteReply()` - Delete reply mutation

### Reviews
- `useReviews(videoId)` - Fetch reviews for a video
- `useReviewsByTarget(targetType, targetId)` - Fetch reviews by target type and ID
- `usePaginatedReviews(params)` - Fetch paginated reviews
- `useRecentReviews(params)` - Fetch recent reviews
- `useCreateReview()` - Create review mutation
- `useUpdateReview()` - Update review mutation
- `useDeleteReview()` - Delete review mutation

## Integration Points

- Video detail pages (comments and reviews sections)
- User engagement and interaction
- Content moderation
- Rating and review system

