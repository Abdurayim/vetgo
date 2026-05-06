import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "@/shared/stores/authStore";
import { ROUTES } from "@/shared/constants/routes";
import type { UserRole } from "@/shared/types/domain.types";

interface RequireAuthProps {
  role?: UserRole | UserRole[];
}

export function RequireAuth({ role }: RequireAuthProps) {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to={`${ROUTES.login}?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  if (role) {
    const allowed = Array.isArray(role) ? role : [role];
    if (!allowed.includes(user.role)) {
      return <Navigate to={ROUTES.dashboard} replace />;
    }
  }

  return <Outlet />;
}

export function RedirectIfAuthed() {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);

  if (isLoading) return null;
  if (user) return <Navigate to={ROUTES.dashboard} replace />;
  return <Outlet />;
}
