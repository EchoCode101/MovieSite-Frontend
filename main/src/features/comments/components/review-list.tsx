import { useState } from "react";
import { ReviewItem } from "./review-item";
import { ReviewForm } from "./review-form";
import { Button } from "@/components/ui/button";
import { Star, Loader2 } from "lucide-react";
import {
  useReviews,
  useReviewsByTarget,
  useCreateReview,
} from "../hooks/useReviews";
import { useUser } from "@/features/auth/hooks/useAuth";
import { Link } from "@tanstack/react-router";

interface ReviewListProps {
  videoId: string;
  targetType?: "video" | "movie" | "tvshow" | "episode";
}

export function ReviewList({ videoId, targetType = "video" }: ReviewListProps) {
  const { data: user } = useUser();
  const { data: videoReviews, isLoading: isLoadingVideo } = useReviews(
    videoId,
    { enabled: targetType === "video" }
  );
  const { data: targetReviews, isLoading: isLoadingTarget } =
    useReviewsByTarget(targetType, videoId, {
      enabled: targetType !== "video",
    });

  const reviews = targetType === "video" ? videoReviews : targetReviews;
  const isLoading = targetType === "video" ? isLoadingVideo : isLoadingTarget;
  const createReview = useCreateReview();
  const [sortBy, setSortBy] = useState<"newest" | "highest">("newest");

  const handleCreateReview = (rating: number, content: string) => {
    createReview.mutate({
      target_type: targetType,
      target_id: videoId,
      rating,
      content,
    });
  };

  // Calculate average rating
  const averageRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  // Check if user has already reviewed
  const userReview = reviews?.find((r) => r.member_id._id === user?.id);

  const sortedReviews = reviews
    ? [...reviews].sort((a, b) => {
        if (sortBy === "newest") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        } else {
          return b.rating - a.rating;
        }
      })
    : [];

  return (
    <div className="space-y-6">
      {/* Header with Average Rating */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2">
            {reviews?.length || 0} Reviews
          </h3>
          {reviews && reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)} out of 5
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "newest" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("newest")}
          >
            Newest
          </Button>
          <Button
            variant={sortBy === "highest" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("highest")}
          >
            Highest Rated
          </Button>
        </div>
      </div>

      {/* Review Form */}
      {user ? (
        !userReview ? (
          <div>
            <h4 className="font-semibold mb-4">Write a Review</h4>
            <ReviewForm
              onSubmit={handleCreateReview}
              isLoading={createReview.isPending}
            />
          </div>
        ) : (
          <div className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
            You have already reviewed this video. You can edit or delete your
            review below.
          </div>
        )
      ) : (
        <div className="text-center py-8 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground mb-4">
            Please log in to leave a review
          </p>
          <Button asChild>
            <Link to="/auth/login">Log In</Link>
          </Button>
        </div>
      )}

      {/* Reviews List */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!isLoading && sortedReviews.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No reviews yet. Be the first to review!
        </div>
      )}

      <div className="space-y-4">
        {sortedReviews
          .filter((review) => !review._id.startsWith("temp-")) // Filter out temp reviews
          .map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))}
      </div>
    </div>
  );
}
