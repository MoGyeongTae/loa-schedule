import type { Event as RBCEvent } from "react-big-calendar";

export type CalendarEvent = RBCEvent & {
  bgColor: string;
  textColor: string;
};
