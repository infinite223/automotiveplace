import { TValidResult } from "@/app/utils/types";
import { TProjectCreate } from "@/app/utils/types/project";

export const validProject = (newElement: TProjectCreate) => {
  let valid: TValidResult = { error: "", valid: true };

  valid = validCarNameValue(newElement.name);

  if (!newElement.authorId && newElement.authorId.length < 2) {
    //maybe valid authorId?

    valid.error += "Brak poprawnych danych o autorze. ";
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
