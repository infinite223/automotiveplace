import { TValidResult } from "@/app/utils/types";
import { TProjectCreate } from "@/app/utils/types/project";
import { TStageCreate } from "@/app/utils/types/stage";
import {
  performanceValidation,
  priceValidation,
} from "@/app/utils/validation/globalValidation";

export const validProject = (newElement: TProjectCreate) => {
  let validResults: TValidResult[] = [];

  validResults = validResults.concat(validCarNameValue(newElement.name));

  validResults = validResults.concat(validCarMakeValue(newElement.carMake));
  validResults = validResults.concat(
    validStages(newElement.stagesCount, newElement.stages)
  );

  if (!newElement.authorId && newElement.authorId.length < 2) {
    //maybe valid authorId?

    validResults.push({
      error: "Brak poprawnych danych o autorze. ",
      valid: false,
    });
  }

  return validResults;
};

export const validCarNameValue = (value: string | number) => {
  let validResults: TValidResult[] = [];

  if (typeof value === "number") {
    validResults.push({
      error: "Nazwa elementu nie może być liczbą. ",
      valid: false,
    });
  } else if (value.length < 3) {
    validResults.push({
      error: "Nazwa elementu musi być dłuższa. ",
      valid: false,
    });
  }

  return validResults;
};

export const validCarMakeValue = (value: string | number) => {
  let validResults: TValidResult[] = [];

  if (typeof value === "number") {
    validResults.push({
      error: "Nazwa projektu nie może być liczbą. ",
      valid: false,
    });
  }

  // sprawdzanie czy należy do grupy pojazdów

  return validResults;
};

export const validStages = (
  count: number,
  stages: TStageCreate[] | undefined
) => {
  let validResults: TValidResult[] = [];

  if (count !== stages?.length) {
    validResults.push({
      error:
        " Do projektu musi być dodany jeden stage (np. stage 0 który przedstawia oraginalne dane)",
      valid: false,
    });

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
        validResults.push({
          error: " Długość nazwy etapu musi zawierać od 2 do 20 znaków",
          valid: false,
        });
      }

      // maybe valid all carItems
    });
  }

  return validResults;
};
