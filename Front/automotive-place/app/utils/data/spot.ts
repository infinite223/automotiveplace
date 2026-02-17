import { TSpot } from "../types/spot";
import { generateRandomDate, generateRandomString } from "./randomData";

export function generateRandomSpots(count: number) {
  const spots = [];
  for (let i = 0; i < count; i++) {
    const _spot: TSpot = {
      id: generateRandomString(10),
      createdAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      updatedAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      isVisible: Math.random() < 0.5,
      description: "",
      title: "Random spot",
    };

    spots.push(_spot);
  }
  return spots;
}
