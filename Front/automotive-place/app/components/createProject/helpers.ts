import { TStepHistoryCreate } from "@/app/utils/types/history";
import { TBasicProject, TProjectCreate } from "@/app/utils/types/project";
import { TStageCreate, TStepStageCreate } from "@/app/utils/types/stage";

export const stepperDataToCreateProject = (steps: any): TProjectCreate => {
  const basic = steps[0]?.data || {};
  const engine = steps[1]?.data || {};
  const stepStages = steps[3]?.data || [];
  const historyData = steps[4]?.data || [];
  const summary = steps[5]?.data || {};
  const stages = mapStepStagesToStages(stepStages);
  const stockData = stages.find(
    (stage: TStageCreate) => stage.stageNumber === 0,
  );

  return {
    // Step 1
    carMake: basic.carMake,
    carModel: basic.carModel,
    description: basic.description,
    name: basic.name,

    // Step 2
    engineCapacity: numberFromString(engine.engineCapacity) ?? 0,
    engineName: engine.engineName,
    engineDescription: engine.engineDescription,
    engineStockHp: stockData?.hp ?? 0,
    engineStockNm: stockData?.nm ?? 0,
    engineWasSwapped: engine.engineWasSwapped,

    transmissionWasSwapped: engine.transmissionWasSwapped,
    transmissionDescription: engine.transmissionDescription,
    transmissionGears: numberFromString(engine.transmissionGears) ?? 0,
    transmissionName: engine.transmissionName,
    transmissionType: engine.transmissionType,

    imagesCount: 0,

    stages,

    carItemsCount: 0,
    carItems: [],
    tags: [],

    isVisible: summary.isVisable,
    projectPrice: numberFromString(summary.price) ?? 0,
    forSell: summary.forSell,
    history: historyData.map((h: TStepHistoryCreate) => ({
      title: h.title,
      description: h.description,
      date: h.date,
      mileage: numberFromString(h.mileage) ?? 0,
      price: numberFromString(h.price),
    })),
  };
};

export const mapStepStagesToStages = (
  stages: TStepStageCreate[],
): TStageCreate[] => stages.map(mapStepStageToStage);

const mapStepStageToStage = (stage: TStepStageCreate): TStageCreate => ({
  name: stage.name,
  description: stage.description,

  stageNumber: numberFromString(stage.stageNumber) ?? 0,

  hp: numberFromString(stage.hp) ?? 0,
  nm: numberFromString(stage.nm) ?? 0,

  acc_0_100: numberFromString(stage.acc_0_100),
  acc_100_200: numberFromString(stage.acc_100_200),
  acc_50_150: numberFromString(stage.acc_50_150),

  sl_150_50: numberFromString(stage.sl_150_50),
  sl_100_0: numberFromString(stage.sl_100_0),

  stagePrice: numberFromString(stage.stagePrice),

  carItems: stage.carItems ?? [],
});

export const numberFromString = (v: unknown): number | undefined => {
  if (typeof v !== "string") return undefined;

  const normalized = v.replace(",", ".").trim();
  if (normalized === "") return undefined;

  const n = Number(normalized);
  return Number.isNaN(n) ? undefined : n;
};

export const mergeProjectWithMedia = (
  project: TBasicProject,
  uploadedFiles: { fileLocation: string }[],
): TBasicProject => {
  return {
    ...project,
    images: [
      ...(project.images ?? []),
      ...uploadedFiles.map((f) => f.fileLocation),
    ],
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
