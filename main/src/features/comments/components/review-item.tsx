import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp, ThumbsDown, Edit, Trash2 } from "lucide-react";
import { ReviewForm } from "./review-form";
import { useUser } from "@/features/auth/hooks/useAuth";
import { useUpdateReview, useDeleteReview } from "../hooks/useReviews";
import type { Review } from "../types";
import { formatDistanceToNow } from "date-fns";
import {
  useLikeDislikeCounts,
  useToggleLikeDislike,
  useUserReaction,
} from "@/features/likes/hooks/useLikes";

interface ReviewItemProps {
  review: Review;
}

export function ReviewItem({ review }: ReviewItemProps) {
  const { data: user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const updateReview = useUpdateReview();
  const deleteReview = useDeleteReview();

  // Don't fetch likes/dislikes for temp reviews (optimistic updates)
  const isTempReview = review._id.startsWith("temp-");

  // Like/Dislike functionality - only for real reviews
  const { data: likeCounts } = useLikeDislikeCounts("review", review._id, {
    enabled: !isTempReview,
  });
  const { data: userReaction } = useUserReaction("review", review._id, {
    enabled: !isTempReview,
  });
  const toggleLike = useToggleLikeDislike();

  // Handle case where member_id might be a string or not fully populated
  const memberId =
    typeof review.member_id === "string"
      ? review.member_id
      : review.member_id?._id || "";
  const isOwner = user?.id === memberId;

  const handleLike = () => {
    toggleLike.mutate({
      target_id: review._id,
      target_type: "review",
      is_like: true,
    });
  };

  const handleDislike = () => {
    toggleLike.mutate({
      target_id: review._id,
      target_type: "review",
      is_like: false,
    });
  };

  const handleEdit = (rating: number, content: string) => {
    updateReview.mutate(
      { reviewId: review._id, data: { rating, content } },
      {
        onSuccess: () => setIsEditing(false),
      }
    );
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this review?")) {
      deleteReview.mutate(review._id);
    }
  };

  const getInitials = () => {
    // Handle case where member_id might be a string or not fully populated
    if (typeof review.member_id === "string" || !review.member_id) {
      return "U";
    }
    const firstName =
      review.member_id.first_name || review.member_id.username || "";
    const lastName = review.member_id.last_name || "";
    if (!firstName) return "U";
    return `${firstName[0]}${lastName[0] || ""}`.toUpperCase();
  };

  return (
    <Card className="p-4">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage
            src={
              typeof review.member_id === "string" || !review.member_id
                ? undefined
                : review.member_id.profile_pic
            }
          />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          {/* Author and Date */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold">
                {typeof review.member_id === "string" || !review.member_id
                  ? "User"
                  : review.member_id.first_name && review.member_id.last_name
                    ? `${review.member_id.first_name} ${review.member_id.last_name}`
                    : review.member_id.username || "User"}
              </span>
              <span className="text-sm text-muted-foreground ml-2">
                {formatDistanceToNow(new Date(review.createdAt), {
                  addSuffix: true,
                })}
              </span>
              {new Date(review.updatedAt) > new Date(review.createdAt) && (
                <span className="text-xs text-primary italic font-bold ml-2">
                  (Edited)
                </span>
              )}
            </div>
            {isOwner && !isEditing && (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Rating Stars */}
          {!isEditing && (
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Review Content */}
          {isEditing ? (
            <ReviewForm
              onSubmit={handleEdit}
              isLoading={updateReview.isPending}
              initialRating={review.rating}
              initialContent={review.review_content}
            />
          ) : (
            <p className="text-sm">{review.review_content}</p>
          )}

          {/* Actions */}
          {!isEditing && (
            <div className="flex items-center gap-4 text-sm">
              <Button
                variant={userReaction?.isLike === true ? "default" : "ghost"}
                size="sm"
                className={`gap-1 ${
                  userReaction?.isLike === true
                    ? "bg-primary hover:bg-primary/90"
                    : ""
                }`}
                onClick={handleLike}
                disabled={!user || toggleLike.isPending}
              >
                <ThumbsUp className="h-4 w-4" />
                {likeCounts?.likes || 0}
              </Button>
              <Button
                variant={userReaction?.isLike === false ? "default" : "ghost"}
                size="sm"
                className={`gap-1 ${
                  userReaction?.isLike === false
                    ? "bg-destructive hover:bg-destructive/90"
                    : ""
                }`}
                onClick={handleDislike}
                disabled={!user || toggleLike.isPending}
              >
                <ThumbsDown className="h-4 w-4" />
                {likeCounts?.dislikes || 0}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
