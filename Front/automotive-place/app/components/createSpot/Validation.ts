import { ErrorStatus, TValidResult } from "@/app/utils/types";
import { TCarItemCreate, isValidItemType } from "@/app/utils/types/carItem";
import { TSpotCreate } from "@/app/utils/types/spot";

export const validSpot = (newProblem: TSpotCreate) => {
  let validResult: TValidResult = {
    error: "",
    valid: true,
    notification: null,
  };

  return validResult;
};

export const validNameValue = (value: string | number) => {
  let valid: TValidResult = { error: "", valid: true };

  if (typeof value === "number") {
    valid.error += "Nazwa spotu nie może być liczbą. ";
  } else if (value.length < 3) {
    valid.error += "Nazwa spotu musi być dłuższa. ";
  }

  if (valid.error.length > 0) {
    valid.valid = false;
  }

  return valid;
};
