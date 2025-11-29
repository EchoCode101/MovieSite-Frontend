import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Trash2, ThumbsUp, ThumbsDown } from "lucide-react";
import { CommentForm } from "./comment-form";
import { useUpdateReply, useDeleteReply } from "../hooks/useComments";
import type { Reply } from "../types";
import { formatDistanceToNow } from "date-fns";
import {
  useLikeDislikeCounts,
  useToggleLikeDislike,
  useUserReaction,
} from "@/features/likes/hooks/useLikes";
import { useUser } from "@/features/auth/hooks/useAuth";

interface ReplyItemProps {
  reply: Reply;
  isOwner: boolean;
  isEdited: boolean;
}

export function ReplyItem({ reply, isOwner, isEdited }: ReplyItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const updateReply = useUpdateReply();
  const deleteReply = useDeleteReply();
  const { data: user } = useUser();

  // Like/Dislike functionality
  const { data: likeCounts } = useLikeDislikeCounts("comment_reply", reply._id);
  const { data: userReaction } = useUserReaction("comment_reply", reply._id);
  const toggleLike = useToggleLikeDislike();

  const handleLike = () => {
    toggleLike.mutate({
      target_id: reply._id,
      target_type: "comment_reply",
      is_like: true,
    });
  };

  const handleDislike = () => {
    toggleLike.mutate({
      target_id: reply._id,
      target_type: "comment_reply",
      is_like: false,
    });
  };

  const handleEdit = (content: string) => {
    updateReply.mutate(
      { replyId: reply._id, data: { reply_content: content } },
      {
        onSuccess: () => setIsEditing(false),
      }
    );
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this reply?")) {
      deleteReply.mutate(reply._id);
    }
  };

  return (
    <div className="flex gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={reply.member_id.profile_pic} />
        <AvatarFallback>
          {reply.member_id.username[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">
              {reply.member_id.first_name && reply.member_id.last_name
                ? `${reply.member_id.first_name} ${reply.member_id.last_name}`
                : reply.member_id.username}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(reply.createdAt), {
                addSuffix: true,
              })}
            </span>
            {isEdited && (
              <span className="text-xs text-primary italic font-bold ml-2">
                (Edited)
              </span>
            )}
          </div>
          {isOwner && !isEditing && (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-6 w-6 p-0"
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="h-6 w-6 p-0 text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
        {isEditing ? (
          <div className="mt-2">
            <CommentForm
              onSubmit={handleEdit}
              isLoading={updateReply.isPending}
              placeholder="Edit your reply..."
              buttonText="Save"
              initialValue={reply.reply_content}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(false)}
              className="mt-2"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <>
            <p className="text-sm mt-1">{reply.reply_content}</p>
            {/* Like/Dislike Buttons */}
            <div className="flex items-center gap-2 mt-2">
              <Button
                variant={userReaction?.isLike === true ? "default" : "ghost"}
                size="sm"
                className={`gap-1 h-7 ${
                  userReaction?.isLike === true
                    ? "bg-primary hover:bg-primary/90"
                    : ""
                }`}
                onClick={handleLike}
                disabled={!user || toggleLike.isPending}
              >
                <ThumbsUp className="h-3 w-3" />
                {likeCounts?.likes || 0}
              </Button>
              <Button
                variant={userReaction?.isLike === false ? "default" : "ghost"}
                size="sm"
                className={`gap-1 h-7 ${
                  userReaction?.isLike === false
                    ? "bg-destructive hover:bg-destructive/90"
                    : ""
                }`}
                onClick={handleDislike}
                disabled={!user || toggleLike.isPending}
              >
                <ThumbsDown className="h-3 w-3" />
                {likeCounts?.dislikes || 0}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
