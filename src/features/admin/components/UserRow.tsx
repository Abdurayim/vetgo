
import { useTransition } from "react";
import { Ban, UserCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, getInitials, formatDate } from "@/shared/lib/utils";
import { setUserBanned } from "@/features/admin/api/adminApi";
import type { AdminUserRow } from "@/features/admin/types/admin.types";

interface UserRowProps {
  user: AdminUserRow;
}

const ROLE_STYLES: Record<string, string> = {
  admin: "border-destructive/40 bg-destructive/10 text-destructive",
  vet: "border-primary/40 bg-primary/10 text-primary",
  seller: "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  pet_owner: "border-border bg-muted text-muted-foreground",
};

export function UserRow({ user }: UserRowProps) {
  const [pending, startTransition] = useTransition();

  function handleToggleBan() {
    startTransition(async () => {
      try {
        await setUserBanned(user.id, !user.is_banned);
        toast.success(user.is_banned ? "User unbanned" : "User banned");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed");
      }
    });
  }

  return (
    <li className="flex items-center gap-3 px-4 py-3">
      <Avatar className="h-10 w-10 shrink-0">
        <AvatarImage src={user.avatar_url ?? undefined} alt={user.full_name} />
        <AvatarFallback>{getInitials(user.full_name || "U")}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium">
            {user.full_name || "Unnamed"}
          </p>
          <Badge
            variant="outline"
            className={cn("capitalize", ROLE_STYLES[user.role])}
          >
            {user.role.replace("_", " ")}
          </Badge>
          {user.is_banned && (
            <Badge variant="destructive" className="text-xs">
              Banned
            </Badge>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {[user.city, user.country].filter(Boolean).join(", ") || "—"} · Joined{" "}
          {formatDate(user.created_at)}
        </p>
      </div>

      <Button
        size="sm"
        variant={user.is_banned ? "outline" : "ghost"}
        onClick={handleToggleBan}
        disabled={pending}
        className={cn(
          "gap-1",
          !user.is_banned && "text-muted-foreground hover:text-destructive"
        )}
      >
        {pending ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : user.is_banned ? (
          <UserCheck className="h-3.5 w-3.5" />
        ) : (
          <Ban className="h-3.5 w-3.5" />
        )}
        {user.is_banned ? "Unban" : "Ban"}
      </Button>
    </li>
  );
}
