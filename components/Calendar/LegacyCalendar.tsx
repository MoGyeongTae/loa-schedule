"use client";

import FullCalendar from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/monarch";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import koLocale from "@fullcalendar/react/locales/ko";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/monarch/theme.css";
import "@fullcalendar/react/themes/monarch/palettes/purple.css";
import "./calendar-events.css";

function renderEventContent(eventInfo: {
  event: {
    title: string;
    extendedProps: { bgColor?: string; textColor?: string };
  };
}) {
  return (
    <div
      className="rounded-md px-2 py-1"
      style={{
        backgroundColor: eventInfo.event.extendedProps.bgColor ?? "#2563eb",
        color: eventInfo.event.extendedProps.textColor ?? "#ffffff",
      }}
    >
      <span className="text-sm font-medium">{eventInfo.event.title}</span>
    </div>
  );
}

function revealEventHarness(info: { el: HTMLElement }) {
  let node: HTMLElement | null = info.el;

  for (let i = 0; i < 4 && node; i += 1) {
    if (node.style.visibility === "hidden") {
      node.style.visibility = "visible";
    }
    if (!node.style.top) {
      node.style.top = "auto";
    }
    node = node.parentElement;
  }
}

const LegacyCalendar = () => {
  return (
    <div className="loa-schedule-calendar mx-auto w-full min-w-0 max-w-6xl px-4 py-8 font-sans">
      <div className="min-w-0 rounded-xl border border-zinc-200 bg-white shadow-sm">
        <FullCalendar
          plugins={[themePlugin, dayGridPlugin]}
          locale={koLocale}
          initialView="dayGridMonth"
          initialDate="2026-08-26"
          height="auto"
          eventContent={renderEventContent}
          eventDidMount={revealEventHarness}
          headerToolbar={{
            left: "title",
            center: "",
            right: "prev,next",
          }}
          events={[
            {
              id: "test1",
              title: "경태 - 알바",
              daysOfWeek: [1, 3, 5],
              color: "#5dc1b9",
              extendedProps: {
                bgColor: "#5dc1b9",
                textColor: "#ffffff",
              },
            },
            {
              id: "test2",
              title: "event 2",
              start: "2026-08-26",
              color: "#2563eb",
              extendedProps: {
                bgColor: "#2563eb",
                textColor: "#ffffff",
              },
            },
          ]}
          fixedWeekCount={false}
        />
      </div>
    </div>
  );
};

export default LegacyCalendar;
