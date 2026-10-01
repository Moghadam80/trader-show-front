"use client";

import { ArrowDownLeft, Check, UsersRound } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { money } from "@/lib/format";
import { Avatar } from "./avatar";

export function BalancesSection() {
  const { data: balances } = useSuspenseQuery({
    queryKey: ["balances"],
    queryFn: api.balances,
  });

  return (
    <section className="min-w-0 overflow-hidden rounded-3xl bg-ink p-5 text-white shadow-card sm:p-7">
      <div className="mb-6 flex min-w-0 flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <UsersRound className="h-5 w-5 text-[#f9b795]" />
            <h2 className="font-display text-xl font-bold">Balances</h2>
          </div>
          <p className="mt-1 text-sm text-white/50">Net amount to settle</p>
        </div>
        <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/60">
          {balances.length} open
        </span>
      </div>
      {balances.length === 0 ? (
        <div className="flex min-h-[230px] flex-col items-center justify-center rounded-2xl border border-white/10 text-center">
          <Check className="mb-3 rounded-full bg-mint p-2 text-ink" />
          <p className="font-semibold">Everyone is settled up</p>
          <p className="mt-1 text-sm text-white/50">No outstanding balances.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {balances.map((balance) => (
            <div
              key={`${balance.creditor.id}-${balance.debtor.id}`}
              className="min-w-0 rounded-2xl bg-white/10 p-3 sm:p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <Avatar user={balance.debtor} muted />
                  <ArrowDownLeft className="h-4 w-4 shrink-0 text-[#f9b795]" />
                  <span className="truncate text-sm font-semibold">
                    {balance.creditor.name}
                  </span>
                </div>
                <span className="shrink-0 whitespace-nowrap text-base font-bold tabular-nums text-[#f9b795] sm:font-display sm:text-xl">
                  {money.format(balance.amount)}
                </span>
              </div>
              <p className="mt-2 pl-11 text-xs text-white/45">
                {balance.debtor.name} owes {balance.creditor.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
