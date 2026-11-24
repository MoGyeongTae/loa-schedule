import { CalendarEventData } from "@/types/Calendar/CalendarEventData";
import { EventDateRange } from "@/types/Calendar/EventDateRange";
import { apiFetch } from "@/util/Auth/api";

// 기간 내 일정 이벤트 조회
export const fetchScheduleEvents = async (
  range: EventDateRange,
): Promise<CalendarEventData[]> => {
  const params = new URLSearchParams({
    event_date_start: range.start.format("YYYY-MM-DD"),
    event_date_end: range.end.format("YYYY-MM-DD"),
  });

  const response = await apiFetch(
    `/api/schedule/events?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error(`일정 조회 실패: ${response.status}`);
  }

  return response.json();
};

export const deleteScheduleEvent = async (id: number): Promise<void> => {
  const response = await apiFetch(`/api/schedule/events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`일정 삭제 실패: ${response.status}`);
  }
};
