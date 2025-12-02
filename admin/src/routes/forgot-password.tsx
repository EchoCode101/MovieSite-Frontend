import { createFileRoute } from "@tanstack/react-router";

import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { requireGuest } from "@/lib/auth-guard";

export const Route = createFileRoute("/forgot-password")({
  beforeLoad: () => requireGuest(),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl">
        <h1 className="mb-2 text-center text-2xl font-semibold text-slate-50">
          Forgot password
        </h1>
        <p className="mb-6 text-center text-sm text-slate-400">
          Enter your email address and we&apos;ll send you a reset link if an
          account exists.
        </p>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
