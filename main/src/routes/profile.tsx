import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SidebarLayout } from "@/components/layouts/sidebar-layout";
import { ProfileForm } from "@/features/user/components/profile-form";
import { useProfiles } from "@/features/profiles/hooks/useProfiles";
import { useActiveSubscription } from "@/features/subscriptions/hooks/useSubscriptions";
import { useDevices } from "@/features/devices/hooks/useDevices";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";
import { Loader2, MessageSquare, Star, User, Users, CreditCard, Smartphone, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { requireAuth } from "@/lib/auth-guard";
import { ProfileCommentsTab } from "@/features/comments/components/profile-comments-tab";
import { ProfileReviewsTab } from "@/features/comments/components/profile-reviews-tab";

export const Route = createFileRoute("/profile")({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: ProfilePage,
});

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { data: profiles, isLoading: profilesLoading } = useProfiles();
  const { data: activeSubscription, isLoading: subscriptionLoading } =
    useActiveSubscription();
  const { data: devices, isLoading: devicesLoading } = useDevices();
  const { data: transactions, isLoading: transactionsLoading } =
    useTransactions({ limit: 5 });

  const isLoading =
    profilesLoading ||
    subscriptionLoading ||
    devicesLoading ||
    transactionsLoading;

  const sidebarItems = [
    { value: "profile", label: "Profile", icon: <User className="h-4 w-4" /> },
    { value: "profiles", label: "Profiles", icon: <Users className="h-4 w-4" /> },
    { value: "subscription", label: "Subscription", icon: <CreditCard className="h-4 w-4" /> },
    { value: "devices", label: "Devices", icon: <Smartphone className="h-4 w-4" /> },
    { value: "transactions", label: "Transactions", icon: <History className="h-4 w-4" /> },
    { value: "comments", label: "Comments", icon: <MessageSquare className="h-4 w-4" /> },
    { value: "reviews", label: "Reviews", icon: <Star className="h-4 w-4" /> },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <SidebarLayout
          items={sidebarItems}
          activeValue={activeTab}
          onValueChange={setActiveTab}
        >

          {activeTab === "profile" && <ProfileForm />}

          {activeTab === "profiles" && (
            isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Manage Profiles</h2>
                  <Button asChild>
                    <Link to="/profiles">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Profile
                    </Link>
                  </Button>
                </div>
                {profiles && profiles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profiles.map((profile) => (
                      <div
                        key={profile.id}
                        className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <h3 className="text-xl font-semibold mb-2">
                          {profile.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {profile.is_kid ? "Kids Profile" : "Standard Profile"}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to="/profiles">Edit</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p className="mb-4">
                      No profiles yet. Create your first profile to get started.
                    </p>
                    <Button asChild>
                      <Link to="/profiles">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Profile
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            )
          )}

          {activeTab === "subscription" && (
            isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Subscription</h2>
                  <Button variant="outline" asChild>
                    <Link to="/subscriptions">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage
                    </Link>
                  </Button>
                </div>
                {activeSubscription ? (
                  <div className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">
                        {activeSubscription.plan?.name || "Active Subscription"}
                      </h3>
                      <Badge
                        variant={
                          activeSubscription.status === "active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {activeSubscription.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      {activeSubscription.plan ? (
                        <>
                          <p className="text-muted-foreground">
                            ${activeSubscription.plan.price}/
                            {activeSubscription.plan.billing_cycle}
                          </p>
                          <p className="text-muted-foreground">
                            Ends:{" "}
                            {new Date(
                              activeSubscription.ends_at
                            ).toLocaleDateString()}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-muted-foreground">
                            Total: {activeSubscription.currency}{" "}
                            {activeSubscription.total_amount.toFixed(2)}
                          </p>
                          <p className="text-muted-foreground">
                            Ends:{" "}
                            {new Date(
                              activeSubscription.ends_at
                            ).toLocaleDateString()}
                          </p>
                        </>
                      )}
                    </div>
                    <Button className="mt-4" variant="outline" asChild>
                      <Link to="/pricing">Change Plan</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="border rounded-lg p-6 text-center">
                    <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">
                      No active subscription
                    </p>
                    <Button asChild>
                      <Link to="/pricing">View Plans</Link>
                    </Button>
                  </div>
                )}
              </div>
            )
          )}

          {activeTab === "devices" && (
            isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Devices</h2>
                  <Button variant="outline" asChild>
                    <Link to="/devices">
                      <Smartphone className="h-4 w-4 mr-2" />
                      Manage
                    </Link>
                  </Button>
                </div>
                {devices && devices.length > 0 ? (
                  <div className="space-y-4">
                    {devices.slice(0, 3).map((device) => (
                      <div key={device.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">
                              {device.device_name}
                            </p>
                            <p className="text-sm text-muted-foreground capitalize">
                              {device.device_type}
                            </p>
                          </div>
                          {device.is_active && <Badge>Active</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No devices registered yet.</p>
                  </div>
                )}
              </div>
            )
          )}

          {activeTab === "transactions" && (
            isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">
                    Recent Transactions
                  </h2>
                  <Button variant="outline" asChild>
                    <Link to="/transactions">
                      <History className="h-4 w-4 mr-2" />
                      View All
                    </Link>
                  </Button>
                </div>
                {transactions && transactions.length > 0 ? (
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold capitalize">
                              {transaction.type}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(
                                transaction.createdAt || ""
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              {transaction.currency}{" "}
                              {transaction.amount.toFixed(2)}
                            </p>
                            <Badge
                              variant={
                                transaction.status === "paid"
                                  ? "default"
                                  : transaction.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No transactions yet.</p>
                  </div>
                )}
              </div>
            )
          )}

          {activeTab === "comments" && <ProfileCommentsTab />}

          {activeTab === "reviews" && <ProfileReviewsTab />}
        </SidebarLayout>
      </div>
    </div>
  );
}
