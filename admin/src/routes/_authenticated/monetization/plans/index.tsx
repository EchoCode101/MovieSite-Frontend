import { useEffect, useMemo, useState } from "react";

import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

import type { Plan, PlanListParams } from "@/features/monetization/plans/types";
import { usePlans } from "@/features/monetization/plans/hooks";
import { PlanFilters } from "@/features/monetization/plans/components/plan-filters";
import { PlansTable } from "@/features/monetization/plans/components/plans-table";
import { PlanFormDialog } from "@/features/monetization/plans/components/plan-form-dialog";
import { DeletePlanDialog } from "@/features/monetization/plans/components/delete-plan-dialog";

export const Route = createFileRoute("/_authenticated/monetization/plans/")({
  component: PlansPage,
});

function PlansPage() {
  const [page, setPage] = useState(1);
  const [filterState, setFilterState] = useState<
    Omit<PlanListParams, "page" | "limit">
  >({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const params: PlanListParams = useMemo(
    () => ({
      page,
      limit: 10,
      is_active: filterState.is_active,
      is_featured: filterState.is_featured,
      billing_cycle: filterState.billing_cycle,
    }),
    [page, filterState]
  );

  const { data, isLoading } = usePlans(params);
  const plans = data?.plans ?? [];

  useEffect(() => {
    // reset active plan on mount
    setActivePlan(null);
  }, []);

  const handleCreate = () => {
    setFormMode("create");
    setActivePlan(null);
    setIsFormOpen(true);
  };

  const handleEdit = (plan: Plan) => {
    setFormMode("edit");
    setActivePlan(plan);
    setIsFormOpen(true);
  };

  const handleDelete = (plan: Plan) => {
    setActivePlan(plan);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-6">
      <header className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">
            Subscription plans
          </h1>
          <p className="text-sm text-slate-400">
            Manage subscription plans, pricing, and billing cycles.
          </p>
        </div>
        <Button type="button" onClick={handleCreate} className="shrink-0">
          Create plan
        </Button>
      </header>

      <PlanFilters
        value={filterState}
        onChange={(next) => {
          setFilterState(next);
          setPage(1);
        }}
      />

      <PlansTable
        plans={plans}
        isLoading={isLoading}
        page={data?.currentPage ?? page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={(next) => {
          if (next < 1 || (data && next > data.totalPages)) return;
          setPage(next);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PlanFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        mode={formMode}
        plan={activePlan}
      />

      <DeletePlanDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        plan={activePlan}
      />
    </div>
  );
}
