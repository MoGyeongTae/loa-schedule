import { EventColors } from "./EventColor";
import type { Person } from "./Person";

export type CycleSlot = EventColors & {
  title: string;
  days: number;
  person: Person;
};
