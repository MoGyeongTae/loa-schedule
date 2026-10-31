"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarEventData } from "@/types/Calendar/CalendarEventData";
import { EventDateRange } from "@/types/Calendar/EventDateRange";
import { fetchScheduleEvents } from "@/util/Calendar/Events/fetchScheduleEvents";
import { toCalendarEvents } from "@/util/Calendar/Events/toCalendarEvents";

// 기간 내 서버 일정 조회 후 캘린더 이벤트로 변환
export const useScheduleEvents = (range: EventDateRange) => {
  const [scheduleData, setScheduleData] = useState<CalendarEventData[]>([]);

  useEffect(() => {
    let ignore = false;

    fetchScheduleEvents(range)
      .then((data) => {
        if (!ignore) setScheduleData(data);
      })
      .catch((error) => {
        console.error("schedule-events", error);
      });

    return () => {
      ignore = true;
    };
  }, [range]);

  return useMemo(
    () => toCalendarEvents(scheduleData, range),
    [scheduleData, range],
  );
};
