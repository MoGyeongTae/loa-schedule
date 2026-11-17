import type { CalendarEvent } from "@/types/Calendar/CalendarEvent";

type CalendarEventChipProps = {
  event: CalendarEvent;
};

const CalendarEventChip = ({ event }: CalendarEventChipProps) => {
  return (
    <div className="flex h-full min-h-0 flex-col justify-center gap-0.5 overflow-hidden px-2 py-1">
      {event.person ? (
        <span className="truncate text-[10px] font-medium leading-none opacity-80">
          {event.person}
        </span>
      ) : null}
      <span className="truncate text-[12px] font-semibold leading-tight">
        {event.title}
      </span>
    </div>
  );
};

export default CalendarEventChip;
