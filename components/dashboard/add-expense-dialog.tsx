"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useCallback, useState } from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@/lib/api";
import { expenseSchema } from "@/lib/validations/expense";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createExpenseAction } from "@/lib/actions/expense";

type ExpenseFormValues = z.infer<typeof expenseSchema>;

type ExpenseActionState = {
  success: boolean;
  error: boolean;
  message: string;
};

const initialState: ExpenseActionState = {
  success: false,
  error: false,
  message: "",
};

export function AddExpenseDialog() {
  const queryClient = useQueryClient();

  const { data: users } = useSuspenseQuery({
    queryKey: ["users"],
    queryFn: api.users,
  });

  const [open, setOpen] = useState(false);

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      paidById: "",
      expenseForId: "",
      amount: "",
      description: "",
    },
  });

  const handleSuccess = useCallback(() => {
    void queryClient.invalidateQueries({
      queryKey: ["expenses"],
    });
    void queryClient.invalidateQueries({
      queryKey: ["balances"],
    });
    form.reset();
    setOpen(false);
  }, [form, queryClient]);

  const action = useCallback(
    (previousState: ExpenseActionState, values: ExpenseFormValues) =>
      createExpenseAction(previousState, values, {
        onSuccess: handleSuccess,
      }),
    [handleSuccess],
  );
  const [state, dispatch, pending] = useActionState(action, initialState);

  function handleSubmit(values: ExpenseFormValues) {
    startTransition(() => {
      dispatch(values);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        Add expense
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record an expense</DialogTitle>

          <DialogDescription>
            Add a directional transaction. The person listed under “Expense for”
            owes the payer.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mt-6 space-y-5"
          >
            <FormField
              control={form.control}
              name="paidById"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid by</FormLabel>

                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a person" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expenseForId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense for</FormLabel>

                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a person" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink/40">
                      $
                    </span>

                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="0.00"
                        className="pl-7"
                      />
                    </FormControl>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Dinner at Noma"
                      maxLength={120}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {state.error && (
              <p className="text-sm text-red-600">{state.message}</p>
            )}

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Saving…" : "Save expense"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
