export type User = { id: string; name: string; email: string };
export type Expense = {
  id: string;
  paidBy: User;
  expenseFor: User;
  amount: number;
  description: string;
  createdAt: string;
};
export type Balance = { creditor: User; debtor: User; amount: number };
