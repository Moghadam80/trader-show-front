import { Suspense } from "react";
import { AddExpenseDialog } from "@/components/dashboard/add-expense-dialog";
import { BalancesSection } from "@/components/dashboard/balances-section";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { ExpensesSection } from "@/components/dashboard/expenses-section";

export function Dashboard() {
  return (
    <main className="min-h-screen min-w-0 overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[460px] bg-[radial-gradient(circle_at_10%_0%,#dff3e8_0,transparent_37%),radial-gradient(circle_at_90%_0%,#f9d9c7_0,transparent_35%)]" />

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardHeader />
        </Suspense>

        <div className="mt-8 sm:hidden">
          <Suspense fallback={null}>
            <AddExpenseDialog />
          </Suspense>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-[1.35fr_1fr]">
          <Suspense fallback={<DashboardSkeleton />}>
            <ExpensesSection />
          </Suspense>

          <Suspense fallback={<DashboardSkeleton />}>
            <BalancesSection />
          </Suspense>
        </div>

        <footer className="mt-8 flex items-center justify-between border-t pt-5 text-xs text-ink/40">
          <span>Built for better group decisions.</span>

          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-mint" />
            live totals
          </span>
        </footer>
      </div>
    </main>
  );
}
