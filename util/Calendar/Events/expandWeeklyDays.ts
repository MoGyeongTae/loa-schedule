import { CalendarEvent } from "@/types/Calendar/CalendarEvent";
import { EventColors } from "@/types/Calendar/EventColor";
import { EventDateRange } from "@/types/Calendar/EventDateRange";
import type { Person } from "@/types/Calendar/Person";

// 매 주 특정 요일 일정
export const expandWeeklyDays = (
  title: string,
  person: Person,
  weekdays: number[],
  range: EventDateRange,
  colors: EventColors,
  times?: {
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
  },
): CalendarEvent[] => {
  const events: CalendarEvent[] = [];

  for (
    let day = range.start.startOf("day");
    day.isBefore(range.end, "day") || day.isSame(range.end, "day");
    day = day.add(1, "day")
  ) {
    if (!weekdays.includes(day.day())) continue;

    if (times) {
      events.push({
        title,
        person,
        start: day
          .hour(times.startHour)
          .minute(times.startMinute)
          .second(0)
          .toDate(),
        end: day.hour(times.endHour).minute(times.endMinute).second(0).toDate(),
        ...colors,
      });
      continue;
    }

    events.push({
      title,
      person,
      start: day.toDate(),
      end: day.add(1, "day").toDate(),
      allDay: true,
      ...colors,
    });
  }

  return events;
};
