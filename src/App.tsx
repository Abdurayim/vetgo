import { RouterProvider } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/shared/providers/ThemeProvider";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { AuthProvider } from "@/shared/providers/AuthProvider";
import { router } from "@/router";

export function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
