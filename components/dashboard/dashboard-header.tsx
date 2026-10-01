import { CircleDollarSign } from "lucide-react";
import { AddExpenseDialog } from "./add-expense-dialog";

export function DashboardHeader() {
  return (
    <header className="flex items-start justify-between gap-5">
      <div>
        <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-ink/45">
          <CircleDollarSign className="h-4 w-4 text-coral" /> Common Ground
        </div>
        <h1 className="max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
          Shared spending,
          <br />
          <span className="text-coral">sorted.</span>
        </h1>
        <p className="mt-5 max-w-md text-base leading-7 text-ink/60">
          A clear view of what your group has spent and who needs to settle up.
        </p>
      </div>
      <div className="hidden sm:block">
        <AddExpenseDialog />
      </div>
    </header>
  );
}
