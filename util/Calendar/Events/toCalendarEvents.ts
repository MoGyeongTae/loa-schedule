import dayjs from "dayjs";
import { CalendarEvent } from "@/types/Calendar/CalendarEvent";
import { CalendarEventData } from "@/types/Calendar/CalendarEventData";
import { EventColors } from "@/types/Calendar/EventColor";
import { EventDateRange } from "@/types/Calendar/EventDateRange";
import type { Person } from "@/types/Calendar/Person";
import { expandWeeklyDays } from "./expandWeeklyDays";

const DEFAULT_COLORS: EventColors = {
  bgColor: "#84b6f4",
  textColor: "#ffffff",
};

// "HH:mm" 또는 "HH:mm:ss" 형식의 시간을 시/분으로 변환
const parseTime = (time: string | null | undefined) => {
  if (!time) return null;

  const [hour, minute] = time.split(":").map(Number);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return null;

  return { hour, minute };
};

// 서버 일정 데이터 -> 캘린더 이벤트
export const toCalendarEvents = (
  data: CalendarEventData[],
  range: EventDateRange,
): CalendarEvent[] =>
  data.flatMap((item) => {
    const person = item.user_name as Person;
    const colors: EventColors = {
      bgColor: item.event_options?.bgColor ?? DEFAULT_COLORS.bgColor,
      textColor: item.event_options?.textColor ?? DEFAULT_COLORS.textColor,
    };
    const startTime = parseTime(item.start_time);
    const endTime = parseTime(item.end_time);
    const times =
      startTime && endTime
        ? {
            startHour: startTime.hour,
            startMinute: startTime.minute,
            endHour: endTime.hour,
            endMinute: endTime.minute,
          }
        : undefined;
    const eventDate = dayjs(item.event_date).startOf("day");

    // 매 주 반복 일정: event_date 부터 반복 시작
    if (item.week_days && item.week_days.length > 0) {
      return expandWeeklyDays(
        item.name,
        person,
        item.week_days,
        {
          start: eventDate.isAfter(range.start) ? eventDate : range.start,
          end: range.end,
        },
        colors,
        times,
      );
    }

    // 단일 일정
    if (times) {
      return [
        {
          title: item.name,
          person,
          start: eventDate
            .hour(times.startHour)
            .minute(times.startMinute)
            .toDate(),
          end: eventDate.hour(times.endHour).minute(times.endMinute).toDate(),
          ...colors,
        },
      ];
    }

    return [
      {
        title: item.name,
        person,
        start: eventDate.toDate(),
        end: eventDate.add(1, "day").toDate(),
        allDay: true,
        ...colors,
      },
    ];
  });
