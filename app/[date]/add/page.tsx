import dayjs from "dayjs";
import Link from "next/link";
import AddScheduleForm from "@/components/Schedule/AddScheduleForm";

export default async function AddSchedulePage({
  params,
}: PageProps<"/[date]/add">) {
  const { date } = await params;
  const parsed = dayjs(date);
  const label = parsed.isValid() ? parsed.format("YYYY년 M월 D일") : date;

  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-8">
      <Link
        href={`/${date}/schedule`}
        className="text-sm text-zinc-500 hover:text-zinc-800"
      >
        ← 일정으로
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-zinc-900">
        {label} 일정 추가
      </h1>
      <div className="mt-6 max-w-xl">
        <AddScheduleForm date={date} />
      </div>
    </div>
  );
}
