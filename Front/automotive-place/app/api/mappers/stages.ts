import { TProject } from "@/app/utils/types/project";
import { ProjectWithIncludes } from "./project";

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
