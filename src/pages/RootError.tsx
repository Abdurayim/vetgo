import { useEffect } from "react";
import { Link, useRouteError, isRouteErrorResponse } from "react-router";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/shared/lib/utils";

export function RootError() {
  const error = useRouteError();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const message =
    isRouteErrorResponse(error)
      ? `${error.status} — ${error.statusText || "An error occurred"}`
      : error instanceof Error
        ? error.message
        : "An unexpected error occurred.";

  function reset() {
    window.location.reload();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-7 w-7 text-destructive" />
      </div>
      <div>
        <h1 className="text-xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">{message}</p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={reset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Try again
        </Button>
        <Link to="/" className={cn(buttonVariants({}))}>
          Go home
        </Link>
      </div>
    </div>
  );
}
