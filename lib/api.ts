import type { Balance, Expense, User } from "@/types";

const API_URL =
  typeof window === "undefined"
    ? (process.env.BACKEND_API_URL ?? "http://localhost:4000")
    : "/api/backend";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function getErrorMessage(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== "object") return fallback;
  const message = (payload as { message?: unknown }).message;
  if (Array.isArray(message)) return message.join(" ");
  return typeof message === "string" ? message : fallback;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...options?.headers },
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      throw new ApiError(
        getErrorMessage(payload, "The request could not be completed."),
        response.status,
        payload,
      );
    }
    return response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      "Unable to connect to the backend. Please check that the API is running.",
      0,
      error,
    );
  }
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
