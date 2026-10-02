"use client";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ApiError } from "@/lib/api";

function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong while loading this section.";
}

function RequestError({
  error,
  resetErrorBoundary,
  title,
}: FallbackProps & { title: string }) {
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) resetErrorBoundary();
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-700">
            <AlertCircle className="h-5 w-5" />
          </div>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{getErrorMessage(error)}</DialogDescription>
        </DialogHeader>

        <Button type="button" className="mt-3" onClick={resetErrorBoundary}>
          <RefreshCcw className="h-4 w-4" />
          Try again
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export function RequestBoundary({
  children,
  title = "Couldn't load this section",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={(props) => <RequestError {...props} title={title} />}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}