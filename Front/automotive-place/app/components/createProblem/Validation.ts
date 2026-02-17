import { TValidResult } from "@/app/utils/types";
import { TProblemCreate } from "@/app/utils/types/problem";

export const validProblem = (newProblem: TProblemCreate) => {
  let validResults: TValidResult[] = [];

  return validResults;
};

export const validNameValue = (value: string | number) => {
  let valid: TValidResult = { error: "", valid: true };

  if (typeof value === "number") {
    valid.error += "Nazwa problemu nie może być liczbą. ";
  } else if (value.length < 3) {
    valid.error += "Nazwa problemu musi być dłuższa. ";
  }

  if (valid.error.length > 0) {
    valid.valid = false;
  }

  return valid;
};
