import { TValidResult } from "@/app/utils/types";
import { TCarItemCreate, isValidItemType } from "@/app/utils/types/carItem";

export const validCarElement = (newElement: TCarItemCreate) => {
  let valid: TValidResult = { error: "", valid: true };

  valid = validCarNameValue(newElement.name);

  if (!newElement.authorId && newElement.authorId.length < 2) {
    //maybe valid authorId?

    valid.error += "Brak poprawnych danych o autorze. ";
  }

  if (!isValidItemType(newElement.itemType)) {
    valid.error += "Niepoprawny typ elementu. ";
  }

  return valid;
};

export const validCarNameValue = (value: string | number) => {
  let valid: TValidResult = { error: "", valid: true };

  if (typeof value === "number") {
    valid.error += "Nazwa elementu nie może być liczbą. ";
  } else if (value.length < 3) {
    valid.error += "Nazwa elementu musi być dłuższa. ";
  }

  if (valid.error.length > 0) {
    valid.valid;
  }

  return valid;
};
