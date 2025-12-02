import { createFileRoute } from "@tanstack/react-router";

import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { requireGuest } from "@/lib/auth-guard";

export const Route = createFileRoute("/reset-password/$token")({
  beforeLoad: () => requireGuest(),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const { token } = Route.useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl">
        <h1 className="mb-2 text-center text-2xl font-semibold text-slate-50">
          Reset password
        </h1>
        <p className="mb-6 text-center text-sm text-slate-400">
          Enter your new password below.
        </p>
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
