import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useSubscriptions,
  useActiveSubscription,
} from "@/features/subscriptions/hooks/useSubscriptions";
import { SubscriptionCard } from "@/features/subscriptions/components/subscription-card";
import { LoadingState } from "@/components/common/loading-state";
import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";

import { requireAuth } from "@/lib/auth-guard";

export const Route = createFileRoute("/subscriptions")({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: SubscriptionsPage,
});

function SubscriptionsPage() {
  const {
    data: subscriptions,
    isLoading: subscriptionsLoading,
    error: subscriptionsError,
  } = useSubscriptions();
  const {
    data: activeSubscription,
    isLoading: activeLoading,
    error: activeError,
  } = useActiveSubscription();

  const isLoading = subscriptionsLoading || activeLoading;
  const error = subscriptionsError || activeError;

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState message={error.message || "Failed to load subscriptions"} />
    );
  }

  // Filter out active subscription from history
  const subscriptionHistory =
    subscriptions?.filter((sub) => sub.id !== activeSubscription?.id) || [];

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">My Subscriptions</h1>

        {activeSubscription ? (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Active Subscription</h2>
            <SubscriptionCard
              subscription={activeSubscription}
              isActive={true}
            />
          </div>
        ) : (
          <div className="mb-8">
            <EmptyState
              title="No active subscription"
              message="Subscribe to a plan to access premium content and features."
              actionLabel="View Plans"
              onAction={() => {}}
            />
            <div className="text-center mt-4">
              <Button asChild>
                <Link to="/pricing">View Plans</Link>
              </Button>
            </div>
          </div>
        )}

        {subscriptionHistory.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Subscription History
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subscriptionHistory.map((subscription) => (
                <SubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                  isActive={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
