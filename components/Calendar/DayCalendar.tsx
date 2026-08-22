"use client";

import { useMemo } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import type { Event as RBCEvent } from "react-big-calendar";
import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/ko";
import "react-big-calendar/lib/css/react-big-calendar.css";

dayjs.locale("ko");

const localizer = dayjsLocalizer(dayjs);

type CalendarEvent = RBCEvent & {
  bgColor: string;
  textColor: string;
};

type DateRange = {
  start: Dayjs;
  end: Dayjs;
};

type EventColors = {
  bgColor: string;
  textColor: string;
};

function expandWeeklyDays(
  title: string,
  weekdays: number[],
  range: DateRange,
  colors: EventColors,
): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  for (
    let day = range.start.startOf("day");
    day.isBefore(range.end, "day") || day.isSame(range.end, "day");
    day = day.add(1, "day")
  ) {
    if (!weekdays.includes(day.day())) continue;

    events.push({
      title,
      start: day.toDate(),
      end: day.add(1, "day").toDate(),
      allDay: true,
      ...colors,
    });
  }

  return events;
}

type CycleSlot = EventColors & {
  title: string;
  days: number;
};

function expandCycleBlocks(
  cycleStart: Dayjs,
  slots: CycleSlot[],
  range: DateRange,
): CalendarEvent[] {
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
}

type DayCalendarProps = {
  date: string;
};

const DayCalendar = ({ date }: DayCalendarProps) => {
  const initialDate = useMemo(() => {
    const parsed = dayjs(date);
    return (parsed.isValid() ? parsed : dayjs()).toDate();
  }, [date]);

  const range = useMemo<DateRange>(
    () => ({
      start: dayjs(initialDate).startOf("day"),
      end: dayjs(initialDate).endOf("day"),
    }),
    [initialDate],
  );

  const events = useMemo(
    () => [
      ...expandWeeklyDays("경태 - 알바", [1, 3, 5], range, {
        bgColor: "#84b6f4",
        textColor: "#ffffff",
      }),
      ...expandCycleBlocks(
        dayjs("2026-08-03"),
        [
          {
            title: "용중 - 주간",
            days: 2,
            bgColor: "#f8de7e",
            textColor: "#ffffff",
          },
          {
            title: "용중 - 야간",
            days: 2,
            bgColor: "#1c4c96",
            textColor: "#ffffff",
          },
          {
            title: "용중 - 비번",
            days: 2,
            bgColor: "#03bb85",
            textColor: "#ffffff",
          },
        ],
        range,
      ),
    ],
    [range],
  );

  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={initialDate}
        date={initialDate}
        defaultView="day"
        views={["day"]}
        toolbar={false}
        culture="ko"
        style={{ height: 720 }}
        eventPropGetter={(event: CalendarEvent) => ({
          style: {
            backgroundColor: event.bgColor,
            color: event.textColor,
            border: "none",
          },
        })}
      />
    </div>
  );
};

export default DayCalendar;
