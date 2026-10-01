import { z } from "zod";

export const expenseSchema = z
  .object({
    paidById: z.string().min(1, "Choose who paid."),
    expenseForId: z.string().min(1, "Choose who the expense was for."),
    amount: z
      .string()
      .trim()
      .min(1, "Enter an amount.")
      .refine(
        (value) => Number.isFinite(Number(value)) && Number(value) > 0,
        "Enter an amount greater than zero.",
      ),
    description: z
      .string()
      .trim()
      .min(1, "Add a description.")
      .max(120, "Description must be 120 characters or fewer."),
  })
  .refine((values) => values.paidById !== values.expenseForId, {
    message: "Paid by and expense for must be different people.",
    path: ["expenseForId"],
  });
export type ExpenseFormValues = z.infer<typeof expenseSchema>;