import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/features/auth/components/login-form";
import { requireGuest } from "@/lib/auth-guard";

export const Route = createFileRoute("/auth/login")({
  beforeLoad: async () => {
    await requireGuest();
  },
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <LoginForm />
    </div>
  );
}
