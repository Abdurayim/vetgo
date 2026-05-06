import { Link, useLocation, useNavigate } from "react-router";
import {
  Stethoscope,
  Menu,
  LogOut,
  User,
  ShoppingBag,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { logout } from "@/features/auth/api/authApi";
import { useAuthStore } from "@/shared/stores/authStore";
import { ROUTES } from "@/shared/constants/routes";
import { getInitials } from "@/shared/lib/utils";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";

const NAV_LINKS = [
  { href: ROUTES.vets, label: "Find a Vet", icon: Stethoscope },
  { href: ROUTES.products, label: "Shop", icon: ShoppingBag },
  { href: ROUTES.demo, label: "Demo", icon: Sparkles },
];

export function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const setUser = useAuthStore((s) => s.setUser);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  async function handleLogout() {
    await logout();
    setUser(null);
    navigate(ROUTES.login);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          to={ROUTES.home}
          className="flex items-center gap-2.5 font-bold text-base tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope className="h-4.5 w-4.5" />
          </span>
          <span className="text-foreground">VetGo</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1.5 rounded-xl border border-border/50 bg-muted/40 px-2 py-1.5">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                to={href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-background text-primary shadow-sm shadow-black/10 border border-border/60"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/60",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <NotificationBell />
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full outline-none ring-2 ring-transparent focus-visible:ring-ring transition-all">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={undefined} alt={user?.email ?? "User"} />
                    <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
                      {getInitials(user?.email ?? "U")}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-52 mt-1">
                  <div className="px-3 py-2 border-b border-border/50 mb-1">
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </p>
                  </div>
                  <DropdownMenuItem>
                    <Link
                      to={ROUTES.dashboard}
                      className="flex w-full items-center gap-2.5"
                    >
                      <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      to={ROUTES.profile}
                      className="flex w-full items-center gap-2.5"
                    >
                      <User className="h-4 w-4 text-muted-foreground" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive focus:bg-destructive/10 gap-2.5"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to={ROUTES.login}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "text-muted-foreground hover:text-foreground",
                )}
              >
                Sign in
              </Link>
              <Link
                to={ROUTES.register}
                className={cn(
                  buttonVariants({}),
                  "shadow-sm shadow-primary/25",
                )}
              >
                Get started
              </Link>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
