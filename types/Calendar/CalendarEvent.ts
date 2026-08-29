import type { Event as RBCEvent } from "react-big-calendar";
import type { Person } from "./Person";

export type CalendarEvent = RBCEvent & {
  bgColor: string;
  textColor: string;
  person: Person;
};
