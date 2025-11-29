import { createFileRoute } from "@tanstack/react-router";
import { PricingTable } from "@/features/payment/components/pricing-table";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-4">Choose Your Plan</h1>
      <p className="text-center text-muted-foreground mb-8">
        Unlock premium features and exclusive content.
      </p>
      <PricingTable />
    </div>
  );
}
