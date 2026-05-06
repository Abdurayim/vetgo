
import { useState, useTransition } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/shared/lib/utils";
import {
  addBlockedDate,
  removeBlockedDate,
} from "@/features/vets/api/vetsApi";
import type { BlockedDate } from "@/features/vets/types/availability.types";

interface BlockedDatesEditorProps {
  blocked: BlockedDate[];
}

export function BlockedDatesEditor({ blocked }: BlockedDatesEditorProps) {
  const [pending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");

  function handleAdd() {
    if (!date) {
      toast.error("Pick a date first");
      return;
    }
    startTransition(async () => {
      try {
        await addBlockedDate({ blockedDate: date, reason: reason || undefined });
        toast.success("Date blocked");
        setDate("");
        setReason("");
        setShowForm(false);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to block date");
      }
    });
  }

  function handleRemove(id: string) {
    startTransition(async () => {
      try {
        await removeBlockedDate(id);
        toast.success("Unblocked");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to unblock");
      }
    });
  }

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Blocked dates</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Holidays or days you&apos;re unavailable.
            </p>
          </div>
          {!showForm && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowForm(true)}
              className="gap-1"
            >
              <Plus className="h-3.5 w-3.5" />
              Block a date
            </Button>
          )}
        </div>

        {showForm && (
          <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-border/60 bg-muted/30 p-3">
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-8 w-40 text-xs"
            />
            <Input
              placeholder="Reason (optional)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="h-8 flex-1 min-w-40 text-xs"
            />
            <Button size="sm" onClick={handleAdd} disabled={pending} className="h-8">
              {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Block"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowForm(false)}
              className="h-8"
            >
              Cancel
            </Button>
          </div>
        )}

        {blocked.length === 0 ? (
          <p className="mt-4 text-xs text-muted-foreground">
            No upcoming blocked dates.
          </p>
        ) : (
          <ul className="mt-4 space-y-1.5">
            {blocked.map((b) => (
              <li
                key={b.id}
                className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2 text-sm"
              >
                <div className="min-w-0">
                  <p className="font-medium">{formatDate(b.blocked_date)}</p>
                  {b.reason && (
                    <p className="truncate text-xs text-muted-foreground">
                      {b.reason}
                    </p>
                  )}
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleRemove(b.id)}
                  disabled={pending}
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  aria-label="Remove"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
