import { createFileRoute } from "@tanstack/react-router";
import { useWatchlist } from "@/features/watch/hooks/useWatchlist";
import { WatchlistItemCard } from "@/features/watch/components/watchlist-item-card";
import { useUser } from "@/features/auth/hooks/useAuth";
import { getActiveProfileId } from "@/features/profiles/components/profile-selector";
import { LoadingState } from "@/components/common/loading-state";
import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";

import { requireAuth } from "@/lib/auth-guard";

export const Route = createFileRoute("/watchlist")({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: WatchlistPage,
});

function WatchlistPage() {
  const { data: user } = useUser();
  const activeProfileId = getActiveProfileId();
  const {
    data: watchlist,
    isLoading,
    error,
  } = useWatchlist({
    profile_id: activeProfileId || undefined,
  });

  if (!user) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p className="text-muted-foreground">
          Please log in to view your watchlist.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message || "Failed to load watchlist"} />;
  }

  if (!activeProfileId) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p className="text-muted-foreground">
          Please select a profile to view your watchlist.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>

        {watchlist && watchlist.items && watchlist.items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {watchlist.items.map((item) => (
              <WatchlistItemCard
                key={item.id}
                item={item}
                profileId={activeProfileId}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Your watchlist is empty"
            message="Start adding content to watch later!"
          />
        )}
      </div>
    </div>
  );
}
