import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getUsers } from "@/features/admin/api/adminApi";
import { UserRow } from "@/features/admin/components/UserRow";
import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { LoadingSpinner } from "@/shared/components/feedback/LoadingSpinner";
import { Link } from "react-router";
import type { UserRole } from "@/shared/types/domain.types";

const ROLE_TABS: { label: string; value: UserRole | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pet owners", value: "pet_owner" },
  { label: "Vets", value: "vet" },
  { label: "Sellers", value: "seller" },
  { label: "Admins", value: "admin" },
];

const VALID_ROLES: UserRole[] = ["pet_owner", "vet", "seller", "admin"];

export function AdminUsersPage() {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get("role") ?? "";
  const activeRole: UserRole | "all" =
    VALID_ROLES.includes(roleParam as UserRole) ? (roleParam as UserRole) : "all";

  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users", activeRole],
    queryFn: () => getUsers({ role: activeRole }),
  });

  return (
    <div className="space-y-6">
      <title>Users — Admin — VetGo</title>
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review platform users and moderate behaviour.
        </p>
      </div>

      <div className="flex flex-wrap gap-1 rounded-xl border border-border/50 bg-muted/40 p-1.5">
        {ROLE_TABS.map((tab) => {
          const isActive = activeRole === tab.value;
          const href = tab.value === "all" ? "/admin/users" : `/admin/users?role=${tab.value}`;
          return (
            <Link
              key={tab.value}
              to={href}
              className={
                isActive
                  ? "rounded-lg bg-background px-3 py-1.5 text-sm font-medium text-primary shadow-sm border border-border/60"
                  : "rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              }
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : !users || users.length === 0 ? (
        <EmptyState
          icon={<Users className="h-6 w-6" />}
          title="No users found"
          description="Try a different role filter."
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y divide-border/50">
              {users.map((u) => (
                <UserRow key={u.id} user={u} />
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
