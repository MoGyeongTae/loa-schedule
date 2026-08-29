export const PEOPLE = ["유정","희망","경태","용중"] as const;

export type Person = (typeof PEOPLE)[number];
