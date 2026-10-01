import { Check, ReceiptText } from "lucide-react";

export function EmptyState({ type }: { type: "expenses" | "balances" }) {
  const expenses = type === "expenses";
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-white/50 px-6 py-16 text-center">
      <div className="mb-4 rounded-2xl bg-mint p-3 text-ink">
        {expenses ? <ReceiptText /> : <Check />}
      </div>
      <h3 className="font-display text-lg font-bold">
        {expenses ? "No expenses yet" : "Everyone is settled up"}
      </h3>
      <p className="mt-1 max-w-xs text-sm leading-6 text-ink/55">
        {expenses
          ? "Add the first shared expense and we’ll keep the running total for you."
          : "Add an expense to see who owes what."}
      </p>
    </div>
  );
}
