import { Outlet, createFileRoute } from "@tanstack/react-router";

import { AdminLayout } from "@/components/layout/admin-layout";
import { requireAuth } from "@/lib/auth-guard";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => requireAuth(),
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
