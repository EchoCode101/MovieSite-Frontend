import { createFileRoute } from "@tanstack/react-router";
import { RegisterForm } from "@/features/auth/components/register-form";
import { requireGuest } from "@/lib/auth-guard";

export const Route = createFileRoute("/auth/register")({
  beforeLoad: async () => {
    await requireGuest();
  },
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <RegisterForm />
    </div>
  );
}
