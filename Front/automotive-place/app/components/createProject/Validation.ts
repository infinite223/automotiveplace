import { ICreateNotification, TValidResult } from "@/app/utils/types";
import { TProjectCreate } from "@/app/utils/types/project";
import { TStageCreate } from "@/app/utils/types/stage";
import {
  performanceValidation,
  priceValidation,
} from "@/app/utils/validation/globalValidation";

export const validProject = (newProject: TProjectCreate) => {
  let validResults: TValidResult[] = [];
  let notification: ICreateNotification | null = null;

  validResults = validResults.concat(validStages(newProject.stages));

  // TODO - valid tags, stages, carItems and all data if exists

  // if (!newProject.authorId && newProject.authorId.length < 1) {
  //   validResults.push({
  //     error: "Brak poprawnych danych o autorze. ",
  //     valid: false,
  //   });
  // }

  return { validResults, notification };
};

export const validStages = (stages: TStageCreate[] | undefined) => {
  let validResults: TValidResult[] = [];

  if (!stages?.length) {
    validResults.push({
      error:
        " Do projektu musi być dodany jeden stage (np. stage 0 który przedstawia oraginalne dane)",
      valid: false,
    });
  }

  stages?.forEach((stage) => {
    validResults = validResults.concat(performanceValidation(stage));

    if (stage.name.length > 20 || stage.name.length < 2) {
      validResults.push({
        error: " Długość nazwy etapu musi zawierać od 2 do 20 znaków",
        valid: false,
      });
    }

    if (stage.stagePrice) {
      validResults = validResults.concat(
        priceValidation(stage.stagePrice, "Stage")
      );
    }

    // maybe valid all carItems
  });

  return validResults;
};
