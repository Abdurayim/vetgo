import type {
  AvailabilitySlot,
  BlockedDate,
} from "@/shared/types/domain.types";

export type { AvailabilitySlot, BlockedDate };

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const DAY_NAMES: Record<DayOfWeek, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

export interface AddSlotInput {
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
}

export interface BlockDateInput {
  blockedDate: string;
  reason?: string;
}
