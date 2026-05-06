import { Link } from "react-router";
import {
  Calendar,
  MessageSquare,
  Package,
  User,
  BarChart3,
  Clock,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { ROUTES } from "@/shared/constants/routes";
import type { UserRole } from "@/shared/types/domain.types";

interface DashboardShellProps {
  children: React.ReactNode;
  role: UserRole;
  currentPath: string;
}

const NAV_ITEMS: Record<
  UserRole,
  { href: string; label: string; icon: React.ReactNode }[]
> = {
  pet_owner: [
    {
      href: ROUTES.bookings,
      label: "My Bookings",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      href: ROUTES.messages,
      label: "Messages",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      href: ROUTES.profile,
      label: "Profile",
      icon: <User className="h-4 w-4" />,
    },
  ],
  vet: [
    {
      href: ROUTES.vetDashboard,
      label: "Overview",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      href: ROUTES.bookings,
      label: "Bookings",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      href: ROUTES.vetAvailability,
      label: "Availability",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      href: ROUTES.messages,
      label: "Messages",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      href: ROUTES.profile,
      label: "Profile",
      icon: <User className="h-4 w-4" />,
    },
  ],
  seller: [
    {
      href: ROUTES.sellerProducts,
      label: "My Products",
      icon: <Package className="h-4 w-4" />,
    },
    {
      href: ROUTES.profile,
      label: "Profile",
      icon: <User className="h-4 w-4" />,
    },
  ],
  admin: [
    {
      href: ROUTES.admin,
      label: "Overview",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      href: ROUTES.adminUsers,
      label: "Users",
      icon: <User className="h-4 w-4" />,
    },
    {
      href: ROUTES.adminListings,
      label: "Listings",
      icon: <Package className="h-4 w-4" />,
    },
  ],
};

export function DashboardShell({
  children,
  role,
  currentPath,
}: DashboardShellProps) {
  const navItems = NAV_ITEMS[role] ?? NAV_ITEMS.pet_owner;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="hidden w-56 shrink-0 border-r border-border/60 bg-sidebar md:block">
        <nav className="p-3 space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              currentPath === item.href ||
              currentPath.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <span
                  className={cn(
                    "shrink-0",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.icon}
                </span>
                {item.label}
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
