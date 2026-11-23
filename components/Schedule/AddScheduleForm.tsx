"use client";

import { SubmitEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { apiFetch } from "@/util/Auth/api";

type AddScheduleFormProps = {
  date: string;
};

const WEEKDAYS = [
  { value: 1, label: "월" },
  { value: 2, label: "화" },
  { value: 3, label: "수" },
  { value: 4, label: "목" },
  { value: 5, label: "금" },
  { value: 6, label: "토" },
  { value: 0, label: "일" },
];

const COLORS = [
  { id: "blue", bg: "#84b6f4", label: "파랑" },
  { id: "yellow", bg: "#f8de7e", label: "노랑" },
  { id: "navy", bg: "#1c4c96", label: "남색" },
  { id: "green", bg: "#03bb85", label: "초록" },
  { id: "red", bg: "#dc2626", label: "빨강" },
];

const AddScheduleForm = ({ date }: AddScheduleFormProps) => {
  const router = useRouter();
  const initialDate = dayjs(date).isValid()
    ? dayjs(date).format("YYYY-MM-DD")
    : dayjs().format("YYYY-MM-DD");

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(initialDate);
  const [allDay, setAllDay] = useState(true);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const [repeat, setRepeat] = useState("none");
  const [weekdays, setWeekdays] = useState<number[]>(() => [
    dayjs(initialDate).day(),
  ]);
  const [color, setColor] = useState(COLORS[0].bg);

  const toggleWeekday = (day: number) => {
    setWeekdays((current) =>
      current.includes(day)
        ? current.filter((value) => value !== day)
        : [...current, day],
    );
  };

  const handleSubmit = useCallback(
    async (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const response = await apiFetch("/schedule-events", {
          method: "POST",
          body: JSON.stringify({
            name: title,
            event_date: startDate,
            start_time: startTime,
            end_time: endTime,
            week_days: weekdays,
            event_options: {
              bgColor: color,
            },
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to add schedule");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
      router.push(`/${initialDate}/schedule`);
    },
    [
      initialDate,
      router,
      title,
      startDate,
      allDay,
      startTime,
      endTime,
      repeat,
      weekdays,
      color,
    ],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-[#2a2b33] dark:bg-[#17181d]"
    >
      <div className="grid gap-5">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            일정 이름
          </span>
          <input
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="예: 알바"
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-[#2a2b33] dark:bg-[#121318] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            날짜
          </span>
          <input
            type="date"
            required
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            onClick={(event) => {
              try {
                event.currentTarget.showPicker();
              } catch {
                // Native icon already opened the picker, or showPicker is unsupported.
              }
            }}
            className="w-full cursor-pointer rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-[#2a2b33] dark:bg-[#121318] dark:text-zinc-100 dark:focus:border-zinc-500"
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
          <input
            type="checkbox"
            checked={allDay}
            onChange={(event) => setAllDay(event.target.checked)}
            className="accent-zinc-900 dark:accent-zinc-100"
          />
          종일
        </label>

        {!allDay && (
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                시작
              </span>
              <input
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-[#2a2b33] dark:bg-[#121318] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                종료
              </span>
              <input
                type="time"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-[#2a2b33] dark:bg-[#121318] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
              />
            </label>
          </div>
        )}

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            반복
          </span>
          <select
            value={repeat}
            onChange={(event) => setRepeat(event.target.value)}
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-[#2a2b33] dark:bg-[#121318] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
          >
            <option value="none">반복 없음</option>
            <option value="weekly">매주 같은 요일</option>
            {/* <option value="cycle">며칠씩 순환</option> */}
          </select>
        </label>

        {repeat === "weekly" && (
          <fieldset>
            <legend className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              요일
            </legend>
            <div className="flex flex-wrap gap-2">
              {WEEKDAYS.map((weekday) => {
                const selected = weekdays.includes(weekday.value);

                return (
                  <button
                    key={weekday.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleWeekday(weekday.value)}
                    className={`h-9 w-9 cursor-pointer rounded-full text-sm font-medium ${
                      selected
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                        : "bg-zinc-100 text-zinc-500 dark:bg-[#23242b] dark:text-zinc-400"
                    }`}
                  >
                    {weekday.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        <fieldset>
          <legend className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            색상
          </legend>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.label}
                onClick={() => setColor(item.bg)}
                className={`h-8 w-8 rounded-full border-2 ${
                  color === item.bg
                    ? "border-zinc-900 dark:border-zinc-100"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: item.bg }}
              />
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push(`/${initialDate}/schedule`)}
          className="cursor-pointer rounded-lg px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-[#23242b]"
        >
          취소
        </button>
        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          추가
        </button>
      </div>
    </form>
  );
};

export default AddScheduleForm;
