import { TProjectCreate } from "@/app/utils/types/project";
import { TStageCreate } from "@/app/utils/types/stage";

export const stepperDataToCreateProject = (steps: any): TProjectCreate => {
  // TODO - add mapper for string from inputes to numbers
  const basic = steps[0]?.data || {};
  const engine = steps[1]?.data || {};
  const stages: TStageCreate[] = steps[3]?.data || [];
  const stockData = stages.find(
    (stage: TStageCreate) => stage.stageNumber === 0
  );
  return {
    garageId: "garage2",

    // Step 1
    carMake: basic.carMake,
    carModel: basic.carModel,
    description: basic.description,
    name: basic.name,

    // Step 2
    engineCapacity: engine.engineCapacity,
    engineName: engine.engineName,
    engineDescription: engine.engineDescription,
    engineStockHp: stockData?.hp ?? 0,
    engineStockNm: stockData?.nm ?? 0,
    engineWasSwapped: engine.engineWasSwapped,

    transmissionWasSwapped: engine.transmissionWasSwapped,
    transmissionDescription: engine.transmissionDescription,
    transmissionGears: engine.transmissionGears,
    transmissionName: engine.transmissionName,
    transmissionType: engine.transmissionType,

    imagesCount: 0,

    stages,

    carItemsCount: 0,
    carItems: [],
    tags: [],

    isVisible: true,
    projectPrice: 30000,
    forSell: false,
  };
};

/**
 * Helper:
 * - ""        -> undefined
 * - "123"     -> 123
 * - NaN/null  -> undefined
 */
export const numberOrUndefined = (v: string | number) => {
  if (v === "" || v === null || Number.isNaN(Number(v))) {
    return undefined;
  }
  return Number(v);
};

export const stringOrUndefined = (v: unknown) => {
  if (typeof v !== "string") return undefined;

  const trimmed = v.trim();
  return trimmed === "" ? undefined : trimmed;
};
