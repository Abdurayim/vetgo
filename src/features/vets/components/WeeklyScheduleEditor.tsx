
import { useState, useTransition } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  addAvailabilitySlot,
  removeAvailabilitySlot,
} from "@/features/vets/api/vetsApi";
import {
  DAY_NAMES,
  type AvailabilitySlot,
  type DayOfWeek,
} from "@/features/vets/types/availability.types";

interface WeeklyScheduleEditorProps {
  slots: AvailabilitySlot[];
}

const DAYS: DayOfWeek[] = [1, 2, 3, 4, 5, 6, 0];

export function WeeklyScheduleEditor({ slots }: WeeklyScheduleEditorProps) {
  const [pending, startTransition] = useTransition();
  const [draftDay, setDraftDay] = useState<DayOfWeek | null>(null);
  const [draftStart, setDraftStart] = useState("09:00");
  const [draftEnd, setDraftEnd] = useState("17:00");

  function slotsFor(day: DayOfWeek) {
    return slots.filter((s) => s.day_of_week === day);
  }

  function handleAdd(day: DayOfWeek) {
    startTransition(async () => {
      try {
        await addAvailabilitySlot({
          dayOfWeek: day,
          startTime: draftStart,
          endTime: draftEnd,
        });
        toast.success("Slot added");
        setDraftDay(null);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to add slot");
      }
    });
  }

  function handleRemove(id: string | number) {
    startTransition(async () => {
      try {
        await removeAvailabilitySlot(id);
        toast.success("Slot removed");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to remove slot");
      }
    });
  }

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-2">
          {DAYS.map((day) => {
            const daySlots = slotsFor(day);
            const isEditing = draftDay === day;
            return (
              <div
                key={day}
                className="flex flex-col gap-2 rounded-lg border border-border/60 p-3 sm:flex-row sm:items-center"
              >
                <p className="w-24 shrink-0 text-sm font-semibold">
                  {DAY_NAMES[day]}
                </p>

                <div className="flex flex-1 flex-wrap items-center gap-1.5">
                  {daySlots.length === 0 && !isEditing && (
                    <span className="text-xs text-muted-foreground">
                      Closed
                    </span>
                  )}
                  {daySlots.map((s) => (
                    <span
                      key={s.id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      {s.start_time.slice(0, 5)} – {s.end_time.slice(0, 5)}
                      <button
                        type="button"
                        onClick={() => handleRemove(s.id)}
                        disabled={pending}
                        aria-label="Remove slot"
                        className="rounded-full hover:bg-primary/20"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}

                  {isEditing && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Input
                        type="time"
                        value={draftStart}
                        onChange={(e) => setDraftStart(e.target.value)}
                        className="h-8 w-28 text-xs"
                      />
                      <span className="text-xs text-muted-foreground">–</span>
                      <Input
                        type="time"
                        value={draftEnd}
                        onChange={(e) => setDraftEnd(e.target.value)}
                        className="h-8 w-28 text-xs"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleAdd(day)}
                        disabled={pending}
                        className="h-8"
                      >
                        {pending ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          "Save"
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDraftDay(null)}
                        className="h-8"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>

                {!isEditing && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDraftDay(day)}
                    className="h-8 gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
