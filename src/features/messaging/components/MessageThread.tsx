
import { useEffect, useRef, useState } from "react";
import { Send, Paperclip, ArrowLeft, Video, Phone } from "lucide-react";
import { format } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn, getInitials } from "@/shared/lib/utils";
import type {
  Conversation,
  Message,
} from "@/features/messaging/types/messaging.types";

interface MessageThreadProps {
  conversation: Conversation;
  initialMessages: Message[];
  onBack?: () => void;
}

export function MessageThread({
  conversation,
  initialMessages,
  onBack,
}: MessageThreadProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  function send() {
    const content = draft.trim();
    if (!content) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        conversationId: conversation.id,
        senderId: "me",
        content,
        createdAt: new Date().toISOString(),
      },
    ]);
    setDraft("");
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
        {onBack && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onBack}
            className="md:hidden"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <div className="relative shrink-0">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={conversation.counterpartAvatar ?? undefined}
              alt={conversation.counterpartName}
            />
            <AvatarFallback>
              {getInitials(conversation.counterpartName)}
            </AvatarFallback>
          </Avatar>
          {conversation.isOnline && (
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-500" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {conversation.counterpartName}
          </p>
          <p className="text-xs text-muted-foreground">
            {conversation.isOnline ? "Online" : "Offline"}
            {conversation.bookingContext &&
              ` · ${conversation.bookingContext}`}
          </p>
        </div>
        <Button variant="ghost" size="icon-sm" aria-label="Voice call">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Video call">
          <Video className="h-4 w-4" />
        </Button>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto bg-muted/20 p-4"
      >
        {messages.map((msg, idx) => {
          const mine = msg.senderId === "me";
          const prev = messages[idx - 1];
          const showTime =
            !prev ||
            new Date(msg.createdAt).getTime() -
              new Date(prev.createdAt).getTime() >
              5 * 60 * 1000;

          return (
            <div key={msg.id} className="flex flex-col">
              {showTime && (
                <p className="my-2 text-center text-[11px] text-muted-foreground">
                  {format(new Date(msg.createdAt), "MMM d, h:mm a")}
                </p>
              )}
              <div
                className={cn(
                  "flex max-w-[75%] flex-col gap-1",
                  mine ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div
                  className={cn(
                    "whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
                    mine
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm bg-background border border-border/60"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-muted-foreground">
            <Badge variant="outline">New conversation</Badge>
            <p className="text-sm">Say hi to get started.</p>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="border-t border-border/60 bg-background p-3"
      >
        <div className="flex items-end gap-2 rounded-xl border border-border/60 bg-card p-2">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Attach file"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write a message…"
            rows={1}
            className="min-h-[36px] flex-1 resize-none border-0 bg-transparent p-1.5 shadow-none focus-visible:ring-0"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <Button
            type="submit"
            size="icon-sm"
            disabled={!draft.trim()}
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-1.5 text-[11px] text-muted-foreground">
          Press Enter to send · Shift + Enter for a new line
        </p>
      </form>
    </div>
  );
}
