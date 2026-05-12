import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials, cn } from "@/shared/lib/utils";
import type { Conversation } from "@/features/messaging/types/messaging.types";

interface ConversationListProps {
  conversations: Conversation[];
  activeId?: string;
  onSelect?: (id: string) => void;
}

export function ConversationList({
  conversations,
  activeId,
  onSelect,
}: ConversationListProps) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    if (!query.trim()) return conversations;
    const q = query.toLowerCase();
    return conversations.filter(
      (c) =>
        c.counterpartName.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q)
    );
  }, [conversations, query]);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border/60 p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations"
            className="h-9 pl-9"
          />
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {filtered.map((conv) => {
          const isActive = conv.id === activeId;
          return (
            <button
              key={conv.id}
              type="button"
              onClick={() => onSelect?.(conv.id)}
              className={cn(
                "flex w-full gap-3 border-b border-border/40 px-3 py-3 text-left transition-colors",
                isActive
                  ? "bg-primary/10"
                  : "hover:bg-muted/50"
              )}
            >
              <div className="relative shrink-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={conv.counterpartAvatar ?? undefined}
                    alt={conv.counterpartName}
                  />
                  <AvatarFallback>
                    {getInitials(conv.counterpartName)}
                  </AvatarFallback>
                </Avatar>
                {conv.isOnline && (
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-sm font-medium">
                    {conv.counterpartName}
                  </p>
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    {formatDistanceToNow(new Date(conv.lastMessageAt), {
                      addSuffix: false,
                    })}
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-0.5 line-clamp-2 text-xs leading-tight",
                    conv.unreadCount > 0
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {conv.lastMessage}
                </p>
                {conv.bookingContext && (
                  <p className="mt-1 truncate text-[10px] uppercase tracking-wide text-muted-foreground/80">
                    {conv.bookingContext}
                  </p>
                )}
              </div>
              {conv.unreadCount > 0 && (
                <span className="self-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                  {conv.unreadCount}
                </span>
              )}
            </button>
          );
        })}
        {filtered.length === 0 && (
          <p className="p-6 text-center text-sm text-muted-foreground">
            No conversations match your search.
          </p>
        )}
      </nav>
    </div>
  );
}
