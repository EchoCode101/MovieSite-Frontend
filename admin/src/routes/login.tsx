import { createFileRoute } from "@tanstack/react-router";

import { LoginForm } from "@/features/auth/components/login-form";
import { requireGuest } from "@/lib/auth-guard";

export const Route = createFileRoute("/login")({
  beforeLoad: () => requireGuest(),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800/50 bg-slate-900/60 backdrop-blur-xl p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-3xl font-bold text-slate-50 tracking-tight">
            Admin Login
          </h1>
          <p className="text-sm text-slate-400">
            Sign in to manage your Vidstie platform.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
