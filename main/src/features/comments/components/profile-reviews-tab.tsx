import { useState, useMemo } from "react";
import { useUser } from "@/features/auth/hooks/useAuth";
import { useMyReviews, useRecentReviews, useBulkDeleteReviews } from "../hooks/useReviews";
import { ReviewItem } from "./review-item";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

/**
 * Profile Reviews Tab Component
 *
 * Displays user's reviews with pagination and recent reviews.
 *
 * Note: The backend paginated reviews endpoint may require admin authentication.
 * For regular users, this component will attempt to fetch reviews but may show
 * an error. Consider implementing a user-specific reviews endpoint on the backend
 * for better performance and user experience.
 */
export function ProfileReviewsTab() {
  const { data: user } = useUser();
  const [page, setPage] = useState(1);
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  const limit = 10;

  // Memoize the start date to prevent infinite re-renders
  const startDate = useMemo(
    () => new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    [] // Only calculate once
  );

  // User's own reviews (all)
  const {
    data: myReviewsData,
    isLoading: myReviewsLoading,
    error: myReviewsError,
  } = useMyReviews(
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

  // Recent reviews (last 30 days) - filter by user
  const {
    data: recentData,
    isLoading: recentLoading,
    error: recentError,
  } = useRecentReviews(
    {
      startDate,
    },
    {
      enabled: !!user,
    }
  );

  const bulkDelete = useBulkDeleteReviews();

  // Filter recent reviews by current user
  const userRecentReviews = useMemo(() => {
    if (!recentData || !user?.id) return [];
    return recentData.filter((review) => review.member_id?._id === user.id);
  }, [recentData, user?.id]);

  const handleSelectReview = (reviewId: string) => {
    setSelectedReviews((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const handleSelectAll = () => {
    if (!myReviewsData?.reviews) return;
    if (selectedReviews.length === myReviewsData.reviews.length) {
      setSelectedReviews([]);
    } else {
      setSelectedReviews(myReviewsData.reviews.map((r) => r._id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedReviews.length === 0) {
      toast.error("Please select reviews to delete");
      return;
    }

    try {
      await bulkDelete.mutateAsync(selectedReviews);
      setSelectedReviews([]);
      toast.success("Reviews deleted successfully");
    } catch (error) {
      toast.error("Failed to delete reviews");
    }
  };

  // Show loading only if we're actually loading and don't have data yet
  if ((myReviewsLoading && !myReviewsData) || (recentLoading && !recentData)) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">My Reviews</h2>
        {selectedReviews.length > 0 && (
          <Button
            variant="destructive"
            onClick={handleBulkDelete}
            disabled={bulkDelete.isPending}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Selected ({selectedReviews.length})
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Reviews</TabsTrigger>
          <TabsTrigger value="recent">Recent (30 days)</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {myReviewsError ? (
            <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 p-4 rounded-lg">
              <p className="font-medium">Unable to Load Reviews</p>
              <p className="text-sm mt-1">
                Unable to load your reviews at this time. Please try again later.
              </p>
              <p className="text-xs mt-2 opacity-75">
                Error:{" "}
                {myReviewsError instanceof Error
                  ? myReviewsError.message
                  : "Unknown error"}
              </p>
            </div>
          ) : !myReviewsData || myReviewsData.reviews.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>You haven't posted any reviews yet.</p>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center gap-2">
                <Checkbox
                  checked={
                    myReviewsData.reviews.length > 0 &&
                    selectedReviews.length === myReviewsData.reviews.length
                  }
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-muted-foreground">Select all</span>
              </div>

              <div className="space-y-4">
                {myReviewsData.reviews.map((review) => (
                  <div key={review._id} className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedReviews.includes(review._id)}
                      onCheckedChange={() => handleSelectReview(review._id)}
                      className="mt-2"
                    />
                    <div className="flex-1">
                      <ReviewItem review={review} />
                    </div>
                  </div>
                ))}
              </div>

              {myReviewsData.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {myReviewsData.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setPage((p) => Math.min(myReviewsData.totalPages, p + 1))
                    }
                    disabled={page === myReviewsData.totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          {recentError ? (
            <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 p-4 rounded-lg">
              <p className="font-medium">Unable to Load Recent Reviews</p>
              <p className="text-sm mt-1">
                {recentError instanceof Error &&
                recentError.message.includes("403")
                  ? "This feature requires admin access. For regular users, please use the reviews section on individual content pages."
                  : "Unable to load recent reviews at this time. Please try again later."}
              </p>
              {!(
                recentError instanceof Error &&
                recentError.message.includes("403")
              ) && (
                <p className="text-xs mt-2 opacity-75">
                  Error:{" "}
                  {recentError instanceof Error
                    ? recentError.message
                    : "Unknown error"}
                </p>
              )}
            </div>
          ) : userRecentReviews.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No reviews in the last 30 days.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userRecentReviews.map((review) => (
                <ReviewItem key={review._id} review={review} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
