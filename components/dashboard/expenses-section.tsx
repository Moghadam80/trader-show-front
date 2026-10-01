"use client";

import { ArrowUpRight, CalendarDays, ReceiptText } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { date, money } from "@/lib/format";
import { Avatar } from "./avatar";
import { EmptyState } from "./empty-state";

export function ExpensesSection() {
  const { data: expenses } = useSuspenseQuery({
    queryKey: ["expenses"],
    queryFn: api.expenses,
  });

  return (
    <section className="min-w-0 overflow-hidden rounded-3xl border bg-white p-5 shadow-card sm:p-7">
      <div className="mb-6 flex min-w-0 flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <ReceiptText className="h-5 w-5 text-coral" />
            <h2 className="font-display text-xl font-bold">Recent expenses</h2>
          </div>
          <p className="mt-1 text-sm text-ink/50">
            The latest activity from your group
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-[#f1ede6] px-3 py-1 text-xs font-semibold text-ink/55">
          {expenses.length} {expenses.length === 1 ? "entry" : "entries"}
        </span>
      </div>
      {expenses.length === 0 ? (
        <EmptyState type="expenses" />
      ) : (
        <div className="space-y-2">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex min-w-0 items-center gap-3 overflow-hidden rounded-2xl border border-transparent p-3 transition hover:border-line hover:bg-[#fcfbf8]"
            >
              <Avatar user={expense.paidBy} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {expense.description}
                </p>
                <p className="mt-1 flex min-w-0 items-center gap-1 text-xs text-ink/45">
                  <span className="truncate">{expense.paidBy.name}</span>
                  <ArrowUpRight className="h-3 w-3 shrink-0" />
                  <span className="truncate">{expense.expenseFor.name}</span>
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="whitespace-nowrap text-sm font-bold">
                  {money.format(Number(expense.amount))}
                </p>
                <p className="mt-1 hidden items-center justify-end gap-1 text-xs text-ink/40 sm:flex">
                  <CalendarDays className="h-3 w-3" />
                  {date.format(new Date(expense.createdAt))}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
