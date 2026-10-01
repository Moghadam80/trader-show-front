import { api } from "@/lib/api";
import { ExpenseFormValues } from "../validations/expense";

export type ExpenseActionState = {
  success: boolean;
  error: boolean;
  message: string;
};

export const initialExpenseActionState: ExpenseActionState = {
  success: false,
  error: false,
  message: "",
};

export async function createExpenseAction(
  _prevState: ExpenseActionState,
  values: ExpenseFormValues,
): Promise<ExpenseActionState> {
  try {
    await api.createExpense({
      paidById: values.paidById,
      expenseForId: values.expenseForId,
      amount: Number(values.amount),
      description: values.description.trim(),
    });

    return {
      success: true,
      error: false,
      message: "Expense saved successfully.",
    };
  } catch (error) {
    return {
      success: false,
      error: true,
      message:
        error instanceof Error
          ? error.message
          : "Unable to save the expense.",
    };
  }
}