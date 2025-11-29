import { useState } from "react";
import { CommentItem } from "./comment-item";
import { CommentForm } from "./comment-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  useComments,
  useCommentsByTarget,
  useCreateComment,
} from "../hooks/useComments";
import { useUser } from "@/features/auth/hooks/useAuth";
import { Link } from "@tanstack/react-router";

interface CommentListProps {
  videoId: string;
  targetType?: "video" | "movie" | "tvshow" | "episode";
}

export function CommentList({
  videoId,
  targetType = "video",
}: CommentListProps) {
  const { data: user } = useUser();
  const { data: videoComments, isLoading: isLoadingVideo } = useComments(
    videoId,
    { enabled: targetType === "video" }
  );
  const { data: targetComments, isLoading: isLoadingTarget } =
    useCommentsByTarget(targetType, videoId, {
      enabled: targetType !== "video",
    });

  const comments = targetType === "video" ? videoComments : targetComments;
  const isLoading = targetType === "video" ? isLoadingVideo : isLoadingTarget;
  const createComment = useCreateComment();
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  const handleCreateComment = (content: string) => {
    createComment.mutate({
      target_type: targetType,
      target_id: videoId,
      content,
    });
  };

  const sortedComments = comments
    ? [...comments].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortBy === "newest" ? dateB - dateA : dateA - dateB;
      })
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          {comments?.length || 0} Comments
        </h3>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "newest" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("newest")}
          >
            Newest
          </Button>
          <Button
            variant={sortBy === "oldest" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("oldest")}
          >
            Oldest
          </Button>
        </div>
      </div>

      {/* Comment Form */}
      {user ? (
        <CommentForm
          onSubmit={handleCreateComment}
          isLoading={createComment.isPending}
        />
      ) : (
        <div className="text-center py-8 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground mb-4">
            Please log in to leave a comment
          </p>
          <Button asChild>
            <Link to="/auth/login">Log In</Link>
          </Button>
        </div>
      )}

      {/* Comments List */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!isLoading && sortedComments.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No comments yet. Be the first to comment!
        </div>
      )}

      <div className="space-y-4">
        {sortedComments
          .filter((comment) => !comment._id.startsWith("temp-")) // Filter out temp comments
          .map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
      </div>
    </div>
  );
}
