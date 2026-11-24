"use client";

import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import type { CalendarEventData } from "@/types/Calendar/CalendarEventData";
import { canManageSchedule, getAuthUser } from "@/util/Auth/session";
import { deleteScheduleEvent } from "@/util/Calendar/Events/fetchScheduleEvents";

type DayScheduleListProps = {
  date: string;
  items: CalendarEventData[];
  onDeleted: () => void;
};

function isOnDate(item: CalendarEventData, date: dayjs.Dayjs): boolean {
  if (item.week_days && item.week_days.length > 0) {
    const start = dayjs(item.event_date).startOf("day");
    return (
      (date.isAfter(start, "day") || date.isSame(start, "day")) &&
      item.week_days.includes(date.day())
    );
  }

  return dayjs(item.event_date).isSame(date, "day");
}

function formatTimeRange(item: CalendarEventData): string {
  if (!item.start_time || !item.end_time) {
    return "종일";
  }

  return `${item.start_time.slice(0, 5)} – ${item.end_time.slice(0, 5)}`;
}

const DayScheduleList = ({ date, items, onDeleted }: DayScheduleListProps) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [authUser, setAuthUser] = useState(() =>
    typeof window === "undefined" ? null : getAuthUser(),
  );

  useEffect(() => {
    setAuthUser(getAuthUser());
  }, []);

  const dayItems = useMemo(() => {
    const parsed = dayjs(date);
    const target = parsed.isValid() ? parsed.startOf("day") : dayjs().startOf("day");
    return items.filter((item) => isOnDate(item, target));
  }, [date, items]);

  const handleDelete = async (item: CalendarEventData) => {
    if (!confirm(`"${item.name}" 일정을 삭제할까요?`)) {
      return;
    }

    setDeletingId(item.id);

    try {
      await deleteScheduleEvent(item.id);
      onDeleted();
    } catch (error) {
      console.error(error);
      alert("일정을 삭제하지 못했습니다.");
    } finally {
      setDeletingId(null);
    }
  };

  if (dayItems.length === 0) {
    return (
      <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
        이 날 등록된 일정이 없습니다.
      </p>
    );
  }

  return (
    <ul className="mt-6 divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:divide-[#2a2b33] dark:border-[#2a2b33] dark:bg-[#17181d]">
      {dayItems.map((item) => {
        const canDelete = canManageSchedule(item.uid, authUser);

        return (
          <li
            key={item.id}
            className="flex items-center gap-3 px-4 py-3"
          >
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{
                backgroundColor:
                  typeof item.event_options?.bgColor === "string"
                    ? item.event_options.bgColor
                    : "#84b6f4",
              }}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {item.user_name} · {item.name}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {formatTimeRange(item)}
              </p>
            </div>
            {canDelete ? (
              <button
                type="button"
                disabled={deletingId === item.id}
                onClick={() => handleDelete(item)}
                className="cursor-pointer rounded-lg px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-60 dark:text-red-400 dark:hover:bg-[#2a1a1a]"
              >
                {deletingId === item.id ? "삭제 중" : "삭제"}
              </button>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

export default DayScheduleList;
