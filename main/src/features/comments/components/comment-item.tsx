import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Edit,
  Trash2,
  Reply,
} from "lucide-react";
import { CommentForm } from "./comment-form";
import { useUser } from "@/features/auth/hooks/useAuth";
import {
  useCreateReply,
  useUpdateComment,
  useDeleteComment,
  useReplies,
} from "../hooks/useComments";
import type { Comment } from "../types";
import { formatDistanceToNow } from "date-fns";
import {
  useLikeDislikeCounts,
  useToggleLikeDislike,
  useUserReaction,
} from "@/features/likes/hooks/useLikes";
import { ReplyItem } from "./reply-item";

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const { data: user } = useUser();
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const createReply = useCreateReply();
  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();
  const { data: replies } = useReplies(comment._id); // Always fetch replies

  // Don't fetch likes/dislikes for temp comments (optimistic updates)
  const isTempComment = comment._id.startsWith("temp-");

  // Like/Dislike functionality - only for real comments
  const { data: likeCounts } = useLikeDislikeCounts("comment", comment._id, {
    enabled: !isTempComment,
  });
  const { data: userReaction } = useUserReaction("comment", comment._id, {
    enabled: !isTempComment,
  });
  const toggleLike = useToggleLikeDislike();

  // Handle case where member_id might be a string or not fully populated
  const memberId =
    typeof comment.member_id === "string"
      ? comment.member_id
      : comment.member_id?._id || "";
  const isOwner = user?.id === memberId;

  const handleLike = () => {
    toggleLike.mutate({
      target_id: comment._id,
      target_type: "comment",
      is_like: true,
    });
  };

  const handleDislike = () => {
    toggleLike.mutate({
      target_id: comment._id,
      target_type: "comment",
      is_like: false,
    });
  };

  const handleReply = (content: string) => {
    createReply.mutate(
      { comment_id: comment._id, reply_content: content },
      {
        onSuccess: () => {
          setIsReplying(false);
          setShowReplies(true);
        },
      }
    );
  };

  const handleEdit = (content: string) => {
    updateComment.mutate(
      { commentId: comment._id, data: { content } },
      {
        onSuccess: () => setIsEditing(false),
      }
    );
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this comment?")) {
      deleteComment.mutate(comment._id);
    }
  };

  const getInitials = () => {
    // Handle case where member_id might be a string or not fully populated
    if (typeof comment.member_id === "string" || !comment.member_id) {
      return "U";
    }
    const firstName =
      comment.member_id.first_name || comment.member_id.username || "";
    const lastName = comment.member_id.last_name || "";
    if (!firstName) return "U";
    return `${firstName[0]}${lastName[0] || ""}`.toUpperCase();
  };

  return (
    <Card className="p-4">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage
            src={
              typeof comment.member_id === "string" || !comment.member_id
                ? undefined
                : comment.member_id.profile_pic || comment.member_id.avatar_url
            }
          />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          {/* Author and Date */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold">
                {typeof comment.member_id === "string" || !comment.member_id
                  ? "User"
                  : comment.member_id.first_name && comment.member_id.last_name
                    ? `${comment.member_id.first_name} ${comment.member_id.last_name}`
                    : comment.member_id.username || "User"}
              </span>
              <span className="text-sm text-muted-foreground ml-2">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              </span>
              {new Date(comment.updatedAt) > new Date(comment.createdAt) && (
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

          {/* Comment Content */}
          {isEditing ? (
            <CommentForm
              onSubmit={handleEdit}
              isLoading={updateComment.isPending}
              placeholder="Edit your comment..."
              buttonText="Save"
              initialValue={comment.content}
            />
          ) : (
            <p className="text-sm">{comment.content}</p>
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsReplying(!isReplying)}
                className="gap-1"
              >
                <Reply className="h-4 w-4" />
                Reply
              </Button>
              {replies && replies.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReplies(!showReplies)}
                  className="gap-1"
                >
                  <MessageSquare className="h-4 w-4" />
                  {replies.length} {replies.length === 1 ? "reply" : "replies"}
                </Button>
              )}
            </div>
          )}

          {/* Reply Form */}
          {isReplying && (
            <div className="mt-4">
              <CommentForm
                onSubmit={handleReply}
                isLoading={createReply.isPending}
                placeholder="Write a reply..."
                buttonText="Post Reply"
              />
            </div>
          )}

          {/* Replies */}
          {showReplies && replies && replies.length > 0 && (
            <div className="mt-4 space-y-4 pl-4 border-l-2">
              {replies.map((reply) => {
                const isReplyOwner = user?.id === reply.member_id._id;
                const isEdited =
                  new Date(reply.updatedAt) > new Date(reply.createdAt);

                return (
                  <ReplyItem
                    key={reply._id}
                    reply={reply}
                    isOwner={isReplyOwner}
                    isEdited={isEdited}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
