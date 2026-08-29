import dayjs from "dayjs";
import type { CalendarEvent } from "@/types/Calendar/CalendarEvent";

function collectEventDays(events: CalendarEvent[], title: string) {
  const days = new Set<string>();

  for (const event of events) {
    if (event.title !== title || !event.start || !event.end) continue;

    const start = dayjs(event.start).startOf("day");
    const last = event.allDay
      ? dayjs(event.end).startOf("day").subtract(1, "day")
      : start;

    for (
      let day = start;
      day.isBefore(last, "day") || day.isSame(last, "day");
      day = day.add(1, "day")
    ) {
      days.add(day.format("YYYY-MM-DD"));
    }
  }

  return days;
}

export function findOverlapDays(
  events: CalendarEvent[],
  titleA: string,
  titleB: string,
) {
  const daysA = collectEventDays(events, titleA);
  const overlap = new Set<string>();

  for (const day of collectEventDays(events, titleB)) {
    if (daysA.has(day)) overlap.add(day);
  }

  return overlap;
}
