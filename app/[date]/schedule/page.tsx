import dayjs from "dayjs";
import Link from "next/link";
import DayCalendar from "@/components/Calendar/DayCalendar";

export default async function DaySchedulePage({
  params,
}: PageProps<"/[date]/schedule">) {
  const { date } = await params;
  const parsed = dayjs(date);
  const label = parsed.isValid() ? parsed.format("YYYY년 M월 D일") : date;

  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-8">
      <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-800">
        ← 캘린더로
      </Link>
      <div className="flex items-center mt-4">
        <h1 className="text-2xl font-semibold text-zinc-900">{label} 일정</h1>
        <Link
          href={`/${date}/add`}
          className="ml-auto text-sm text-zinc-500 hover:text-zinc-800"
        >
          일정 추가
        </Link>
        <div className="ml-4 text-sm text-zinc-500 hover:text-zinc-800 cursor-pointer">
          일정 편집
        </div>
      </div>
      <div className="mt-6">
        <DayCalendar date={date} />
      </div>
    </div>
  );
}
