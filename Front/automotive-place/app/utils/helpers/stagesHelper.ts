import { TProject } from "../types/project";
import { TStage } from "../types/stage";

export const sortStagesByStageNumber = (stages: TStage[]) => {
  return [...stages].sort((a, b) => {
    const aNum = a.stageNumber ?? -Infinity;
    const bNum = b.stageNumber ?? -Infinity;
    return bNum - aNum;
  });
};

export const getCurrentStage = (project: TProject) => {
  if (project.stages?.length && project.stages?.length > 0) {
    return sortStagesByStageNumber(project.stages)[0];
  }

  const currentStage: TStage = {
    acc_0_100: 0,
    acc_100_200: 0,
    acc_50_150: 0,
    createdAt: new Date(),
    stagePrice: 0,
    createdById: "",
    description: "strock",
    hp: project.engineStockHp,
    nm: project.engineStockNm,
    id: "",
    name: "Stock",
    projectId: project.id,
    stageNumber: 0,
    carItems: [], // TODO: Analysis needed
    updatedAt: new Date(),
  };

  return currentStage;
};
