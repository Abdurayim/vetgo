
import { useState } from "react";
import { MessageSquareDashed } from "lucide-react";

import { ConversationList } from "./ConversationList";
import { MessageThread } from "./MessageThread";
import {
  MOCK_CONVERSATIONS,
  MOCK_MESSAGES,
} from "@/features/messaging/data/mockMessages";
import { cn } from "@/shared/lib/utils";

interface MessagingLayoutProps {
  initialConversationId?: string;
}

export function MessagingLayout({
  initialConversationId,
}: MessagingLayoutProps) {
  const [activeId, setActiveId] = useState<string | undefined>(
    initialConversationId ?? MOCK_CONVERSATIONS[0]?.id
  );

  const active = MOCK_CONVERSATIONS.find((c) => c.id === activeId);
  const messages = active ? MOCK_MESSAGES[active.id] ?? [] : [];

  return (
    <div className="h-[calc(100vh-10rem)] overflow-hidden rounded-2xl border border-border/60 bg-background">
      <div className="grid h-full md:grid-cols-[320px_1fr]">
        <aside
          className={cn(
            "h-full border-r border-border/60",
            active ? "hidden md:block" : "block"
          )}
        >
          <ConversationList
            conversations={MOCK_CONVERSATIONS}
            activeId={activeId}
          />
        </aside>

        <section className={cn("h-full", !active && "hidden md:flex md:items-center md:justify-center")}>
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
