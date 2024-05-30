import { ErrorStatus, TValidResult } from "@/app/utils/types";
import { TCarItemCreate, isValidItemType } from "@/app/utils/types/carItem";

export const validCarElement = (newElement: TCarItemCreate) => {
  let validResult: TValidResult = {
    error: "",
    valid: true,
    notification: null,
  };

  validResult = validCarNameValue(newElement.name);

  if (!newElement.authorId && newElement.authorId.length < 2) {
    //maybe valid authorId?

    validResult.error += "Brak poprawnych danych o autorze. ";
  }

  if (!isValidItemType(newElement.itemType)) {
    validResult.error += "Niepoprawny typ elementu. ";
  }

  if (validResult.error.length > 0) {
    validResult.valid = false;
    validResult.notification = {
      log: {
        date: new Date(),
        status: ErrorStatus.Low,
        title: "Błąd weryfikacji danych elementu",
        message: validResult.error,
      },
      timer: 3000,
    };
  }

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
