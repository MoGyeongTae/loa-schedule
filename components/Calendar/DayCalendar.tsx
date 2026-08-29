"use client";

import { useMemo } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/ko";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { expandWeeklyDays } from "@/util/Calendar/Events/expandWeeklyDays";
import { expandCycleDays } from "@/util/Calendar/Events/expandCycleDays";
import type { CalendarEvent } from "@/types/Calendar/CalendarEvent";

dayjs.locale("ko");

const localizer = dayjsLocalizer(dayjs);

type DateRange = {
  start: Dayjs;
  end: Dayjs;
};

type EventColors = {
  bgColor: string;
  textColor: string;
};

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
      ...expandWeeklyDays(
        "경태 - 알바",
        "경태",
        [1, 3, 5],
        range,
        {
          bgColor: "#84b6f4",
          textColor: "#ffffff",
        },
        {
          startHour: 10,
          startMinute: 0,
          endHour: 20,
          endMinute: 0,
        },
      ),
      // ...expandMonthlyNthWeekday("팀 정기회의", 2, 2, range, {
      //   bgColor: "#ea580c",
      //   textColor: "#ffffff",
      // }),
      ...expandCycleDays(
        dayjs("2026-08-03"),
        [
          {
            title: "용중 - 주간",
            person: "용중",
            days: 2,
            bgColor: "#f8de7e",
            textColor: "#ffffff",
          },
          {
            title: "용중 - 야간",
            person: "용중",
            days: 2,
            bgColor: "#1c4c96",
            textColor: "#ffffff",
          },
          {
            title: "용중 - 비번",
            person: "용중",
            days: 2,
            bgColor: "#03bb85",
            textColor: "#ffffff",
          },
        ],
        range,
      ),
      // ...ONE_OFF_EVENTS,
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
        // onSelectEvent={() => {}}
      />
    </div>
  );
};

export default DayCalendar;
