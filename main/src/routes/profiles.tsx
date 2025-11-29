import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useProfiles } from "@/features/profiles/hooks/useProfiles";
import { ProfileCard } from "@/features/profiles/components/profile-card";
import { ProfileForm } from "@/features/profiles/components/profile-form";
import { LoadingState } from "@/components/common/loading-state";
import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { requireAuth } from "@/lib/auth-guard";

export const Route = createFileRoute("/profiles")({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: ProfilesPage,
});

function ProfilesPage() {
  const { data: profiles, isLoading, error } = useProfiles();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message || "Failed to load profiles"} />;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Manage Profiles</h1>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Profile
          </Button>
        </div>

        {profiles && profiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No profiles yet"
            message="Create your first profile to get started with personalized viewing."
            actionLabel="Create Profile"
            onAction={() => setIsCreateOpen(true)}
          />
        )}
      </div>

      <ProfileForm
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        profile={null}
        onSuccess={() => setIsCreateOpen(false)}
      />
    </div>
  );
}
