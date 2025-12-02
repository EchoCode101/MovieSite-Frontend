import { useState } from "react";
import { useUser } from "@/features/auth/hooks/useAuth";
import {
  useMyComments,
  useBulkDeleteComments,
} from "../hooks/useComments";
import { CommentItem } from "./comment-item";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Comment } from "../types";

/**
 * Profile Comments Tab Component
 *
 * Displays user's comments with pagination and bulk delete functionality.
 *
 * Note: The backend paginated comments endpoint requires admin authentication.
 * For regular users, this component will attempt to fetch comments but may show
 * an error. Consider implementing a user-specific comments endpoint on the backend
 * for better performance and user experience.
 */
export function ProfileCommentsTab() {
  const { data: user } = useUser();
  const [selectedComments, setSelectedComments] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Use user-specific endpoint
  const { data, isLoading, error } = useMyComments(
    {
      page,
      limit,
      sort: "createdAt",
      order: "DESC",
    },
    {
      enabled: !!user,
    }
  );

  const bulkDelete = useBulkDeleteComments();

  const handleSelectComment = (commentId: string) => {
    setSelectedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleSelectAll = () => {
    if (!data?.comments) return;
    if (selectedComments.length === data.comments.length) {
      setSelectedComments([]);
    } else {
      setSelectedComments(data.comments.map((c) => c._id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedComments.length === 0) {
      toast.error("Please select comments to delete");
      return;
    }

    try {
      await bulkDelete.mutateAsync(selectedComments);
      setSelectedComments([]);
      toast.success("Comments deleted successfully");
    } catch (error) {
      toast.error("Failed to delete comments");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 p-4 rounded-lg">
        <p className="font-medium">Unable to Load Comments</p>
        <p className="text-sm mt-1">
          Unable to load your comments at this time. Please try again later.
        </p>
        <p className="text-xs mt-2 opacity-75">
          Error: {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }

  if (!data || data.comments.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>You haven't posted any comments yet.</p>
      </div>
    );
  }

  // Data from useMyComments already contains only user's comments
  const userComments = data.comments;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">My Comments</h2>
        {selectedComments.length > 0 && (
          <Button
            variant="destructive"
            onClick={handleBulkDelete}
            disabled={bulkDelete.isPending}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Selected ({selectedComments.length})
          </Button>
        )}
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Checkbox
          checked={
            userComments.length > 0 &&
            selectedComments.length === userComments.length
          }
          onCheckedChange={handleSelectAll}
        />
        <span className="text-sm text-muted-foreground">Select all</span>
      </div>

      <div className="space-y-4">
        {userComments.map((comment) => (
          <div key={comment._id} className="flex items-start gap-3">
            <Checkbox
              checked={selectedComments.includes(comment._id)}
              onCheckedChange={() => handleSelectComment(comment._id)}
              className="mt-2"
            />
            <div className="flex-1">
              <CommentItem comment={comment} />
            </div>
          </div>
        ))}
      </div>

      {data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {data.totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={page === data.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
