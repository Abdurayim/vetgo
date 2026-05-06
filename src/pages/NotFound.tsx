import { Link } from "react-router";
import { FileQuestion } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/shared/lib/utils";

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <FileQuestion className="h-7 w-7 text-muted-foreground" />
      </div>
      <div>
        <h1 className="text-4xl font-extrabold">404</h1>
        <p className="mt-2 text-lg font-semibold">Page not found</p>
        <p className="mt-1 text-sm text-muted-foreground max-w-sm">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <Link to="/" className={cn(buttonVariants({}))}>
        Go home
      </Link>
    </div>
  );
}
