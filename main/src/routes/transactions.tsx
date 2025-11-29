import { createFileRoute } from "@tanstack/react-router";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { requireAuth } from "@/lib/auth-guard";

export const Route = createFileRoute("/transactions")({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: TransactionsPage,
});

function TransactionsPage() {
  const { data: transactions, isLoading, error } = useTransactions();

  if (isLoading)
    return (
      <div className="container mx-auto py-8 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto py-8 text-center text-destructive">
        Error loading transactions: {error.message}
      </div>
    );

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Transaction History</h1>

        {transactions && transactions.length > 0 ? (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold text-lg">
                      {transaction.type === "subscription"
                        ? "Subscription"
                        : "Pay-Per-View"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(
                        transaction.createdAt || ""
                      ).toLocaleDateString()}
                    </p>
                  </div>
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
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium">
                    {transaction.currency} {transaction.amount.toFixed(2)}
                  </p>
                  {transaction.description && (
                    <p className="text-sm text-muted-foreground">
                      {transaction.description}
                    </p>
                  )}
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
    </div>
  );
}
