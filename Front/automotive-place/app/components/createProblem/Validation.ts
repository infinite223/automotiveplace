import { ErrorStatus, TValidResult } from "@/app/utils/types";
import { TCarItemCreate, isValidItemType } from "@/app/utils/types/carItem";
import { TProblemCreate } from "@/app/utils/types/problem";

export const validProblem = (newProblem: TProblemCreate) => {
  let validResult: TValidResult = {
    error: "",
    valid: true,
    notification: null,
  };

  return validResult;
};

export const validCarNameValue = (value: string | number) => {
  let valid: TValidResult = { error: "", valid: true };

  if (typeof value === "number") {
    valid.error += "Nazwa elementu nie może być liczbą. ";
  } else if (value.length < 3) {
    valid.error += "Nazwa elementu musi być dłuższa. ";
  }

  if (valid.error.length > 0) {
    valid.valid = false;
  }

  return valid;
};
