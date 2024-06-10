import { TValidResult } from "@/app/utils/types";
import { TProjectCreate } from "@/app/utils/types/project";
import { TStageCreate } from "@/app/utils/types/stage";
import {
  performanceValidation,
  priceValidation,
} from "@/app/utils/validation/globalValidation";

export const validProject = (newElement: TProjectCreate) => {
  let validResult: TValidResult = { error: "", valid: true };
  let currentValid: TValidResult = { error: "", valid: true };

  currentValid = validCarNameValue(newElement.name);
  validResult = {
    ...currentValid,
    error: validResult.error + " " + currentValid.error,
    valid: currentValid.valid ? validResult.valid : false,
  };

  currentValid = validCarMakeValue(newElement.carMake);
  validResult = {
    ...currentValid,
    error: validResult.error + " " + currentValid.error,
    valid: currentValid.valid ? validResult.valid : false,
  };

  currentValid = validStages(newElement.stagesCount, newElement.stages);
  validResult = {
    ...currentValid,
    error: validResult.error + " " + currentValid.error,
    valid: currentValid.valid ? validResult.valid : false,
  };

  if (!newElement.authorId && newElement.authorId.length < 2) {
    //maybe valid authorId?

    validResult.error += "Brak poprawnych danych o autorze. ";
  }

  return validResult;
};

export const validCarNameValue = (value: string | number) => {
  let validResult: TValidResult = { error: "", valid: true };

  if (typeof value === "number") {
    validResult.error += "Nazwa elementu nie może być liczbą. ";
  } else if (value.length < 3) {
    validResult.error += "Nazwa elementu musi być dłuższa. ";
  }

  if (validResult.error.length > 0) {
    validResult.valid;
  }

  return validResult;
};

export const validCarMakeValue = (value: string | number) => {
  let validResult: TValidResult = { error: "", valid: true };

  if (typeof value === "number") {
    validResult.error += "Nazwa projektu nie może być liczbą. ";
  }

  // sprawdzanie czy należy do grupy pojazdów

  if (validResult.error.length > 0) {
    validResult.valid;
  }

  return validResult;
};

export const validStages = (
  count: number,
  stages: TStageCreate[] | undefined
) => {
  let validResult: TValidResult = { error: "", valid: true };
  let currentValid: TValidResult = { error: "", valid: true };

  if (count !== stages?.length) {
    validResult.valid = false;
    validResult.error +=
      " Do projektu musi być dodany jeden stage (np. stage 0 który przedstawia oraginalne dane)";
  }

  stages?.forEach((stage) => {
    currentValid = performanceValidation(stage);
    validResult.error += currentValid.error;
    validResult.valid = currentValid.valid ? validResult.valid : true;

    if (stage.name.length > 20 || stage.name.length < 2) {
      validResult.error +=
        " Długość nazwy etapu musi zawierać od 2 do 20 znaków";
      validResult.valid = currentValid.valid ? validResult.valid : true;
    }

    if (stage.stagePrice) {
      currentValid = priceValidation(stage.stagePrice, "Stage");
      validResult.error += currentValid.error;
      validResult.valid = currentValid.valid ? validResult.valid : true;
    }

    // maybe valid all carItems
  });

  if (validResult.error.length > 0) {
    validResult.valid;
  }

  return validResult;
};
