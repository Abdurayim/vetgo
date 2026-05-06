import { Navigate } from "react-router";
import { useAuthStore } from "@/shared/stores/authStore";
import { ROLE_DASHBOARD_ROUTES } from "@/shared/constants/roles";

export function DashboardPage() {
  const user = useAuthStore((s) => s.user)!;
  const route = ROLE_DASHBOARD_ROUTES[user.role];

  // Non-pet-owner roles redirect to their specific dashboard section
  if (route !== "/dashboard") {
    return <Navigate to={route} replace />;
  }

  return (
    <div>
      <title>Dashboard — VetGo</title>
      <h1 className="text-2xl font-bold">
        Welcome back, {user.full_name || "there"}!
      </h1>
      <p className="mt-2 text-muted-foreground">
        Manage your bookings and pets from here.
      </p>
    </div>
  );
}
