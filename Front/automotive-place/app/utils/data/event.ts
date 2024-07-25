import { TEvent } from "../types/event";
import { generateRandomDate, generateRandomString } from "./randomData";

export function generateRandomEvents(count: number) {
  const events = [];
  for (let i = 0; i < count; i++) {
    const _event: TEvent = {
      id: generateRandomString(10),
      createdAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      updatedAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      isVisible: Math.random() < 0.5,
      description: "",
      title: "Random event",
    };

    events.push(_event);
  }
  return events;
}
