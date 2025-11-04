import { TProject } from "@/app/utils/types/project";
import { ProjectWithIncludes } from "./project";
import { TStageCreate } from "@/app/utils/types/stage";

export function mapStages(
  stages: ProjectWithIncludes["stages"]
): TProject["stages"] {
  return stages.map((stage) => ({
    ...stage,
    description: stage.description || undefined,
    acc_0_100: stage.acc_0_100?.toNumber() || 0,
    acc_100_200: stage.acc_100_200?.toNumber() || 0,
    acc_50_150: stage.acc_50_150?.toNumber() || 0,
    sl_150_50: stage.sl_150_50?.toNumber() || 0,
    sl_100_0: stage.sl_100_0?.toNumber() || 0,
    createdById: stage.createdById || "",
    stagePrice: stage.stagePrice?.toNumber() || undefined,
    chartImageUrl: stage.chartImageUrl ?? undefined,
    maxRPM: stage.maxRPM?.toNumber() || undefined,
    carItems: [], // TODO: update mapper
  }));
}

export function mapStagesToPrisma(stages: TStageCreate[], authorId: string) {
  if (!stages || stages.length === 0) return undefined;

  return {
    create: stages.map((s, index) => ({
      name: s.name,
      description: s.description || "",
      stageNumber: s.stageNumber ?? index + 1,
      hp: s.hp,
      nm: s.nm,
      acc_0_100: s.acc_0_100,
      acc_100_200: s.acc_100_200,
      acc_50_150: s.acc_50_150,
      sl_150_50: s.sl_150_50,
      sl_100_0: s.sl_100_0,
      stagePrice: s.stagePrice,
      maxRPM: null,
      chartImageUrl: null,
      topSpeed: null,
      weight: null,
      isBlockedByAdmin: false,
      createdById: authorId,
      createdAt: new Date(),
      updatedAt: new Date(),
      // carItems: {
      //   connect: s.carItems?.map(ci => ({ id: ci.id })) || []
      // }
    })),
  };
}
