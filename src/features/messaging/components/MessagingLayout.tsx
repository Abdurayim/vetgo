import { useState } from "react";
import { MessageSquareDashed } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { ConversationList } from "./ConversationList";
import { MessageThread } from "./MessageThread";
import {
  getConversations,
  getMessages,
} from "@/features/messaging/api/messagingApi";
import { LoadingSpinner } from "@/shared/components/feedback/LoadingSpinner";
import { cn } from "@/shared/lib/utils";

interface MessagingLayoutProps {
  initialConversationId?: string;
}

export function MessagingLayout({
  initialConversationId,
}: MessagingLayoutProps) {
  const [activeId, setActiveId] = useState<string | undefined>(
    initialConversationId,
  );

  const { data: conversations = [], isLoading: loadingConvs } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
    staleTime: 30_000,
    select: (data) => {
      // Auto-select first conversation if none chosen
      if (!activeId && data.length > 0 && !initialConversationId) {
        // Set state after render via effect-free pattern: just keep activeId as
        // first item until user clicks something
      }
      return data;
    },
  });

  // Resolve active conversation from query data (avoids stale closure on mock)
  const resolvedId = activeId ?? conversations[0]?.id;
  const active = conversations.find((c) => c.id === resolvedId);

  const { data: messages = [] } = useQuery({
    queryKey: ["messages", resolvedId],
    queryFn: () => getMessages(resolvedId!),
    enabled: !!resolvedId,
    staleTime: 15_000,
  });

  if (loadingConvs) {
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-10rem)] overflow-hidden rounded-2xl border border-border/60 bg-background">
      <div className="grid h-full md:grid-cols-[320px_1fr]">
        <aside
          className={cn(
            "h-full border-r border-border/60",
            active ? "hidden md:block" : "block",
          )}
        >
          <ConversationList
            conversations={conversations}
            activeId={resolvedId}
            onSelect={setActiveId}
          />
        </aside>

        <section
          className={cn(
            "h-full",
            !active && "hidden md:flex md:items-center md:justify-center",
          )}
        >
          {active ? (
            <MessageThread
              conversation={active}
              initialMessages={messages}
              onBack={() => setActiveId(undefined)}
            />
          ) : (
            <div className="flex flex-col items-center gap-3 p-8 text-center text-muted-foreground">
              <MessageSquareDashed className="h-10 w-10" />
              <p className="text-sm">
                Pick a conversation from the left to start chatting.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
