import { Outlet, useLocation } from "react-router";
import { Navbar } from "@/shared/components/layout/Navbar";
import { DashboardShell } from "@/shared/components/layout/DashboardShell";
import { ROUTES } from "@/shared/constants/routes";

export function AdminLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <DashboardShell role="admin" currentPath={pathname || ROUTES.admin}>
        <Outlet />
      </DashboardShell>
    </div>
  );
}
