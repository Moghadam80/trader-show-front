import type { Balance, Expense, User } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  if (!response.ok) {
    const message = await response.json().catch(() => null);
    throw new Error(message?.message ?? "Something went wrong");
  }
  return response.json();
}

export const api = {
  users: () => request<User[]>("/users"),
  expenses: () => request<Expense[]>("/expenses"),
  balances: () => request<Balance[]>("/balances"),
  createExpense: (body: {
    paidById: string;
    expenseForId: string;
    amount: number;
    description: string;
  }) =>
    request<Expense>("/expenses", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
