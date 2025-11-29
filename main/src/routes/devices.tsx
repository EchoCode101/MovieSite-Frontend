import { createFileRoute } from "@tanstack/react-router";
import {
  useDevices,
  useDeviceLimit,
} from "@/features/devices/hooks/useDevices";
import { DeviceCard } from "@/features/devices/components/device-card";
import { LoadingState } from "@/components/common/loading-state";
import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";
import { AlertCircle } from "lucide-react";

import { requireAuth } from "@/lib/auth-guard";

export const Route = createFileRoute("/devices")({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: DevicesPage,
});

function DevicesPage() {
  const { data: devices, isLoading, error } = useDevices();
  const { data: deviceLimit } = useDeviceLimit();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message || "Failed to load devices"} />;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Devices</h1>
            {deviceLimit && (
              <p className="text-sm text-muted-foreground mt-2">
                {deviceLimit.currentDevices} of {deviceLimit.maxDevices} devices
                used
              </p>
            )}
          </div>
        </div>

        {deviceLimit && !deviceLimit.canAddDevice && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Device limit reached. Remove a device to add a new one.
            </p>
          </div>
        )}

        {devices && devices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No devices registered"
            message="Devices will be automatically registered when you log in from them."
          />
        )}
      </div>
    </div>
  );
}
