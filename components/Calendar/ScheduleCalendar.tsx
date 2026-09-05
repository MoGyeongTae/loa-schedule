"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/ko";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { expandWeeklyDays } from "@/util/Calendar/Events/expandWeeklyDays";
import { expandCycleDays } from "@/util/Calendar/Events/expandCycleDays";
import { findOverlapDays } from "@/util/Calendar/Events/findOverlapDays";
import type { CalendarEvent } from "@/types/Calendar/CalendarEvent";
import type { Person } from "@/types/Calendar/Person";

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

function getRangeBounds(range: Date[] | { start: Date; end: Date }): DateRange {
  if (Array.isArray(range)) {
    return {
      start: dayjs(range[0]).startOf("day"),
      end: dayjs(range[range.length - 1]).endOf("day"),
    };
  }

  return {
    start: dayjs(range.start).startOf("day"),
    end: dayjs(range.end).endOf("day"),
  };
}

function nthWeekdayOfMonth(month: Dayjs, weekday: number, nth: number) {
  const first = month.startOf("month");
  const offset = (weekday - first.day() + 7) % 7;
  return first.add(offset + (nth - 1) * 7, "day");
}

function expandMonthlyNthWeekday(
  title: string,
  person: Person,
  weekday: number,
  nth: number,
  range: DateRange,
  colors: EventColors,
): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  let cursor = range.start.startOf("month");
  const lastMonth = range.end.endOf("month");

  while (cursor.isBefore(lastMonth) || cursor.isSame(lastMonth, "month")) {
    const date = nthWeekdayOfMonth(cursor, weekday, nth);

    if (
      date.isSame(cursor, "month") &&
      (date.isAfter(range.start, "day") || date.isSame(range.start, "day")) &&
      (date.isBefore(range.end, "day") || date.isSame(range.end, "day"))
    ) {
      events.push({
        title,
        person,
        start: date.toDate(),
        end: date.add(1, "day").toDate(),
        allDay: true,
        ...colors,
      });
    }

    cursor = cursor.add(1, "month");
  }

  return events;
}

const messages = {
  next: "다음",
  previous: "이전",
  today: "오늘",
  month: "월",
  week: "주",
  day: "일",
  agenda: "일정",
  date: "날짜",
  time: "시간",
  event: "이벤트",
  noEventsInRange: "이 기간에 일정이 없습니다.",
  showMore: (total: number) => `+${total}개 더보기`,
};

function toSchedulePath(date: Date) {
  return `/${dayjs(date).format("YYYY-MM-DD")}/schedule`;
}

async function fetchScheduleEvents(range: DateRange) {
  const params = new URLSearchParams({
    event_date_start: range.start.format("YYYY-MM-DD"),
    event_date_end: range.end.format("YYYY-MM-DD"),
  });

  const response = await fetch(
    `http://localhost:3001/schedule-events?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error(`일정 조회 실패: ${response.status}`);
  }

  return response.json();
}

const ScheduleCalendar = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(() => dayjs().toDate());
  const [range, setRange] = useState<DateRange>({
    start: dayjs(),
    end: dayjs().add(7, "day"),
  });

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

  const overlapDays = useMemo(
    () => findOverlapDays(events, "경태 - 알바", "용중 - 야간"),
    [events],
  );

  useEffect(() => {
    fetchScheduleEvents(range)
      .then((data) => {
        console.log("schedule-events", data);
      })
      .catch((error) => {
        console.error("schedule-events", error);
      });
  }, [range]);

  const onHandleRangeChange = (
    nextRange: Date[] | { start: Date; end: Date },
  ) => {
    setRange(getRangeBounds(nextRange));
  };

  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-8">
      <div className="min-w-0 overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={currentDate}
          onNavigate={setCurrentDate}
          onRangeChange={onHandleRangeChange}
          selectable
          onSelectSlot={({ start }) => {
            router.push(toSchedulePath(start));
          }}
          onSelectEvent={(event) => {
            if (event.start) router.push(toSchedulePath(event.start));
          }}
          onDrillDown={(date) => {
            router.push(toSchedulePath(date));
          }}
          defaultView="week"
          culture="ko"
          messages={messages}
          style={{ height: 720 }}
          eventPropGetter={(event: CalendarEvent) => ({
            style: {
              backgroundColor: event.bgColor,
              color: event.textColor,
              border: "none",
            },
          })}
          dayPropGetter={(date) => {
            if (!overlapDays.has(dayjs(date).format("YYYY-MM-DD"))) return {};

            return {
              className: "overlap-day",
              style: {
                backgroundColor: "#fce7f3",
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default ScheduleCalendar;
