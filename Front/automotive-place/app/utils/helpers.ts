import { Kalam, Permanent_Marker, Yantramanav } from "next/font/google";
import { TProject } from "./types/project";
import { TStage } from "./types/stage";

const KalamBold = Kalam({
  subsets: ["latin"],
  display: "swap",
  weight: "700",
});
const AllanBold = Permanent_Marker({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const Yant = Yantramanav({
  subsets: ["latin-ext"],
  display: "swap",
  weight: "900",
});

export const getCurrentStage = (project: TProject) => {
  if (project.stages) {
    return project.stages[project.stages.length - 1];
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
    carItems: project.carItems,
    updatedAt: new Date(),
  };

  return currentStage;
};

export { AllanBold, KalamBold, Yant };
