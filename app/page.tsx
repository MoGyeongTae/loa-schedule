import Calendar from "@/components/Calendar/LegacyCalendar";
import TestCalendar from "@/components/Calendar/ScheduleCalendar";
import MonthlyMemo from "@/components/MonthlyMemo/MonthlyMemo";
import Test from "@/components/Test";

export default function Home() {
  return (
    <div className="flex min-w-0 w-full flex-1 flex-col">
      {/* 월별 메모 */}
      <MonthlyMemo />
      {/* 캘린더 */}
      {/* <Calendar /> */}
      {/* <Test /> */}
      <TestCalendar />
    </div>
  );
}
