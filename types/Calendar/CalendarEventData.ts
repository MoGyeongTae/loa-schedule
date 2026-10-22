// 일정 이벤트 서버에서 갖고올때 데이터 타입

export interface CalendarEventData {
  created_at: string;
  end_time: string;
  event_date: string;
  event_options: any;
  id: number;
  name: string;
  start_time: string;
  user_name: string;
  week_days: null | number[];
}
