import { TStageCreate } from "../types/stage";
import { generateRandomString, getRandomInt } from "./randomData";

export function generateRandomStagesToCreate(count: number): TStageCreate[] {
  const stages: TStageCreate[] = [];

  for (let i = 0; i < count; i++) {
    const stage: TStageCreate = {
      name: `Stage ${i + 1} ${generateRandomString(4)}`,
      description: `Opis stage ${i + 1}`,
      stageNumber: i + 1,

      hp: getRandomInt(100, 1000),
      nm: getRandomInt(150, 1200),
      acc_0_100: getRandomInt(3, 12),
      acc_100_200: getRandomInt(6, 20),
      acc_50_150: getRandomInt(5, 18),

      sl_150_50: getRandomInt(12, 300),
      sl_100_0: getRandomInt(12, 308),

      stagePrice: getRandomInt(1000, 20000),
      carItems: [],
      createdById: generateRandomString(8),
    };

    stages.push(stage);
  }

  return stages;
}
