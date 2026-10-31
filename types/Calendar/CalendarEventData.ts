import { EventColors } from "./EventColor";

// 일정 이벤트 서버에서 갖고올때 데이터 타입

export type CalendarEventOptions = Partial<EventColors> & {
  [key: string]: unknown;
};

export interface CalendarEventData {
  created_at: string;
  end_time: string;
  event_date: string;
  event_options: CalendarEventOptions | null;
  id: number;
  name: string;
  start_time: string;
  user_name: string;
  week_days: null | number[];
}
