import { CalendarEvent } from "@/types/Calendar/CalendarEvent";
import { CycleSlot } from "@/types/Calendar/CycleSlot";
import { EventDateRange } from "@/types/Calendar/EventDateRange";
import { type Dayjs } from "dayjs";

export const expandCycleDays = (
  cycleStart: Dayjs,
  slots: CycleSlot[],
  range: EventDateRange,
): CalendarEvent[] => {
  const cycleLength = slots.reduce((sum, slot) => sum + slot.days, 0);
  if (cycleLength <= 0) return [];

  const rangeStart = range.start.startOf("day");
  const rangeEnd = range.end.startOf("day");
  const origin = cycleStart.startOf("day");

  let cursor = origin;
  if (rangeStart.isAfter(origin, "day")) {
    const offset = rangeStart.diff(origin, "day");
    cursor = origin.add(Math.floor(offset / cycleLength) * cycleLength, "day");
  }

  const events: CalendarEvent[] = [];

  while (cursor.isBefore(rangeEnd, "day") || cursor.isSame(rangeEnd, "day")) {
    for (const slot of slots) {
      const slotStart = cursor;
      const slotEnd = cursor.add(slot.days, "day");

      if (
        slotEnd.isAfter(rangeStart, "day") &&
        slotStart.isBefore(rangeEnd.add(1, "day"), "day")
      ) {
        events.push({
          title: slot.title,
          person: slot.person,
          start: slotStart.toDate(),
          end: slotEnd.toDate(),
          allDay: true,
          bgColor: slot.bgColor,
          textColor: slot.textColor,
        });
      }

      cursor = slotEnd;
    }

    if (cursor.isAfter(rangeEnd, "day")) break;
  }

  return events;
};
