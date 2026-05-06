import { Outlet, useLocation } from "react-router";
import { Navbar } from "@/shared/components/layout/Navbar";
import { DashboardShell } from "@/shared/components/layout/DashboardShell";
import { useAuthStore } from "@/shared/stores/authStore";

export function DashboardLayout() {
  const user = useAuthStore((s) => s.user)!;
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <DashboardShell role={user.role} currentPath={pathname}>
        <Outlet />
      </DashboardShell>
    </div>
  );
}
